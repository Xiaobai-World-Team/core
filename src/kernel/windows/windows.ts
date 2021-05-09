import { ref } from "@vue/reactivity";

/** 
 * on desktop have mutiple windows, every window has below "IWindow interface",
 * each window be the body's directly child
 * */
interface IWindow {
  id: string;
  x: number
  y: number
  width: number
  height: number
}

export const windows = ref<IWindow[]>([])

windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  x: 100,
  y: 160,
  width: 300,
  height: 300
})

windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  x: 500,
  y: 200,
  width: 500,
  height: 200
})