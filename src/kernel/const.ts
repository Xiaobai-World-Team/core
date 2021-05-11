import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

/** taskbar width */
export const taskbarWidth = ref(68)

/** taskbar width for px */
export const taskbarWidthForPx = computed(() => {
  return taskbarWidth.value + 'px'
})
