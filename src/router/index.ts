import { createRouter, createWebHistory } from "vue-router";
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";
import UIRoutes from "./ui.routes";
import LandingRoutes from "./landing.routes";
import UtilityRoutes from "./utility.routes";
import PagesRoutes from "./pages.routes";
import ChartsRoutes from "./charts.routes";
import AppsRoutes from "./apps.routes";
import DataRoutes from "./data.routes";
import AiRoutes from "./ai.routes";
import ArchitectureRoutes from "./architecture.routes";
import { useAuthStore } from "@/stores/authStore";

export const routes = [
  {
    path: "/",
    meta: {layout: "index"},
    component: () =>
    import("@/views/landing/HomePage.vue"),
  } as any,
  {
    path: "/dashboard",
    meta: {
      requiresAuth: true,
      layout: "landing",
    },
    component: () => import("@/views/pages/KanBan.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "@/views/errors/NotFoundPage.vue"),
  },
  ...UserRoutes,
  ...LandingRoutes,
  ...AuthRoutes,
  ...PagesRoutes,
  ...UtilityRoutes,
  ...UIRoutes,
  ...ChartsRoutes,
  ...AppsRoutes,
  ...DataRoutes,
  ...AiRoutes,
  ...ArchitectureRoutes,
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [];

const router = createRouter({
  history: createWebHistory(),
  // hash模式：createWebHashHistory，history模式：createWebHistory
  // process.env.NODE_ENV === "production"

  routes: routes,

  scrollBehavior(to, from, savedPosition) {
    if (to.path == from.path && to.hash) {
      return {
        el: to.hash,
        //behavior: 'smooth',
        top: 100
        };
    }
    else if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        //behavior: 'smooth',
        top: 100
        };
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log("authStoreLoggedIn", authStore.isLoggedIn)
  console.log("requiresAuth", to.meta.requiresAuth)
  console.log("HistoryState", to, from, next)
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ path: "/", replace: true ,force:true});
  } else {
    next();
  }
});

export default router;
