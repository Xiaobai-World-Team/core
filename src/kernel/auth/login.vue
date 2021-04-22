<template>
  <div id="xiaobai-login-modal" v-if="loginModelVisible">Login</div>
</template>

<script>
import { loginModelVisible } from "./index.ts";
export default {
  setup() {
    return {
      loginModelVisible,
    };
  },
};
</script>

<style lang="less">
#xiaobai-login-modal {
  position: fixed;
  
}
</style>