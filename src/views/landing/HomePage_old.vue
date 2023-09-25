<template>
  <v-card :theme="theme.global.name.value">
    <v-container style="max-width: 1400px" grid-list-xs>
      <v-row>
        <v-col cols="12" md="4">
          <h1 class="text-h5 my-5 d-flex align-center text-title">
            <Icon icon="logos:webix-icon" class="mr-3 my-2" />Timeline
          </h1>
          <v-card elevation="0" class="my-5 pa-3" v-for="card in newsCards" :key="card.id" color="primary">
            <v-card-text class="text-content">
              <v-row align="center" no-gutters>
                <v-col cols="2" class="text-left">
                  <Icon :icon="card.icon" class="text-h4" />
                </v-col>
                <v-col class="text-left" cols="10">
                  <h2>{{ card.title }}</h2>
                </v-col>
              </v-row>
              <br>
              <v-row align="start" no-gutters>
                <v-col cols="2" class="text-left">
                  {{ card.date }}
                </v-col>
                <v-col cols="10" class="text-left">
                  {{ card.content }}
                </v-col>
              </v-row>
              <v-row align="center" no-gutters>
                
                <v-col class="text-h5 text-right" cols="12">
                  <v-btn variant="text" color="accent">Read➧</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" class="text-left">
          <h1 class="text-h5 my-5 d-flex align-center text-title">
            <Icon icon="logos:archlinux" class="mr-3 my-2" />Hot Topic
          </h1>
          <!-- Info Card1 -->
          <v-card elevation="0" color="primary" class="info-card gradient">
            <v-card-text class="d-flex align-center text-content">
              <Icon class="mr-5 text-h4" icon="line-md:reddit-loop" />
              <span>Model Alternatives:</span>
              <v-spacer></v-spacer>
              <v-btn variant="text" icon="mdi-account-search" @click="toggleTheme"></v-btn>
              <v-btn variant="text" icon="mdi-pin"></v-btn>
            </v-card-text>
            <v-card-actions class="r py-5 text-title">
              <div></div>
              <v-select variant="outlined" placeholder="Large Language Model" density="compact" hide-details class="mr-2"
                :items="[
                  'GPT',
                  'Claude',
                  'Llama',
                  'RWKV',
                  'GLM',
                ]"></v-select>
              <v-select variant="outlined" placeholder="Vector Database" density="compact" hide-details :items="[
                'Milvus',
                'Pinecone',
                'Chroma',
                'FAISS',
              ]"></v-select>

              <v-spacer></v-spacer>
              <v-btn variant="tonal" icon="mdi-heart" color="accent"></v-btn>
            </v-card-actions>
          </v-card>

          <!-- Info Card 2 -->
          <v-card color="primary" class="info-card">
            <div class="card-top r text-content">
              <Icon class="mr-5 text-h4" icon="svg-spinners:blocks-scale" />
              <div class="flex-fill">
                Which is the best LLM?
              </div>
              <span>{{ new Date().toLocaleDateString() }}</span>
            </div>
            <v-card-text class="text-content">
              <div>
                <v-radio-group color="accent" v-model="favoriteRadios">
                  <template v-slot:label>
                    <div>Your favorite <strong>LLM</strong></div>
                  </template>
                  <v-radio v-for="model in modelValue" :value = "model.id">
                    <template v-slot:label>
                      <v-row align="center">
                        <v-col cols="6" sm="5" md="3">
                          <span> Of course it's</span>
                          <strong class="ml-1 text-info">{{ model.name }}</strong></v-col>
                        <v-col cols="4" sm="5" md="7">
                          <v-progress-linear :model-value=percentLLM(model.id-1)
                          :color="model.color"
                          rounded></v-progress-linear></v-col>
                        <v-col cols="2">{{ percentLLM(model.id-1) }}</v-col>
                      </v-row>
                    </template>
                  </v-radio>
                </v-radio-group>
                <div class="d-flex justify-space-between align-center">
                  <span>{{ totalVotes() }} votes</span>
                  <v-btn variant="outlined" color="accent"
                  @click="isNaN(favoriteRadios)? null : modelValue[favoriteRadios-1].vote += 1"
                  >Vote</v-btn>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="r text-content">
              <v-btn prepend-icon="mdi-heart"> Like(0)</v-btn>
              <v-btn prepend-icon="mdi-comment">CommentLike(0)</v-btn>
              <v-btn prepend-icon="mdi-share">ShareLike(0)</v-btn>
            </v-card-actions>
          </v-card>
          
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useTheme } from "vuetify";

const modelValue = ref([{
    id: 1,
    name: "GPT",
    vote: 99,
    like: 0,
    color: "#E89888",
  },
  {
    id: 2,
    name: "Llama",
    vote: 50,
    like: 0,
    color: "#B931F0",
  },
  {
    id: 3,
    name: "Claude",
    vote: 20,
    like: 0,
    color: "#ffffff",
  }]);

const totalVotes = () => {
  return modelValue.value.reduce((sum, item) => sum + item.vote, 0);
};

const percentLLM = (index: number): string => {
  const percentage = modelValue.value[index].vote / totalVotes() * 100;
  return `${percentage.toFixed(1)}%`;
};


const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
const newsCards = [
  {
    id: 1,
    title: "First Idea",
    date: "2023.4",
    icon: "icons8:idea",
    content: "Idea submitted based on LLM Assistent by using text embedding.",
  },
  {
    id: 2,
    title: "Prototype",
    date: "2023.5",
    icon: "game-icons:jet-pack",
    content: "The first version of the prototype cameup with Gradio WebUI.",
  },
  {
    id: 3,
    title: "Model Selection",
    date: "2023.6",
    icon: "solar:checklist-minimalistic-linear",
    content: "After verifying the feasibility, a more detailed secondary selection was made. \
    Various vector databases and LLM were tried.",
  },
  {
    id: 4,
    title: "Decoupling",
    date: "2023.7",
    icon: "tabler:stack-2",
    content: "Decoupling of components and hierarchical design of architecture.",
  },
  {
    id: 5,
    title: "Cloud Deployment",
    date: "2023.8",
    icon: "iconamoon:cloud-duotone",
    content:
      "Component containerization, defining and running multi-container Docker applications by compose.",
  },
].reverse();

const favoriteRadios = ref();

</script>

<style lang="scss" scoped>
.bg {
  text-align: left;
  height: 100vh;
  // 更新
  // background-image: linear-gradient(135deg, #1c1e30, #2f3050);
}

.info-card {
  margin-bottom: 2rem;

  .v-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    font-size: 1rem;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    font-size: 1rem;
  }

  .v-card-text {
    padding: 2rem;
  }

  .v-card-actions {
    display: flex;
    align-items: center;
    padding: 1.5rem 1rem;
    font-size: 1rem;
  }
}
</style>
