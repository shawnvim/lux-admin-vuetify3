<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import type { User, Message } from "../chatTypes";
import { useChatStore } from "../chatStore";
import { createCompletion } from "../openAIApi";
import { useChatGPTStore } from "@/stores/chatGPTStore";
const chatStore = useChatStore();
const chatGPTStore = useChatGPTStore();
const userMessage = ref("");
const aiMessage = ref("");

const createMessage = (user: User, text: string) => {
  const message: Message = {
    id: "_" + Math.random().toString(36).substring(2, 11),
    user,
    text,
    timestamp: new Date().getTime(),
  };
  return message;
};

const user = ref({
  id: 1,
  name: "YOU",
  avatar:
    "https://avatars.githubusercontent.com/u/114594494?v=4",
});

const bot = ref({
  id: 2,
  name: "AI",
  avatar:
    "https://www.3gpp.org/images/3gpp_logo.svg",
});

const emits = defineEmits(["scroll"]);

const sendMessage = () => {
  // 判断是否为空
  if (!userMessage.value) {
    chatStore.clearHistory();
    return;
  }

  // 判断ApiKey是否为空
  if (!chatGPTStore.getApiKey) {
    errorMsg.value = "请先设置API密钥。";
    isError.value = true;
    return;
  }

  // 发送User Message
  chatStore.addToHistory(createMessage(user.value, userMessage.value));

  let inputmsg = `Context:\n${chatGPTStore.getContext}\nQuestion:\n${userMessage.value}`

  // 清空Input
  userMessage.value = "";

  // AI等待Message
  aiMessage.value = "Please wait a moment ......";
  chatStore.addToHistory(createMessage(bot.value, aiMessage.value));

  // 请求AI回答
  getCompletion(inputmsg);
};

const getCompletion = async (inputmsg) => {
  try {
    const response = await createCompletion(
      inputmsg,
      chatGPTStore.getApiKey
    );

    if (response.data.error) {
      const errorCode = response.data.error.code;
      let errorMessage = "";

      if (errorCode === 404) {
        errorMessage = "请求的资源未找到，请检查API请求URL。";
      } else if (errorCode === 500) {
        errorMessage = "服务器内部错误，请稍后再试。";
      } else {
        errorMessage = response.data.error.message;
      }

      errorMsg.value = errorMessage;
      isError.value = true;
      // 清空临时Message
      chatStore.removeLatestMessage();
      return;
    }

    aiMessage.value = response.data.choices[0].message.content;

    // 清空临时Message
    chatStore.removeLatestMessage();
    // 发送Ai Message
    chatStore.addToHistory(createMessage(bot.value, aiMessage.value));
  } catch (error) {
    errorMsg.value = "发生错误，请检查网络连接和API密钥。";
    isError.value = true;
    // 清空临时Message
    chatStore.removeLatestMessage();
  }
};

watch(
  () => chatStore.chatHistory,
  () => {
    nextTick(() => {
      emits("scroll");
    });
  },
  { deep: true }
);

const isError = ref(false);
const errorMsg = ref("");
</script>

<template>
  <v-text-field
    color="primary"
    ref="input"
    v-model="userMessage"
    placeholder="SendMessage"
    hide-details
    @keyup.enter="sendMessage"
  >
    <template #prepend-inner>
      <v-icon>mdi-microphone</v-icon>
    </template>

    <template #append-inner>
      <v-icon @click="sendMessage">mdi-send</v-icon>
    </template>
  </v-text-field>
  <v-snackbar :timeout="2000" color="error" v-model="isError">
    {{ errorMsg }}
  </v-snackbar>
</template>

<style scoped lang="scss"></style>
