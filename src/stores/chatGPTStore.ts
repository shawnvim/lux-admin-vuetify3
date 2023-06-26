import { defineStore } from "pinia";

export const useChatGPTStore = defineStore({
  id: "chatGPT",
  state: () => ({
    propmpt: "",
    configDialog: false,
    apiKey: "",
    url: "",
    context: "",
    model: "gpt-3.5-turbo",
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["propmpt"] }],
  },

  getters: {
    // If you have set up an API key, please use your own key. If not, please use the one I provided.
    // getApiKey: (state) => state.apiKey || import.meta.env.VITE_OPENAI_API_KEY,
    getApiKey: (state) => state.apiKey,
    getUrl: (state) => state.url || "https://api.openai.com",
    getContext: (state) => state.context,
  },
  actions: {
    updatePropmpt() {},
    updateModel(model: string) {
      this.model = model;
    },
    updateContext(context: string) {
      this.context = context;
    },
  },
});
