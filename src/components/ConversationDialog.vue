<!--
* @Component: 
* @Maintainer: Shawn Qiu
* @Description: 
-->

<script setup lang="ts">
import { Icon } from "@iconify/vue";

type Props = {
    text: {
        title?: string;
        content?: string;
    };
};

const props = defineProps<Props>();
const text = computed(() => {
    return props.text;
});
const dialog = ref(false);
const title = ref("");
const content = ref("");

watch(text, (value) => {
    load(value)
});

function load(url) {
    console.log(url.title, url.content);
    title.value = url.title;
    content.value = url.content;
}

const saveCard = () => {
        console.log(title.value, content.value);
};

</script>

<template>
    <v-dialog width="60vw">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" size="50" @click="dialog = !dialog" class="toolbox-activator elevation-10">
                <Icon icon="typcn:upload" height="auto" />
                <v-tooltip activator="parent" location="left" :text="$t('menu.data.fileUploadPreview')"></v-tooltip>
            </v-btn>

        </template>

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title class="pa-4 d-flex align-center">
                    <span class="flex-fill">Upload Conversation</span>
                    <v-btn variant="text" rounded icon="mdi-close" size="small" color="primary" class="mr-n3"
                        @click="isActive.value = false">
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <div class="pa-4">
                    <v-text-field class="py-2 px-1" color="primary" v-model="title" label="Title" variant="plain"
                        hideDetails placeholder="Title" autofocus @keyup.enter="saveCard">
                    </v-text-field>
                    <v-divider></v-divider>
                    <v-textarea v-model="content" class="px-2 py-1" variant="plain" placeholder="Description" hide-details>
                    </v-textarea>
                </div>
                <v-divider></v-divider>
                <v-card-actions class="pa-4">
                    <v-btn variant="outlined" @click="isActive.value = false">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn variant="flat" color="primary" @click="saveCard">Save</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped lang="scss">
$top: 90px;
$each: 55px;

.toolbox-activator {
    position: fixed;
    transition: all 0.3s ease;
    top: $top;
    right: 5px;
    z-index: 999;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.3s;
    cursor: pointer;
}

.dialog {
    z-index: 999;
    position: fixed;
    scrollbar-width: thin;
    top: $top + $each;
    right: 5px;
}
</style>
