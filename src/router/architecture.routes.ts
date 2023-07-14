export default [
  {
    path: "/chart/echart-association",
    name: "chart-echart-association",
    component: () =>
      import(
        /* webpackChunkName: "chart-echart-sunburst" */ "@/views/chart/EchartAssociation.vue"
      ),
    meta: {
      requiresAuth: true,
      layout: "ui",
      category: "Architecture",
      title: "Association",
    },
  },
  {
    path: "/chart/echart-composition",
    name: "chart-echart-composition",
    component: () =>
      import(
        /* webpackChunkName: "chart-echart-sunburst" */ "@/views/chart/EchartComposition.vue"
      ),
    meta: {
      requiresAuth: true,
      layout: "ui",
      category: "Architecture",
      title: "Composition",
    },
  },
];
