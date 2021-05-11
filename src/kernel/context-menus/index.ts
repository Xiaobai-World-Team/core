
import { ref } from "@vue/reactivity";
import { IContextMenu, IContextMenuItem } from "./types";


export const contextMenus = ref<IContextMenu>({
  visible: false,
  x: 0,
  y: 0,
  menus: []
})

document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  contextMenus.value.x = event.pageX;
  contextMenus.value.y = event.pageY;
});

window.xiaobaiApi.TrackPopupMenu = function (menus: IContextMenuItem[]) {
  contextMenus.value.menus = menus
  contextMenus.value.visible = true
}

window.addEventListener('message', (event) => {
  if (event.data.type === 'CONTEXT_MENU') {
    contextMenus.value.menus = event.data.data
  }
})