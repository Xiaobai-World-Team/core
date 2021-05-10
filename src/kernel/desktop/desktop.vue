<template>
  <div class="xiaobai-world-desktop" @click="activeWindowsId = ''">desktop</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
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
    };
  },
});
</script>

<style lang="less">
.xiaobai-world-desktop {
  height: 100%;
  box-sizing: border-box;
}
</style>