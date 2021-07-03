import { readonly, ref } from "@vue/reactivity";
import { request } from "../request/request";

const user = ref<IUser | void>()

/** show or hide the login box */
export const loginModelVisible = ref(false)

/** user info */
export const userInfo = readonly(user)

/** get user info */
async function getUserInfo() {
  const res = await request.get('/user/info')
  if (res.data.email) {
    user.value = res.data
  }
}

/** display login box */
export function showLoginModal() {
  loginModelVisible.value = true
}

/** hide login box */
export function hideLoginModal() {
  loginModelVisible.value = false
}

/** on page load, immediately call */
getUserInfo();
