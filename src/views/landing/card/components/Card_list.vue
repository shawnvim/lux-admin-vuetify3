<!--
* @Component: 
* @Maintainer: Shawn Qiu
* @Description: 
-->

<script setup lang="ts">
type Props = {
    text: {
        title: String,
        content: String,
        icon: String,
    };
};
const props = defineProps<Props>();
const text = computed(() => props.text);
</script>

<template>
    <v-card color="#F2F5F8" class="px-5 py-10 mb-10 d-flex align-center">
        <v-card class="square pa-5 mr-5 d-flex align-center justify-center">
            <v-icon size="large" color="primary">{{ text.icon }}</v-icon>
        </v-card>

        <div class="flex-fill">
            <h3 class="ma-1">{{ text.title }}</h3>
            <p class="ma-1">
                {{ text.content }}
            </p>
        </div>

    </v-card>
</template>

<style scoped>
.square {
    flex-shrink: 0;
    width: 5rem;
    height: 5rem;
}

</style>
