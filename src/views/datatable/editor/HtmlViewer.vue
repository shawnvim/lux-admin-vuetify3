<script setup lang="ts">

import HtmlPanel from "@/components/HtmlPanel.vue";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { useChatGPTStore } from "@/stores/chatGPTStore";

const snackbarStore = useSnackbarStore();
const router = useRouter();
const chatGPTStore = useChatGPTStore();

const rawItems = ref([
  {
    route: "rfc7540",
    description: "HTTP/2"
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
  {
    route: "rfc8740",
    description: "TLS 1.3 with HTTP/2",
  },
  {
    route: "rfc9113",
    description: "HTTP/2",
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

const select = ref({});


onUpdated(() => {
  handleLoad()
});

onMounted(() => {
  handleLoad()
});

watch(select, (newValue, oldValue) => {
  if (router.currentRoute.value.params.id != select.value.route) {
    console.log('VselectRouter', location, router.currentRoute.value)
    router.push(`${select.value['route']}`);
  } else {
    // let scroll = `${router.currentRoute.value.path}${router.currentRoute.value.hash}`
    //console.log('Scroll', scroll)
    // router.push(scroll)
    //location.hash = router.currentRoute.value.hash
    //console.log('Location', location)

  }

});

const handleLoad = () => {
  let routerObj = router.currentRoute.value
  console.log('Router', location, routerObj)

  let id = routerObj.params.id;

  let foundItem = items.value.find((item) => item.route == id);

  if (foundItem != undefined) {
    select.value = {...foundItem, ...{hash: routerObj.hash}}
  } else {
    //select.value = {name: "No Document Found", route : ""}
    snackbarStore.showErrorMessage("Document not found, need follow-up support!");
    
  }
}


const handleClick = (event) => {
  const target = event.composedPath()
  event.preventDefault();

  //const selection =  window.getSelection()
  

  const originalTarget = target.find(
    el => el.tagName && el.tagName.toLowerCase() === 'a' && el.pathname);

  if (originalTarget.pathname.startsWith('/data/html-viewer/')) {
    router.push(originalTarget.pathname+originalTarget.hash) 
  }
  //else if (originalTarget.pathname.startsWith('/rfc/')) {
    //router.push(`/data/html-viewer${originalTarget.pathname}`+originalTarget.hash)
   // } 
    else if (originalTarget.pathname.startsWith('/')){
      window.open(originalTarget.pathname.replace("/", "https://www.rfc-editor.org/"), '_blank')
    } else {
      window.open(originalTarget, '_blank')
    }
};

const handleSelection = () => {
  chatGPTStore.updateContext(window.getSelection()?.toString());
};

/*
      const shadowDomElement = document.querySelector('.vhtml').shadowRoot;
      console.log('shadowDomElement', shadowDomElement);
      if (shadowDomElement) {
      const shadowDomHash = shadowDomElement.querySelector(target.hash);
      console.log('targetshadowDomElement', shadowDomHash);
      if (shadowDomHash) {
        shadowDomHash.scrollIntoView({
          block: 'center',
        behavior: 'smooth',
      });
      }
    };

*/

</script>

<template>
  <v-container class="h-full">
    <v-select variant="outlined" placeholder="File Directory" label="Select HTML" density="compact" hide-details
      :items="items" item-title="name" item-value="path" v-model="select" return-object>
    </v-select>
    <v-label></v-label>
    

    
   
    <HtmlPanel :url="select" @click=handleClick 
    @mouseup=handleSelection
    ref="sectionRef"/>
  

  </v-container>
</template>
  
