<template>
  <div
    xiaobai-resize-trigger="move"
    @contextmenu="toolbarContextMenu($event, window.id)"
    @dblclick="max(window.id)"
    class="xiaobai-window-toolbar"
  >
    <img class="xiaobai-window-toolbar-icon" :src="window.icon" />
    {{ window.title }}
  </div>
  <div
    xiaobai-resize-trigger="move"
    @contextmenu="toolbarContextMenu($event, window.id)"
    @dblclick="max(window.id)"
  >
    <div class="close" title="Close" @click="close(window.id)"></div>
    <div class="min" title="Min" @click="min(window.id)"></div>
    <div class="max" title="Max" @click="max(window.id)"></div>
  </div>
  <div xiaobai-resize-trigger="e"></div>
  <div xiaobai-resize-trigger="s"></div>
  <div xiaobai-resize-trigger="w"></div>
  <div xiaobai-resize-trigger="n"></div>
  <div xiaobai-resize-trigger="ne"></div>
  <div xiaobai-resize-trigger="nw"></div>
  <div xiaobai-resize-trigger="sw"></div>
  <div xiaobai-resize-trigger="se"></div>
</template>

<script lang="ts">
import "./window-lisentener";
import { defineComponent, PropType } from 'vue'
import { taskbarWidth, WINDOW_TOOLBAR_CONTEXT_MENU } from "../const";
import { activeWindowsId, windows, IWindow } from "./windows";

export default defineComponent({
  props: {
    window: {
      type: Object as PropType<IWindow>,
      required: true,
    },
  },
  setup() {
    function close(id: string) {
      const idx = windows.value.findIndex((window) => window.id === id);
      windows.value.splice(idx, 1);
    }
    function min(id: string) {
      const idx = windows.value.findIndex((window) => window.id === id);
      windows.value[idx].visible = false;
    }
    function max(id: string) {
      const idx = windows.value.findIndex((window) => window.id === id);
      const obj = windows.value[idx];

      if (obj.previousWindowSize) {
        obj.x = obj.previousWindowSize.x;
        obj.y = obj.previousWindowSize.y;
        obj.width = obj.previousWindowSize.width;
        obj.height = obj.previousWindowSize.height;
        obj.previousWindowSize = undefined;
        return;
      }

      // first save the window size
      obj.previousWindowSize = {
        x: obj.x,
        y: obj.y,
        width: obj.width,
        height: obj.height,
      };

      obj.x = taskbarWidth.value;
      obj.y = 0;
      obj.width = window.innerWidth - taskbarWidth.value;
      obj.height = window.innerHeight;
    }

    function toolbarContextMenu(event: MouseEvent, id: string) {
      event.preventDefault();
      window.xiaobaiApi.TrackPopupMenu([
        {
          id: WINDOW_TOOLBAR_CONTEXT_MENU.CLOSE_WINDOW,
          text: "Close Window",
          disable: true,
          callback: () => {
            close(id);
          },
        },
        {
          id: WINDOW_TOOLBAR_CONTEXT_MENU.MAX,
          text: "max",
          disable: true,
          callback() {
            max(id);
          },
        },
        {
          id: WINDOW_TOOLBAR_CONTEXT_MENU.MIN,
          text: "min",
          disable: true,
          callback() {
            min(id);
          },
        },
      ]);
    }
    return {
      close,
      min,
      max,
      toolbarContextMenu,
      windows,
      activeWindowsId,
    };
  },
});
</script>

<style>
</style>