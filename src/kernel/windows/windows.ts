import { ref } from "@vue/reactivity";
import { login } from '@xiaobai-world/api'
import { IWindow } from "@xiaobai-world/api/src/types";

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

login().then(res => {
  console.log(res)
})