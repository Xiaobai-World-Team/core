<template>
  <div
    id="xiaobai-context-menu"
    v-if="contextMenus.visible"
    :style="{
      left: `${contextMenus.x}px`,
      top: `${contextMenus.y}px`,
    }"
  >
    <ul>
      <li
        v-for="menu in contextMenus.menus"
        @click="contextMenuItemClick(menu)"
        :key="menu.id"
      >
        {{ menu.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { contextMenus } from "../kernel/context-menus";
import { IContextMenuItem } from "../types/context-menu";
export default {
  setup() {
    return {
      contextMenus,
    };
  },
  methods: {
    contextMenuItemClick(item: IContextMenuItem) {
      item.callback();
    },
  },
  mounted() {
    document.addEventListener("click", (event) => {
      if (!this.$el) {
        return;
      }
      contextMenus.value.visible = false;
    });
  },
};
</script>

<style lang="less">
#xiaobai-context-menu {
  position: fixed;
  z-index: 99999;
  background: #f2f2f2;
  padding: 3px 0;
  box-shadow: 0 0 0 1px #aaa;
  border-radius: 2px;
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    cursor: default;
  }
  ul {
    font-size: 14px;
  }
  li {
    padding: 3px 12px;
    min-width: 220px;
  }
  > ul > li {
    display: block;
    &:hover {
      background: #ccc;
    }
  }
}
</style>