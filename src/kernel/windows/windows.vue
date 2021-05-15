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
      activeWindowsId
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

  > .xiaobai-window-toolbar {
    height: 50px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    user-select: none;
    color: #555;
    font-weight: bold;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    .xiaobai-window-toolbar-icon {
      width: 22px;
      height: 22px;
      margin-right: 6px;
      pointer-events: none;
    }
  }
  > [xiaobai-resize-trigger="e"],
  > [xiaobai-resize-trigger="s"],
  > [xiaobai-resize-trigger="w"],
  > [xiaobai-resize-trigger="n"],
  > [xiaobai-resize-trigger="ne"],
  > [xiaobai-resize-trigger="nw"],
  > [xiaobai-resize-trigger="sw"],
  > [xiaobai-resize-trigger="se"] {
    position: absolute;
    box-sizing: border-box;
    opacity: 0;
  }
  > [xiaobai-resize-trigger="e"] {
    right: -6px;
    top: 0;
    bottom: 0;
    width: 8px;
    background: rgba(255, 255, 255, 0.5);
    cursor: e-resize;
  }
  > [xiaobai-resize-trigger="s"] {
    left: 0;
    bottom: -6px;
    right: 0;
    height: 8px;
    background: rgba(2, 208, 255, 0.5);
    cursor: s-resize;
  }
  > [xiaobai-resize-trigger="w"] {
    left: -6px;
    bottom: 0;
    top: 0;
    width: 8px;
    background: rgba(255, 27, 50, 0.5);
    cursor: w-resize;
  }
  > [xiaobai-resize-trigger="n"] {
    left: 0;
    top: -6px;
    right: 0;
    height: 8px;
    background: rgba(255, 255, 0, 0.4);
    cursor: n-resize;
  }
  > [xiaobai-resize-trigger="ne"] {
    border-radius: 50% 50%;
    width: 14px;
    height: 14px;
    right: -7px;
    top: -7px;
    background: #fff;
    z-index: 2;
    cursor: ne-resize;
  }
  > [xiaobai-resize-trigger="nw"] {
    border-radius: 50% 50%;
    width: 14px;
    height: 14px;
    left: -7px;
    top: -7px;
    background: #fff;
    z-index: 2;
    cursor: nw-resize;
  }
  > [xiaobai-resize-trigger="sw"] {
    border-radius: 50% 50%;
    width: 14px;
    height: 14px;
    left: -7px;
    bottom: -7px;
    background: #fff;
    z-index: 2;
    cursor: sw-resize;
  }
  > [xiaobai-resize-trigger="se"] {
    border-radius: 50% 50%;
    width: 14px;
    height: 14px;
    right: -7px;
    bottom: -7px;
    background: #fff;
    z-index: 2;
    cursor: se-resize;
  }
}
[xiaobai-resize-trigger="move"] {
  position: absolute;
  left: 6px;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0;
  height: 50px;
  background: none;
  > div {
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: blue;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 0 0 0.5em;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    opacity: 0.8;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
      transform: scale(1.2);
    }
    &.min {
      background: rgb(255, 186, 57);
    }
    &.max {
      background: rgb(85, 221, 103);
    }
    &.close {
      background: rgb(255, 37, 37);
    }
  }
}
</style>
