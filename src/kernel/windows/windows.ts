import { ref } from "@vue/reactivity";

/** 
 * on desktop have mutiple windows, every window has below "IWindow interface",
 * each window be the body's directly child
 * */
export interface IWindow {
  /**
   * unique id of window, global unique
   */
  id: string;
  /** 
   * the name of the application mounted on the window, such as:
   * notepad, photoPreview, Calendar, allow repetition in multiple windows
   */
  appName: string;
  title: string,
  x: number
  y: number
  width: number
  height: number
  active: boolean
  visible: boolean
  icon: string
  animation: boolean
  /** before the window is maximized,save the window size for later recovery */
  previousWindowSize?: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  /** whether the window has been consumed */
  isUsed: boolean
}

export const windows = ref<IWindow[]>([])

/**
 * at all times, only one window has actived, and it's the top window
 */
export const activeWindowsId = ref('')

/** avoid the problem of sending multiple requests to a JS file at the same time */
const jsLoadCallback = new Map<string, Function[]>()

/** indicates whether a JS has been requested */
const jsLoadMap = new Map<string, true>()

/** load script */
export const loadScript = function (scriptUrl: string) {
  if (jsLoadMap.get(scriptUrl)) {
    return Promise.resolve()
  }
  if (!jsLoadCallback.has(scriptUrl)) {
    jsLoadCallback.set(scriptUrl, [])
  }
  const queue = jsLoadCallback.get(scriptUrl)
  return new Promise<void>((resolve) => {
    if (queue?.length === 0) {
      const script = document.createElement("script");
      script.type = "module";
      script.setAttribute("crossorigin", "");
      script.src = scriptUrl
      script.onload = () => {
        jsLoadCallback.get(scriptUrl)?.forEach((done) => done())
        // clear callback queue
        jsLoadCallback.delete(scriptUrl)
        jsLoadMap.set(scriptUrl, true)
      }
      document.querySelector('head')?.appendChild(script)
    }
    queue?.push(() => resolve())
  })
}

/**
 * The Z-index step value of each window is 1000
 */
windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  appName: 'reactDemo',
  x: 100,
  y: 30,
  width: 300,
  height: 300,
  active: false,
  title: "Calculator",
  visible: true,
  animation: true,
  icon: 'https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/application/app-icon/calculator.svg',
  isUsed: false
})

windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  appName: 'reactDemo',
  x: 550,
  y: 220,
  width: 500,
  height: 300,
  active: false,
  visible: true,
  animation: true,
  title: "Notepad",
  icon: 'https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/application/app-icon/48icon_Notepad.svg',
  isUsed: false
})

windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  appName: 'reactDemo',
  x: 600,
  y: 100,
  width: 500,
  height: 300,
  active: false,
  visible: true,
  animation: true,
  title: "Notepad",
  icon: 'https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/application/app-icon/48icon_Notepad.svg',
  isUsed: false
})

windows.value.push({
  id: Date.now().toString(36) + Math.random().toString(36).substring(2, 20),
  appName: 'reactDemo',
  x: 300,
  y: 100,
  width: 500,
  height: 300,
  active: false,
  visible: true,
  animation: true,
  title: "Notepad",
  icon: 'https://xiaobai-world.oss-cn-hangzhou.aliyuncs.com/application/app-icon/48icon_Notepad.svg',
  isUsed: false
})