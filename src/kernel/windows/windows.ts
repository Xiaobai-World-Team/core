import { ref } from "@vue/reactivity";

/** 
 * on desktop have mutiple windows, every window has below "IWindow interface",
 * each window be the body's directly child
 * */
interface IWindow {
  title: string,
  id: string;
  x: number
  y: number
  width: number
  height: number
  active: boolean
  visible: boolean
  icon: string
}

export const windows = ref<IWindow[]>([])

/**
 * at all times, only one window has actived, and it's the top window
 */
export const activeWindowsId = ref('')

windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  x: 100,
  y: 160,
  width: 300,
  height: 300,
  active: false,
  title: "Calculator",
  visible: true,
  icon: 'https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/application/app-icon/calculator.svg'
})

windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  x: 500,
  y: 200,
  width: 500,
  height: 200,
  active: false,
  visible: true,
  title: "Notepad",
  icon: 'https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/application/app-icon/48icon_Notepad.svg'
})