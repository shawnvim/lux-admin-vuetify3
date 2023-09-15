import { defineStore } from "pinia";
import { supabase } from "@/plugins/supabase";

import router from "@/router";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  created: boolean;
}

const handleSignup = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          emailRedirectTo: window.location.protocol+"//"
  +window.location.host
  +'/auth/signin',
          data: {
            //first_name: 'John',
            //age: 27,
          }
        }
      }
    )
    if (error) throw error
    alert('Check your email for the login link!')
    router.push({ name: "auth-signin" });
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
      router.push({ name: "auth-signup" });
    }
  } finally {
  }
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null,
    profile: null as Profile | null,
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["isLoggedIn"] }],
  },

  getters: {},

  actions: {
    setLoggedIn(payload: boolean) {
      this.isLoggedIn = payload;
    },

    registerWithEmailAndPassword(email: string, password: string) {
      handleSignup(email, password);
      // router.push("/dashboard");
    },

    loginWithEmailAndPassword(email: string, password: string) {
      this.isLoggedIn = true;
      router.push("/dashboard");
    },

    loginWithDemo() {
      this.isLoggedIn = true;
      router.push("/dashboard");
    },

    login() {
      router.push({ name: "auth-signin" });
    },

    logout() {
      this.isLoggedIn = false;
      router.push("/");
    },
  },
});
