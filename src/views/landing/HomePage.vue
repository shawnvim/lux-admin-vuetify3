<script setup lang="ts">
import { Icon } from "@iconify/vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import Card1 from "./card/components/Card_home_ow.vue";
import Card2 from "./card/components/Card_home_ui.vue";


const data_emb = ref([
  {
    title: "Steps:",
    items: [
      {
        title: "Data Preprocessing",
        content:
          "Documents are usually unstructured data based on natural language. Therefore, it needs to be pre-processed.\n\nA common method is to split it into chunks and then convert it into vectors by using embedding model.",
      },
      {
        title: "Embedding",
        content:
          "Text embedding model can generate text embeddings tailored to any task (e.g., classification, retrieval, clustering, text evaluation, etc.) and domains (e.g., science, finance, etc.) by simply providing the task instruction, without any finetuning.\n\nThey are numerical representations of text where each word or phrase is represented as a dense vector of real numbers.",
      },
      {
        title: "Vector Storage",
        content:
          "A vector database indexes and stores vector embeddings for fast retrieval and similarity search, with capabilities like CRUD operations, metadata filtering, and horizontal scaling.",
      },
      {
        title: "Vector Similarity",
        content:
          "Similarity metrics are used to measure similarities among vectors. Choosing a good distance metric helps improve classification and clustering performance significantly.\n\nDepending on the input data forms, specific similarity metric is selected for optimal performance.",
      },
    ],
  },
]);

const data_vdb = ref([
  {
    title: "Layers ",
    items: [
      {
        title: "Access layer",
        content:
          "Composed of a group of stateless proxies, the access layer is the front layer of the system and endpoint to users.",
      },
      {
        title: "Coordinator service",
        content:
          "The coordinator service assigns tasks to the worker nodes and functions as the system's brain.\n\nThe tasks it takes on include cluster topology management, load balancing, timestamp generation, data declaration, and data management.",
      },
      {
        title: "Worker nodes",
        content:
          "The arms and legs. Worker nodes are dumb executors that follow instructions from the coordinator service and execute data manipulation language (DML) commands from the proxy.\n\nWorker nodes are stateless thanks to separation of storage and computation, and can facilitate system scale-out and disaster recovery when deployed on Kubenetes.",
      },
      {
        title: "Storage",
        content:
          "Storage is the bone of the system, responsible for data persistence. It comprises meta storage, log broker, and object storage.",
      },
    ],
  },
]);

</script>

