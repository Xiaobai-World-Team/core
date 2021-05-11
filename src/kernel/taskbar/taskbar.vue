<template>
  <div id="xiaobai-world-taskbar">
    <div
      class="xiaobai-world-taskbar-app"
      v-for="(window, idx) in windows"
      :key="window.id"
      :class="{ xiaobaiTaskbarAppActive: activeWindowsId === window.id }"
      @click="showWindow(idx)"
    >
      <div class="xiaobai-world-taskbar-app-item">
        <img :src="window.icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { activeWindowsId, windows } from "../windows/windows";
import { taskbarWidthForPx } from "../const";

export default defineComponent({
  setup() {
    function showWindow(idx: number) {
      activeWindowsId.value = windows.value[idx].id;
      windows.value[idx].visible = true;
    }
    return {
      showWindow,
      windows,
      activeWindowsId,
      taskbarWidthForPx,
    };
  },
});
</script>

<style lang="less">
#xiaobai-world-taskbar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: v-bind(taskbarWidthForPx);
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
  > .xiaobai-world-taskbar-app {
    display: flex;
    align-items: center;
    &.xiaobaiTaskbarAppActive {
      > .xiaobai-world-taskbar-app-item {
        box-shadow: 0 0 0 2px rgb(21, 200, 255);
        img {
          max-width: 40px;
          max-height: 40px;
        }
      }
    }
    > .xiaobai-world-taskbar-app-item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background: #fff;
      margin: 8px 0;
      padding: 6px;
      border-radius: 6px;
      transition: all 0.2s;
      img {
        min-width: 35px;
        min-height: 35px;
        max-width: 35px;
        max-height: 35px;
        transition: all 0.1s;
      }
    }
  }
}
</style>