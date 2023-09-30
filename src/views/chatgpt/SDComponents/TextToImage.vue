<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { imageGenerationApi } from "@/api/openaiApi";
import { useOpenaiStore } from "@/stores/openaiStore";
import { useSnackbarStore } from "@/stores/snackbarStore";
const snackbarStore = useSnackbarStore();
const openaiStore = useOpenaiStore();

const params = reactive({
  prompt: "a white siamese cat",
  n: 1,
  size: "1024x1024",
});

const marks = ref([
      256,
      512,
      1024
    ]);

const value = ref(marks.value.length-1);

watch(value, (newValue) => {
  const pixel = marks.value[newValue];
  params.size = `${pixel}x${pixel}`;
});


const imageGenerate = async () => {
  try {
    const res = await imageGenerationApi(params);
    // Handle the successful response
    openaiStore.updateImgList(res.data.data);
    snackbarStore.showSuccessMessage("Image Generated, start loading");
    console.log("ImageGenerationResult", res);
  } catch (error) {
    console.log(error)
    // Handle the error
    snackbarStore.showErrorMessage(error.message);
  }

};
</script>

<template>
  <v-card>
    <v-card-text>
      <!-- ---------------------------------------------- -->
      <!-- Prompt  -->
      <!-- ---------------------------------------------- -->
      <v-label class="font-weight-medium my-3">Prompt</v-label>
      <v-textarea v-model="params.prompt" color="primary" variant="outlined" density="compact" type="text"
        placeholder="Prompt" hide-details />

      <!-- ---------------------------------------------- -->
      <!-- Height   -->
      <!-- ---------------------------------------------- -->
      <v-label class="font-weight-medium my-3">Size {{ params.size }}</v-label>
      <v-slider v-model="value" :max="2" step="1" color="primary">
      </v-slider>

      <v-btn size="x-large" color="primary" block @click="imageGenerate">Generate</v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
</style>
