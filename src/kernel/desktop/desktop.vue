<template>
  <div class="xiaobai-world-desktop" @click="activeWindowsId = ''"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DESKTOP_CONTEXT_MENU, taskbarWidthForPx } from "../const";
import { activeWindowsId } from "../windows/windows";

/** user file */
interface IUserFile {
  /** virtual disk address that usually points to a file */
  target: string;
}

/** app */
interface IApp {
  /** icon */
  icon: string;
  /**
   * title
   * on hover,will be show this title
   */
  title: string;
  /** app name */
  name: string;
  /* it's usually a JS file */
  entry: string;
}

export default defineComponent({
  props: {
    order: {
      type: Object as PropType<File>,
      required: true,
    },
  },
  setup() {
    return {
      activeWindowsId,
      taskbarWidthForPx,
    };
  },
  mounted() {
    this.$el.addEventListener("contextmenu", (event: MouseEvent) => {
      event.preventDefault();
      window.xiaobaiApi.TrackPopupMenu([
        {
          id: DESKTOP_CONTEXT_MENU.NEW_FOLDER,
          text: "Create Folder",
          disable: true,
          callback(ab) {
            console.log(ab);
          },
        },
        {
          id: DESKTOP_CONTEXT_MENU.CREATE_TXT,
          text: "Create Text File",
          disable: true,
          callback(ab) {
            console.log(ab);
          },
        },
      ]);
    });
  },
});
</script>

<style lang="less">
.xiaobai-world-desktop {
  height: 100%;
  box-sizing: border-box;
  margin-left: v-bind(taskbarWidthForPx);
}
</style>