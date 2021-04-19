<template>
  <div
    id="xiaobai-context-menu"
    :style="{
      left: `${contextMenus.x}px`,
      top: `${contextMenus.y}px`,
    }"
  >
    {{ contextMenus }}
  </div>
</template>

<script lang="ts">
import { contextMenus } from "../kernel/context-menus";
export default {
  setup() {
    return {
      contextMenus,
    };
  },
};
</script>

<style lang="less">
#xiaobai-context-menu {
  position: fixed;
  z-index: 99999;
  background: #f2f2f2;
  padding: 8px;
  box-shadow: 0 0 0 1px #aaa;
}
</style>