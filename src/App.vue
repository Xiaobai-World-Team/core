<template>
  <!-- Desktop  -->
  <div id="xiaobai-world-root">
    <!-- 
      The 1# desktop,
      meaning there could be multiple desktops in the future.
    -->
    <div class="xiaobai-workd-desktop"></div>
  </div>
  <!-- Taskbar -->
  <div id="xiaobai-world-taskbar"></div>
  <!-- ContextMenu -->
  <contextMenu />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IApplication } from "./types/application";
import contextMenu from "./components/context-menu.vue";

export default defineComponent({
  name: "XiaobaiWorld",
  components: {
    contextMenu,
  },
  setup() {
    /**
     * All applications
     */
    const applications = ref<IApplication[]>([]);
    /**
     * The currently active window
     */
    const activeedApplicationHandle = ref("");
    return {
      applications,
      activeedApplicationHandle,
    };
  },
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#xiaobai-world-root {
  width: 100vw;
  height: 100vh;
  border: solid 12px rgb(0, 182, 167);
  box-sizing: border-box;
}
#xiaobai-world-taskbar {
  position: fixed;
  left: 50%;
  bottom: 1.5em;
  height: 70px;
  background: rgb(40, 143, 112);
  width: 50vw;
  transform: translateX(-50%);
  border-radius: 12px;
}
</style>