<template>
  <v-container>


    <v-toolbar height="100" color="primary">
      <div class="ml-5">
        <h3 class="text-h5 font-weight-bold">
          AI Assistance Service Desk
        </h3>
      </div>
    </v-toolbar>


    <v-main class="bg-white">
      <v-toolbar-title height="100" color="primary">
        <div class="ml-5 bg-white">
          <h3 class="text-h5 font-weight-bold">
            Overview
            <v-chip size="small" class="ma-2"> Design Concept </v-chip>
          </h3>
        </div>
      </v-toolbar-title>
      <Card1 />

      <br><br>
      <v-divider></v-divider>
      <br>

      <v-toolbar-title height="100" color="primary">
        <div class="ml-5 bg-white">
          <h3 class="text-h5 font-weight-bold">
            Proposal
            <v-chip size="small" class="ma-2"> High Level Architecture </v-chip>
          </h3>
        </div>
      </v-toolbar-title>

      <img src="@/assets/images/homepage/architecture.svg" />

      <v-divider></v-divider>
      <br>

      <v-toolbar-title height="100" color="primary">
        <div class="ml-5 bg-white">
          <h3 class="text-h5 font-weight-bold">
            Data Processing
            <v-chip size="small" class="ma-2"> Text Embedding </v-chip>
          </h3>
        </div>
      </v-toolbar-title>
      <v-row class="ma-5">
        <v-col cols="12" md="4" xl="10">
          <div v-for="faq in data_emb" :id="faq.id" :key="faq.id">
            <div id="#general" class="text-subtitle-2 my-5 ml-2">
              {{ faq.title }}
            </div>
            <v-expansion-panels>
              <v-expansion-panel class="pre-wrap" v-for="item in faq.items" :title="item.title"
                :text="item.content"></v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <v-card class="h-full" style="border-radius: 8px">
            <img src="@/assets/images/homepage/text_embedding.svg" />
          </v-card>

        </v-col>
      </v-row>

      <br><br>
      <v-divider></v-divider>
      <br>
      <v-toolbar-title height="100" color="primary">
        <div class="ml-5 bg-white">
          <h3 class="text-h5 font-weight-bold">
            Vector Database
            <v-chip size="small" class="ma-2"> Milvus </v-chip>
          </h3>
        </div>
      </v-toolbar-title>
      <v-row class="ma-5">
        <v-col cols="12" md="4" xl="10">
          <div v-for="faq in data_vdb" :id="faq.id" :key="faq.id">
            <div id="#general" class="text-subtitle-2 my-5 ml-2">
              {{ faq.title }}
            </div>
            <v-expansion-panels>
              <v-expansion-panel class="pre-wrap" v-for="item in faq.items" :title="item.title"
                :text="item.content"></v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
        <v-col cols="12" md="8">

          <v-card class="h-full" style="border-radius: 8px">
            <img src="@/assets/images/homepage/architecture_diagram.png" />
          </v-card>


        </v-col>
      </v-row>

      <br><br>
      <v-divider></v-divider>
      <br>
      <v-toolbar-title height="100" color="primary">
        <div class="ml-5 bg-white">
          <h3 class="text-h5 font-weight-bold">
            Web UI
            <v-chip size="small" class="ma-2"> Vue3 + Vite + Pinia</v-chip>
          </h3>
        </div>
      </v-toolbar-title>
      <Card2 />

      <br><br>
      <v-divider></v-divider>
      <br>
      <v-toolbar-title height="100" color="primary">
        <div class="ml-5 bg-white">
          <h3 class="text-h5 font-weight-bold">
            Other Features
            <v-chip size="small" class="ma-2"> In use</v-chip>
          </h3>
        </div>
      </v-toolbar-title>
      <v-row class="ma-10">
        <v-sheet elevation="0" height="100%">
          <v-card color="#F2F5F8" class="px-5 py-10 mb-10 d-flex align-center">
            <v-card class="pa-5 mr-5 d-flex align-center justify-center">
              <v-icon color="primary">mdi-refresh-auto</v-icon>
            </v-card>

            <div class="flex-fill">
              <h3>Automations - Github Actions</h3>
              <p>
              CI/CD, build, push and publich your Container Image automatically.
              </p>
            </div>

          </v-card>

          <v-card color="#F2F5F8" class="px-5 py-10 mb-10 d-flex align-center">
            <v-card class="pa-5 mr-5 d-flex align-center justify-center">
              <v-icon color="primary">mdi-certificate</v-icon>
            </v-card>

            <div class="flex-fill">
              <h3>ACME - Automatic Certificate Management Environment</h3>
              <p>
                Support ACME protocol which is a communications protocol for automating interactions between certificate authorities and their users' servers, allowing the automated deployment of public key infrastructure at very low cost.
              </p>
            </div>

          </v-card>

          

          <v-card color="#F2F5F8" class="px-5 py-10 mb-10 d-flex align-center">
            <v-card class="pa-5 mr-5 d-flex align-center justify-center">
              <v-icon color="primary">mdi-lan-connect</v-icon>
            </v-card>

            <div class="flex-fill">
              <h3>HTTP3 - QUIC over UDP</h3>
              <p>
                HTTP/3 with QUIC native support by NGINX, embrace the new standard.
              </p>
            </div>

          </v-card>

        </v-sheet>
      </v-row>

      <br>


    </v-main>


  </v-container>
</template>


<style scoped>
.pre-wrap {
white-space: pre-wrap;
flex-wrap: wrap;
}
</style>

