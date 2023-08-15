<template>
  <v-container class="h-full">
    <v-select variant="outlined" placeholder="File Directory" label="Select HTML" density="compact" hide-details
      :items="items" item-title="name" item-value="path" v-model="select" return-object>
    </v-select>

    <HtmlPanel :url.asyc="select['path']" @click=handleClick />

  </v-container>
</template>
  
  
<script setup lang="ts">

import HtmlPanel from "@/components/HtmlPanel.vue";
import { useSnackbarStore } from "@/stores/snackbarStore";
const snackbarStore = useSnackbarStore();
const router = useRouter();

const rawItems = ref([
  {
    route: "rfc7540",
    description: "HTTP2"
  },
  {
    route: "rfc5741",
    description: "Streams, Headers, and Boilerplates"
  },
  {
    route: "rfc2223",
    description: "Instructions to RFC Authors",
  },
  {
    route: "rfc4844",
    description: "The RFC Series and RFC Editor",
  },
  {
    route: "rfc7230",
    description: "HTTP/1.1: Message Syntax and Routing",
  },
  {
    route: "rfc7231",
    description: "HTTP/1.1: Semantics and Content",
  },
  {
    route: "rfc7232",
    description: "HTTP/1.1: Conditional Requests",
  },

]);

const items = ref(rawItems.value.map((object) => (
  {
    ...object,
    ...{ name: object.route.toUpperCase() + " - " + object.description},
    ...{ path: "/rfc/" + object.route }
  }
)
));

const select = ref({ name: "", path: "", route: "" });

onUpdated(() => {
  handleLoad()
});

onMounted(() => {
  handleLoad()
});

watch(select, (newValue, oldValue) => {
  console.log('Selected', newValue)

  if (router.currentRoute.value.params.id != select.value.route) {
    router.push(`/data/html-viewer/${select.value['route']}`);
  } else {
    // let scroll = `${router.currentRoute.value.path}${router.currentRoute.value.hash}`
    //console.log('Scroll', scroll)
    // router.push(scroll)
    //location.hash = router.currentRoute.value.hash
    //console.log('Location', location)

  }

});

const handleLoad = () => {
  let id = router.currentRoute.value.params.id;

  let foundItem = items.value.find((item) => item.route == id);

  console.log('Router', location, router.currentRoute.value)

  if (foundItem != undefined) {
    select.value = foundItem
  } else {
    snackbarStore.showErrorMessage("Document not found, need follow-up support!");
  }
}


const handleClick = (event: MouseEvent) => {
  // Check if the clicked target is an "a" element
  const target = event.target as HTMLElement;
  if (target.tagName.toLowerCase() === 'a') {
    event.preventDefault();
    console.log('Target', target);
 
    if (target.pathname.startsWith('/data/html-viewer/')) {
      router.push(target.pathname+target.hash)
    } else {
      window.open(target, '_blank')
    }
  } else {
    event.preventDefault();
  }
};


</script>
