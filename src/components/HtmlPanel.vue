<template>
    <div class="h-full bg-white d-flex align-center justify-center" id="shadowParent">
        <div class="vhtml" ref="shadowHost">

        </div>
    </div>
</template>


<script setup lang="ts">
import axios from 'axios';

type Props = {
    url: {
        path: string;
        hash: string;
    };
};

const props = defineProps<Props>();

const url = computed(() => props.url);
const loading = ref(false);
const shadowRoot = ref<HTMLElement | null>(null);
const shadowHost = ref<any>(null);

watch(url, (value) => {
    load(value);
});

onMounted(() => {
    shadowRoot.value = shadowHost.value.attachShadow({ mode: 'open' }) ;
    load(url.value);
});

function removeHtmlStyle(html: string) {
    /*
            var rel = /@media[^{]+\{([^{}]*\{[^{}]*\})*[^}]*\}/g;
            // var rel = /<style[^>]*>[^]*?<\/style>/g
            var newHtml = "";
            if (html) {
                newHtml = html.replace(rel, "");
                //console.log(html.removeProperty('text-decoration'))
            }
            //console.log(newHtml)

            */

    return html;
}

function load(url: { path: string; hash?: string }) {
    const { path, hash } = url;
    if (path && path.length > 0) {
        loading.value = true;

        const param = {
            headers: {
                Accept: 'text/html, text/plain, text/css',
            },
        };

        axios
            .get(path, param)
            .then((response) => {
                shadowRoot.value!.innerHTML = response.data;
                loading.value = false;

                try {
                    shadowRoot.value!.removeChild(shadowRoot.value!.children!['toc']);
                  //this.shadowRoot.children['toc'].style.top = '250px'
                } catch (errToc) { }

                if (hash) {
                    try {
                        const regHash = hash.replace(/\./g, '\\.');
                        const shadowDomHash = shadowRoot.value!.querySelector(regHash);
                        shadowDomHash?.scrollIntoView({
                            block: 'center',
                            behavior: 'smooth',
                        });
                    } catch (err) {
                        console.log('Hash not found: ', hash);
                    }
                }
            })
            .catch((Reason) => {
                console.log('loadFail', Reason);

                loading.value = false;

                shadowRoot.value!.innerHTML = 'Loading Fail';
            });
    }
}

defineExpose({ removeHtmlStyle, loading });
</script>


<style scoped></style>
