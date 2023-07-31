<!--
* @Component:
* @Maintainer: Shawn Qiu
* @Description:
-->

<script>
  import axios from "axios";
  import { useChatGPTStore } from "@/stores/chatGPTStore";

  const chatGPTStore = useChatGPTStore();

  export default {

    data() {
      return {
        tocItems: [],
        rail: true,
        searchKey: "",

        iframeSrc: '/23.501/html/index.html',

        fileOptions: [
          {
            name: "23.501 - Architecture",
            path: "/23.501/html/index.html"
          },
          {
            name: "23.502 - Procedures",
            path: "/23.502/html/index.html"
          },
          {
            name: "23.527 - Restoration",
            path: "/23.527/html/index.html"
          },
          {
            name: "24.501 - NAS",
            path: "/24.501/html/index.html"
          },
          {
            name: "29.501 - SBI Principles",
            path: "/29.501/html/index.html"
          },
          {
            name: "29.502 - SMF",
            path: "/29.502/html/index.html"
          },
          {
            name: "29.503 - UDM",
            path: "/29.503/html/index.html"
          },
          {
            name: "29.507 - PCF",
            path: "/29.507/html/index.html"
          },
          {
            name: "29.509 - AUSF",
            path: "/29.509/html/index.html"
          },
          {
            name: "29.510 - NRF",
            path: "/29.510/html/index.html"
          },
          {
            name: "29.513 - Policy Control",
            path: "/29.513/html/index.html"
          },
          {
            name: "29.518 - AMF",
            path: "/29.518/html/index.html"
          },
          {
            name: "29.524 - Cause Codes",
            path: "/29.524/html/index.html"
          },
          {
            name: "29.531 - NSSF",
            path: "/29.531/html/index.html"
          },
          {
            name: "29.571 - Common Data Types",
            path: "/29.571/html/index.html"
          },
          {
            name: "29.572 - Location Services",
            path: "/29.572/html/index.html"
          },
          {
            name: "38.331 - RRC",
            path: "/38.331/html/index.html"
          },
          {
            name: "38.413 - NGAP",
            path: "/38.413/html/index.html"
          },

          // Add more file options as needed
        ],

      };
    },

    mounted() {
      let that = this;
      let x, y;
      var iframe = document.getElementById('iframe-id');
      iframe.onload = function() {
        iframe.contentDocument.onclick = function() {
          that.rail = true
        };
        iframe.contentDocument.onscroll = function() {
          // alert('scrolled')
        };
        iframe.contentDocument.onmousedown = function(event) {
          x = event.pageX;
          y = event.pagey;

        };
        iframe.contentDocument.onmouseup = function(event) {
          if (x == event.pageX && y == event.pagey) {
            //执行点击事件操作
          } else {
            chatGPTStore.updateContext(iframe.contentDocument.getSelection().toString());
            //alert(chatGPTStore.getContext)
            // 选中操作
            // alert(iframe.contentDocument.getSelection().toString())
          }
        };
      };

    },

    computed:{
      filterdTodoList() {
        if (this.searchKey == "") return this.tocItems;
        return this.tocItems.filter((todo) => {
          return todo.title.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      },
    },

    methods: {
      handleIframeLoad() {
        // Access iframe content
        const iframe = this.$refs.iframe;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Extract headings from iframe content
        const headings = Array.from(iframeDocument.querySelectorAll('h1, h2, h3, h4'));

        const regexPattern = /^\d[\d.a-zA-Z]*/;

        this.tocItems = [];
        headings.forEach((heading, index) => {
          // Get the attribute name and header flag
          const clauseName = heading.innerText;
          const clauseId = clauseName.toLowerCase().match(regexPattern);

          if (clauseId != null) {
            this.tocItems.push({
              id: clauseId,
              title: clauseName,
              text: clauseName.split(/\s+/).slice(1).join(' '),
              tag: parseInt(heading.tagName.toLowerCase()[1]) // h1 -> 1
            });
          }

        });
      },

      hrefToHeading(heading) {
        const iframe = this.$refs.iframe;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeSrc = iframeDocument.location.href.split("#").shift();

        const iframeHref = `${iframeSrc}#_REF__CLA__${heading.id}`;

        return `<a href="${iframeHref}" target = "3gppiframe"
        >
        ${heading.text}</a>`;
      },

      onClickOutside() {
        this.rail = true
      },

      handleIframeScroll() {
        alert(2)
        const iframe = this.$refs.iframe.$el;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const iframeBody = iframeDocument.body;
        const scrollPosition = iframeBody.scrollTop || iframeDocument.documentElement.scrollTop;


        let activeSectionIndex = null;
        for (let i = 0; i < this.tocSections.length; i++) {
          const section = this.tocSections[i];
          const sectionElement = iframeDocument.getElementById(section.id);
          const sectionOffsetTop = sectionElement.offsetTop;
          if (scrollPosition >= sectionOffsetTop) {
            activeSectionIndex = i;
          } else {
            break;
          }
        }

        this.activeSection = activeSectionIndex;
      },

    },
  };
</script>

<template>
  <v-container>
    <div v-html="htmlContent"></div>
    <v-row>
      <v-col>
        <v-card-title>
          <h2 class="font-weight-bold pa-3">3GPP Technical Specification</h2>
          <v-select variant="outlined" placeholder="File Directory" label="Select TS" density="compact" hide-details
            :items="fileOptions" item-title="name" item-value="path" v-model="iframeSrc">
          </v-select>
        </v-card-title>
        <v-card height="90vh">
          <v-layout>
            <v-navigation-drawer :rail="rail" rail-width=93 width='27vw' min-width='30em' permanent>
              <v-card :ripple="false" @click="rail = false" v-click-outside="onClickOutside">
                <v-text-field density='compact' variant="solo" class="elevation-1 ma-3" hide-details
                  placeholder="Filter Headings" v-model="searchKey" @click="rail = false"></v-text-field>
                <div class="toc">
                  <!-- <h2>Table of Contents</h2> -->
                  <v-list-item v-for="item in filterdTodoList" :key="item.id"
                  link=true variant='flat' density='compact'>
                    <template v-slot:prepend>
                      <v-avatar density='compact' style="width: 4em" size='small'>
                        {{ item.id.toString() }}
                      </v-avatar>
                    </template>
                    <div v-html="hrefToHeading(item)"></div>
                  </v-list-item>
                </div>
              </v-card>
            </v-navigation-drawer>

            <v-main style="height: 90vh;">
              <iframe name="3gppiframe" ref="iframe" id="iframe-id" frameborder="0" :src="iframeSrc" scrolling="yes"
                @load="handleIframeLoad">
              </iframe>
            </v-main>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .toc {
    float: left;
    position: relative;
    height: calc(90vh - 72px);
    overflow-y: auto;
    scrollbar-width: thin; /* Firefox */
    left: 0;
    width: 27vw;
    min-width: 30em;
    padding: 0px;
  }

  iframe {
    top: 0;
    left: 0;
    position: absolute;
    margin-left: 15ch;
    width: calc(100% - 15ch);
    height: 100%;
  }
</style>

// onload="this.height=this.contentWindow.document.body.scrollHeight"
/**

**/
