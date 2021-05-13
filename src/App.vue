<template>
  <!-- Desktop  -->
  <div id="xiaobai-world-root">
    <!-- 
      The 1# desktop,
      meaning there could be multiple desktops in the future.
    -->
    <div id="xiaobai-workd-desktop-wrapper">
      <desktop order="1" />
    </div>
  </div>
  <!-- Taskbar -->
  <taskbar />
  <!-- Context Menu -->
  <contextMenu />
  <!-- Login Modal -->
  <login />
  <!-- Windows -->
  <windows />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IApplication } from "./types/application";
import contextMenu from "./kernel/context-menus/context-menu.vue";
import login from "./kernel/auth/login.vue";
import desktop from "./kernel/desktop/desktop.vue";
import windows from "./kernel/windows/windows.vue";
import taskbar from "./kernel/taskbar/taskbar.vue";

export default defineComponent({
  name: "XiaobaiWorld",
  components: {
    contextMenu,
    login,
    desktop,
    windows,
    taskbar,
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
  mounted() {},
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
  box-sizing: border-box;
  display: flex;
}

#xiaobai-workd-desktop-wrapper {
  flex: 1 1 0;
}
</style>
