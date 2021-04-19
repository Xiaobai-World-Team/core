import { ref } from "@vue/reactivity";
import { IContextMenu } from "../types/context-menu";

export const contextMenus = ref<IContextMenu>({
  visible: false,
  x: 0,
  y: 0,
  menus: [
    {
      disable: false,
      text: 'AAA'
    }
  ]
})

document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  contextMenus.value.x = event.pageX;
  contextMenus.value.y = event.pageY;
});

window.addEventListener('message', (event) => {
  if (event.data.type === 'CONTEXT_MENU') {
    contextMenus.value.menus = event.data.data
  }
})
