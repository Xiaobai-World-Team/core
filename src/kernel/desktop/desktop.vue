<template>
 <div class="xiaobai-world-desktop" @click="activeWindowsId = ''">
  <div class="app" v-for="app in appList" @click="openApp(app)" :key="app._id">
   <img :src="app.favicon" />
   <span>{{ app.name }}</span>
  </div>
 </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { DESKTOP_CONTEXT_MENU, taskbarWidthForPx } from "../const";
import { IApp } from "../../types/app";
import { activeWindowsId, windows } from "../windows/windows";
import axios from "axios";

/** user file */
interface IUserFile {
 /** virtual disk address that usually points to a file */
 target: string;
}

export default defineComponent({
 props: {
  order: {
   type: String,
   required: true,
  },
 },
 setup() {
  function showFileMenu(event: MouseEvent) {
   event.stopPropagation();
   window.xiaobaiApi.TrackPopupMenu([
    {
     id: "xx",
     text: "打开应用",
     disable: true,
     callback: () => {},
    },
   ]);
  }

  const appList = ref<IApp[]>([]);

  function openApp(app: IApp) {
   const id = `xiaobai-window-${
    Date.now().toString(36) + Math.random().toString(36).substring(2, 20)
   }`;
   windows.value.push({
    id,
    mountPointId: `${id}-mount-point`,
    name: app.name,
    x: Math.random() * (document.body.offsetWidth / 1.5),
    y: Math.random() * (document.body.offsetHeight / 1.5),
    width: 300,
    height: 300,
    active: false,
    title: app.title,
    visible: true,
    animation: true,
    icon: app.favicon,
    jsEntry: app.jsEntry,
    css: app.css,
    isUsed: false,
    autoStart: false,
    appRootPath: app.appRootPath
   });
  }

  axios.get("/store/getAppList").then((res) => {
   appList.value = res.data.data;
  });

  return {
   openApp,
   appList,
   showFileMenu,
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
 padding: 1em;
 .app {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border-radius: 1em;
  &:hover {
   background: #f2f2f2;
  }
  &:active {
   background: #eeeeee;
  }
  img {
   min-width: 60px;
   min-height: 60px;
   max-width: 60px;
   max-height: 60px;
  }
  span {
   background: #f2f2f2;
   display: inline-block;
   margin-top: 5px;
   padding: 2px 5px;
   border-radius: 3px;
   word-break: break-all;
   font-size: 14px;
  }
 }
}
</style>