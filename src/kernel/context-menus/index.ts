
import { ref } from "@vue/reactivity";
import { IContextMenu, IContextMenuItem, XiaobaiFileSystem } from "@xiaobai-world/api";


export const contextMenus = ref<IContextMenu>({
  visible: false,
  x: 0,
  y: 0,
  menus: []
})

document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  document.title = Math.random().toString()
  contextMenus.value.x = event.pageX;
  contextMenus.value.y = event.pageY;
}, { capture: true });

window.xiaobaiApi.TrackPopupMenu = function (menus: IContextMenuItem[]) {
  contextMenus.value.menus = menus
  contextMenus.value.visible = true
}

window.xiaobaiApi.FileSystem = new XiaobaiFileSystem()

window.xiaobaiApi.FileSystem.mkDir('/xiaobai')

window.addEventListener('message', (event) => {
  if (event.data.type === 'CONTEXT_MENU') {
    contextMenus.value.menus = event.data.data
  }
})
