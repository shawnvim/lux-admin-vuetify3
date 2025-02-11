import { defineStore } from "pinia";

export const useChatGPTStore = defineStore({
  id: "chatGPT",
  state: () => ({
    propmpt: "",
    configDialog: false,
    apiKey: "",
    url: "https://api.shawn-ai.com",
    context: "",
    model: "gpt-3.5-turbo",
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["apiKey"] }],
  },

  getters: {
    // If you have set up an API key, please use your own key. If not, please use the one I provided.
    // getApiKey: (state) => state.apiKey || import.meta.env.VITE_OPENAI_API_KEY,
    getApiKey: (state) => state.apiKey,
    getUrl: (state) => state.url || "https://api.openai.com",
    getContext: (state) => state.context,
    getModel: (state) => state.model || "gpt-3.5-turbo",
  },
  actions: {
    updatePropmpt() {},
    updateModel(model: string) {
      this.model = model;
    },
    updateContext(context: string | undefined) {
      if (context != undefined) {
        this.context = context;
      }
    },
  },
});
