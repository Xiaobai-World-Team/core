<template>
  <div
    v-for="window in windows"
    :id="window.id"
    :key="window.id"
    class="xiaobai-window-wrapper"
    v-show="window.visible"
    :class="{
      xiaobaiWindowActive: activeWindowsId === window.id,
      animation: window.animation,
    }"
    :style="{
      position: 'fixed',
      left: window.x + 'px',
      top: window.y + 'px',
      width: window.width + 'px',
      height: window.height + 'px',
    }"
  >
    <div class="xiaobai-window-content" id="root">
      <pre>{{ window }}</pre>
    </div>
    <windowsHandler :window="window" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import windowsHandler from "./window-handler.vue";
import { activeWindowsId, windows } from "./windows";

export default defineComponent({
  setup() {
    return {
      windows,
      activeWindowsId,
    };
  },
  components: {
    windowsHandler,
  },
  mounted() {
    const script = document.createElement("script");
    script.type = "module";
    script.setAttribute("crossorigin", "");
    script.src = "/assets/index.428aea8c.js";
    document.body.appendChild(script);
  },
});
</script>

<style lang="less">
.xiaobai-window-wrapper {
  background: #fff;
  border-radius: 1em;
  overflow: hidden;
  border: solid 1px #bbb;
  padding-top: 50px;
  display: flex;
  box-shadow: 0 1em 1em 0 rgba(0, 0, 0, 0.1);
  &.xiaobaiWindowActive {
    z-index: 9999999;
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.6);
  }
  &.animation {
    transition: all 0.2s;
  }
  > .xiaobai-window-content {
    flex: 1 1 0;
    overflow: auto;
  }
}
</style>
