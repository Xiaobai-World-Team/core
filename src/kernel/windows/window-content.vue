<template>
 <div
  class="xiaobai-world-window-content"
  app-name="reactDemo"
  ref="content"
  :class="{ 'xiaobai-world-unused-window': window.isUsed === false }"
  :id="window.mountPointId"
 ></div>
</template>

<style>
</style>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { IWindow } from "@xiaobai-world/api";
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
   console.log("发送消息", this.window.mountPointId);
   window.postMessage(
    {
     XIAOBAI_EVENT: "XIAOBAI_APP_JAVASCRIPT_ENTRY_LOADED",
     id: this.window.mountPointId,
     appName: this.window.appName,
     title: this.window.title,
    },
    "*"
   );
  });
 },
});
</script>