import { ref } from "@vue/reactivity";

interface IWindow {
  id: number;
  x: number
  y: number
  width: number
  height: number
}

const windows = ref<IWindow[]>([])