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
import { contextMenus } from ".";
import { IContextMenuItem } from "./types";
export default {
  setup() {
    return {
      contextMenus,
    };
  },
  methods: {
    contextMenuItemClick(item: IContextMenuItem) {
      item.callback(item);
    },
  },
  mounted() {
    /**
     * avoid hiding menus whe tou press the mouse over them
     */
    document.addEventListener("mousedown", (event: MouseEvent) => {
      if (!this.$el) {
        return;
      }
      const target = event.target;
      if (target === null) {
        return;
      }
      if ((<Element>this.$el).contains(<Element>target)) {
        return;
      }
      contextMenus.value.visible = false;
    });
    /**
     * when click on a menu item,hide the menu
     */
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target;
      if (target === null) {
        return;
      }
      if ((<Element>this.$el).contains(<Element>target)) {
        contextMenus.value.visible = false;
      }
    });
  },
};
</script>

<style lang="less">
#xiaobai-context-menu {
  position: fixed;
  z-index: 9999999999;
  background: #f2f2f2;
  padding: 3px 0;
  box-shadow: 0 0 0 1px #aaa;
  border-radius: 2px;
  user-select: none;
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