<template>
  <div
    v-for="window in windows"
    :id="window.id"
    :key="window.id"
    class="xiaobai-window-resize"
    :class="{ xiaobaiWindowActive: activeWindowsId === window.id }"
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
    <div xiaobai-resize-trigger class="toolbar">Windows</div>
    <div xiaobai-resize-trigger class="e"></div>
    <div xiaobai-resize-trigger class="s"></div>
    <div xiaobai-resize-trigger class="w"></div>
    <div xiaobai-resize-trigger class="n"></div>
    <div xiaobai-resize-trigger class="ne"></div>
    <div xiaobai-resize-trigger class="nw"></div>
    <div xiaobai-resize-trigger class="sw"></div>
    <div xiaobai-resize-trigger class="se"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { activeWindowsId, windows } from "./windows";

export default defineComponent({
  setup() {
    return {
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

    document.addEventListener("mousedown", (ev) => {
      let node = <Element>ev.target;
      if (node instanceof Element === false) {
        return;
      }
      if (Array.from(node.classList).includes("xiaobai-window-resize")) {
        setTopWindow(node.id);
        return;
      }
      while (node !== null) {
        node = <Element>node.parentNode;
        if (Array.from(node.classList).includes("xiaobai-window-resize")) {
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

      if (target.getAttribute("xiaobai-resize-trigger") === null) {
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

      var direction = target.className;

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
          switch (direction) {
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
            case "toolbar":
              obj.x = point.startX + (ev.pageX - initX);
              obj.y = point.startY + (ev.pageY - initY);
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
        }

        document.addEventListener("mouseup", mouseup);
      }
    });
  },
});
</script>

<style lang="less">
.xiaobai-window-resize {
  background: #fff;
  border-radius: 1em;
  overflow: hidden;
  border: solid 1px #aaa;
  padding-top: 50px;
  display: flex;
  &.xiaobaiWindowActive {
    z-index: 99999999999;
    box-shadow: 0 1em 3em 0 rgba(0, 0, 0, 0.6);
  }
  > .xiaobai-window-content {
    flex: 1 1 0;
    overflow: auto;
  }
  > [xiaobai-resize-trigger] {
    position: absolute;
    box-sizing: border-box;
    border-bottom: solid 1px rgba(0, 0, 0, 0.6);
    opacity: 0;
  }
  > [xiaobai-resize-trigger].toolbar {
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
  }
  > [xiaobai-resize-trigger].e {
    right: -6px;
    top: 0;
    bottom: 0;
    width: 8px;
    background: rgba(255, 255, 255, 0.5);
    cursor: e-resize;
  }
  > [xiaobai-resize-trigger].s {
    left: 0;
    bottom: -6px;
    right: 0;
    height: 8px;
    background: rgba(2, 208, 255, 0.5);
    cursor: s-resize;
  }
  > [xiaobai-resize-trigger].w {
    left: -6px;
    bottom: 0;
    top: 0;
    width: 8px;
    background: rgba(255, 27, 50, 0.5);
    cursor: w-resize;
  }
  > [xiaobai-resize-trigger].n {
    left: 0;
    top: -6px;
    right: 0;
    height: 8px;
    background: rgba(255, 255, 0, 0.4);
    cursor: n-resize;
  }
  > [xiaobai-resize-trigger].ne {
    border-radius: 50% 50%;
    width: 14px;
    height: 14px;
    right: -7px;
    top: -7px;
    background: #fff;
    z-index: 2;
    cursor: ne-resize;
  }
  > [xiaobai-resize-trigger].nw {
    border-radius: 50% 50%;
    width: 14px;
    height: 14px;
    left: -7px;
    top: -7px;
    background: #fff;
    z-index: 2;
    cursor: nw-resize;
  }
  > [xiaobai-resize-trigger].sw {
    border-radius: 50% 50%;
    width: 14px;
    height: 14px;
    left: -7px;
    bottom: -7px;
    background: #fff;
    z-index: 2;
    cursor: sw-resize;
  }
  > [xiaobai-resize-trigger].se {
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
</style>
