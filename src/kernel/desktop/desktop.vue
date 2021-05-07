<template>
  <div>desktop</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
    return {};
  },
});
</script>

<style>
</style>