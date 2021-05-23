<template>
  <div
    class="xiaobai-world-window-content"
    app-name="reactDemo"
    ref="content"
    :class="{ 'xiaobai-world-unused-window': window.isUsed === false }"
    :window-id="window.id"
  ></div>
</template>

<style>
</style>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { IWindow, loadScript } from "./windows";

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
    loadScript("/store/app/user/5274729adf7a7a8b7ccdeeea8/e92ad02be7600ddbb15bf3413b9f6181c7456c5be2e75861bce0eeb99884060b/assets/index.835a2cef.js").then(() => {
      window.postMessage(
        {
          XIAOBAI_EVENT: "XIAOBAI_APP_JAVASCRIPT_ENTRY_LOADED",
          id: this.window.id,
          appName: this.window.appName,
          title: this.window.title,
        },
        "*"
      );
    });
  },
});
</script>