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
    <div class="xiaobai-window-content">
      <pre>{{ window }}</pre>
    </div>

    <div
      xiaobai-resize-trigger="move"
      @dblclick="max(window.id)"
      class="xiaobai-window-toolbar"
    >
      <img class="xiaobai-window-toolbar-icon" :src="window.icon" />
      {{ window.title }}
    </div>
    <div xiaobai-resize-trigger="move" @dblclick="max(window.id)">
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { taskbarWidth } from "../const";
import { activeWindowsId, windows } from "./windows";

export default defineComponent({
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
    return {
      close,
      min,
      max,
      windows,
      activeWindowsId,
    };
  },
  mounted() {
    function preventDefault(ev: Event) {
      ev.preventDefault();
    }

    function setTopWindow(id: string) {
      activeWindowsId.value = id;
    }

    /**
     * set top window
     */
    document.addEventListener("mousedown", (ev) => {
      let node = <Element>ev.target;
      if (node instanceof Element === false) {
        return;
      }
      if (Array.from(node.classList).includes("xiaobai-window-wrapper")) {
        setTopWindow(node.id);
        return;
      }
      while (node !== null) {
        node = <Element>node.parentNode;
        if (node.nodeName === "BODY") {
          break;
        }
        if (Array.from(node.classList).includes("xiaobai-window-wrapper")) {
          setTopWindow(node.id);
          break;
        }
      }
    });

    /**
     * resize and scale
     */
    document.addEventListener("mousedown", function (ev) {
      if (ev.target === null) {
        return;
      }

      const target: HTMLDivElement = <HTMLDivElement>ev.target;
      const action = target.getAttribute("xiaobai-resize-trigger");

      if (action === null) {
        return;
      }

      ev.preventDefault();
      ev.stopPropagation();

      const parent = <HTMLDivElement>target.parentNode;
      const id = parent.id;

      const windowIdx = windows.value.findIndex((item) => {
        return item.id === id;
      });

      const obj = windows.value[windowIdx];

      // disabled animation
      obj.animation = false;

      // save init point
      var _initPoint = {
        left: obj.x,
        top: obj.y,
        width: obj.width,
        height: obj.height,
      };

      var initX = ev.pageX;
      var initY = ev.pageY;
      var startX = _initPoint.left;
      var startY = _initPoint.top;
      var endX = _initPoint.left + _initPoint.width;
      var endY = _initPoint.top + _initPoint.height;

      bind();

      function bind() {
        document.addEventListener("selectstart", preventDefault);
        document.addEventListener("dragstart", preventDefault);

        // save coordinates during movement
        var point = {
          startX: _initPoint.left,
          startY: _initPoint.top,
          endX: endX,
          endY: endY,
        };

        function mousemove(ev: MouseEvent) {
          switch (action) {
            case "e":
              point.endX = endX + (ev.pageX - initX);
              break;
            case "s":
              point.endY = endY + (ev.pageY - initY);
              break;
            case "w":
              point.startX = startX - (initX - ev.pageX);
              break;
            case "n":
              point.startY = startY - (initY - ev.pageY);
              break;
            case "nw":
              point.startX = startX - (initX - ev.pageX);
              point.startY = startY - (initY - ev.pageY);
              break;
            case "sw":
              point.startX = startX - (initX - ev.pageX);
              point.endY = endY + (ev.pageY - initY);
              break;
            case "se":
              point.endX = endX + (ev.pageX - initX);
              point.endY = endY + (ev.pageY - initY);
              break;
            case "ne":
              point.endX = endX + (ev.pageX - initX);
              point.startY = startY - (initY - ev.pageY);
              break;
            case "move":
              obj.x = point.startX + (ev.pageX - initX);
              obj.y = point.startY + (ev.pageY - initY);
              if (obj.x <= taskbarWidth.value) {
                obj.x = taskbarWidth.value;
              }
              if (obj.y <= 0) {
                obj.y = 0;
              }
              return;
          }

          var newPoint = {
            left: point.startX < point.endX ? point.startX : point.endX,
            top: point.startY < point.endY ? point.startY : point.endY,
            width:
              point.startX < point.endX
                ? point.endX - point.startX
                : point.startX - point.endX,
            height:
              point.startY < point.endY
                ? point.endY - point.startY
                : point.startY - point.endY,
          };

          obj.x = newPoint.left;
          obj.y = newPoint.top;
          obj.width = newPoint.width;
          obj.height = newPoint.height;
        }
        document.addEventListener("mousemove", mousemove);

        function mouseup() {
          document.removeEventListener("selectstart", preventDefault);
          document.removeEventListener("dragstart", preventDefault);
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
          obj.animation = true;
        }

        document.addEventListener("mouseup", mouseup);
      }
    });
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
