<template>
  <div id="xiaobai-world-taskbar">
    <div
      class="xiaobai-world-taskbar-app"
      v-for="window in windows"
      :key="window.id"
      :class="{ xiaobaiTaskbarAppActive: activeWindowsId === window.id }"
      @click="activeWindowsId = window.id"
    >
      <div class="xiaobai-world-taskbar-app-item">
        <img :src="window.icon" />
        <!-- <span>{{ window.title }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { activeWindowsId, windows } from "../windows/windows";

export default defineComponent({
  setup() {
    return {
      windows,
      activeWindowsId,
    };
  },
});
</script>

<style lang="less">
#xiaobai-world-taskbar {
  position: fixed;
  left: 50%;
  bottom: 1.5em;
  height: 70px;
  background: rgba(0, 0, 0, 0.1);
  transform: translateX(-50%);
  padding: 0 1em;
  border-radius: 12px;
  z-index: 9999999999;
  display: flex;
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
      margin: 0 8px;
      padding: 6px;
      border-radius: 6px;
      transition: all 0.2s;
      img {
        max-width: 35px;
        max-height: 35px;
        transition: all 0.1s;
      }
    }
  }
}
</style>