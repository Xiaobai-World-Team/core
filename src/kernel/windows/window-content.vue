<template>
 <div
  class="xiaobai-world-window-content"
  :name="window.name"
  ref="content"
  :class="{ 'xiaobai-world-unused-window': window.isUsed === false }"
  :id="window.mountPointId"
 ></div>
</template>

<style>
</style>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { IWindow } from "@xiaobai-world/api/src/types";
import { loadScript } from "./windows";

export default defineComponent({
 props: {
  window: {
   type: Object as PropType<IWindow>,
   required: true,
  },
 },
 mounted() {
  /** if app */
  const observer = new MutationObserver((list, observer) => {
   observer.disconnect();
   /** indicates that this application has been mounted */
   this.window.isUsed = true;
  });
  observer.observe(<Element>this.$refs.content, { childList: true });

  // link css
  this.window.css.forEach((src) => {
   if (document.querySelector(`link[href="${src}"]`)) {
    return;
   }
   let link = document.createElement("link");
   link.rel = "stylesheet";
   link.type = "text/css";
   link.href = src;
   document.querySelector("head")?.appendChild(link);
  });

  loadScript(this.window.jsEntry).then(() => {
   window.postMessage(
    {
     XIAOBAI_EVENT: "XIAOBAI_APP_JAVASCRIPT_ENTRY_LOADED",
     id: this.window.mountPointId,
     name: this.window.name,
     title: this.window.title,
    },
    "*"
   );
  });
 },
});
</script>