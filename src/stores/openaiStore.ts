import { defineStore } from "pinia";

export const useOpenaiStore = defineStore({
  id: "openai",
  state: () => ({
    imgList: [],
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: [""] }],
  },

  getters: {},
  actions: {
    updateImgList(newImgList: []) {
      this.imgList = [...newImgList, ...this.imgList];
    },
  },
});
