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
import { defineComponent, PropType } from "vue";
import { taskbarWidth, WINDOW_TOOLBAR_CONTEXT_MENU } from "../const";
import { activeWindowsId, windows } from "./windows";
import { IWindow } from "@xiaobai-world/api";

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
   const appName = windows.value[idx].appName;
   const css = windows.value[idx].css;
   windows.value.splice(idx, 1);
   console.log(
    windows.value,
    windows.value.some((win) => win.appName === appName)
   );

   if (
    !windows.value.some((win) => win.appName === appName) ||
    windows.value.length < 1
   ) {
    console.log("开始移除");
    // remove css
    css.forEach((src) => {
     let link = document.querySelector(`link[href="${src}"]`);
     link?.parentNode?.removeChild(link);
    });
   }
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

<style lang="less">
.xiaobai-window-wrapper {
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