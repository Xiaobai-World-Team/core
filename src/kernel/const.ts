import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

/** taskbar width */
export const taskbarWidth = ref(68)

/** taskbar width for px */
export const taskbarWidthForPx = computed(() => {
  return taskbarWidth.value + 'px'
})

/** ContenxtMenu of Desktop */
export enum DESKTOP_CONTEXT_MENU {
  /** create a folder */
  NEW_FOLDER = 'NEW_FOLDER',
  /** create a txt file */
  CREATE_TXT = 'CREATE_TXT'
}

/** ContenxtMenu of Window */
export enum WINDOW_TOOLBAR_CONTEXT_MENU {
  /** close window */
  CLOSE_WINDOW = 'CLOSE_WINDOW',
  /** MIN */
  MIN = 'MIN',
  /** MIN */
  MAX = 'MAX'
}

