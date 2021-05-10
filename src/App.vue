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
  <div id="xiaobai-world-taskbar"></div>
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

export default defineComponent({
  name: "XiaobaiWorld",
  components: {
    contextMenu,
    login,
    desktop,
    windows
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
  mounted() {
    document
      .querySelector("#xiaobai-world-taskbar")
      ?.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        window.xiaobaiApi.TrackPopupMenu([
          {
            text: "AAAAAAAA",
            disable: true,
            callback() {
              alert(123);
            },
          },
        ]);
      });
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
  display: flex;
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
  z-index: 9999999999;
}
#xiaobai-workd-desktop-wrapper {
  flex: 1 1 0;
}
</style>
