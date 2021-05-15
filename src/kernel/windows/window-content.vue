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
    loadScript("/assets/index.3b27ab68.js").then(() => {
      console.log(Date.now())
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