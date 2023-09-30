// import Axios library
import axios from "axios";
import { useChatGPTStore } from "@/stores/chatGPTStore";
const chatGPTStore = useChatGPTStore();


const openaiInstance = axios.create({
    baseURL: chatGPTStore.getUrl,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatGPTStore.getApiKey}`,
      }
  });

// 添加请求拦截器
openaiInstance.interceptors.request.use();

// 添加响应拦截器
openaiInstance.interceptors.response.use();


export const getImageGenerationApi = () => {
  return openaiInstance.get("/v1/images/generations");
};

export const imageGenerationApi = (data: any) => {
  return openaiInstance.post('/v1/images/generations', data)
};
