<template>
  <div class="drawer__container" :class="[positionClass,{'drawer__container--show':show}]">
    <div class="drawer__container-bg"/>
    <div ref="drawer" class="drawer">
      <div
        class="controls__container"
        ref="controls"
        @click="toggleDrawerShow"
        @mouseover="toggleDrawerShowByMouseover"
      >
        <ul class="controls">
          <li v-for="(control,idx) in controlItems" class="control" :key="idx">
            <template v-if="show">
              <slot name="control" v-bind:control="control">{{control.hidden}}</slot>
            </template>
            <template v-else>
              <slot name="control" v-bind:control="control">{{control.show}}</slot>
            </template>
          </li>
        </ul>
      </div>
      <div class="content" v-if="show">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import { isArray, debounce } from "@/utils";
export default {
  props: {
    controls: {
      type: [Object, Array],
      default: () => {
        return {
          show: "显示",
          hidden: "隐藏"
        };
      }
    },
    triggerEvent: {
      type: String,
      default: "click"
    },
    position: {
      type: String,
      validator: function(value) {
        return ["top", "right", "bottom", "left"].indexOf(value) !== -1;
      }
    },
    controlOffset: {
      type: String,
      default: "400"
    },
    contentSize: {
      type: String,
      default: "300"
    },
    openDrawer: {
      type: Function
    }
  },
  data() {
    return {
      show: false,
      positionClass: this.position
    };
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addCloseSidebarListener();
      }
      if (value) {
        document.body.classList.add("hidden_scoll_bar");
      } else {
        document.body.classList.remove("hidden_scoll_bar");
      }
    }
  },
  computed: {
    controlItems() {
      if (isArray(this.controls)) {
        return this.controls;
      } else {
        return [this.controls];
      }
    }
  },
  mounted() {
    if (["top", "bottom"].includes(this.position)) {
      this.$refs["controls"].style["left"] = `${this.controlOffset}`;
      this.$refs["drawer"].style.maxHeight = this.contentSize;
    }
    if (["left", "right"].includes(this.position)) {
      this.$refs["controls"].style["top"] = `${this.controlOffset}`;
      this.$refs["drawer"].style.maxWidth = this.contentSize;
    }
    this.updateControlLayout();
  },
  created() {
    this.toggleDrawerShowByMouseover = debounce(
      this.toggleDrawerShowByMouseover
    );
  },
  destroyed() {
    this.removeCloseSidebarListener();
  },
  methods: {
    toggleDrawerShow() {
      if (this.triggerEvent === "click") {
        this.show = !this.show;
        this.$nextTick(() => {
          this.updateControlLayout();
        });
      }
    },
    toggleDrawerShowByMouseover(e) {
      // if (typeof this.openDrawer === "function") {
      //   this.show = this.openDrawer(e);
      //   this.updateControlLayout();
      // }
      if (this.triggerEvent === "mouseover") {
        this.show = !this.show;
        this.$nextTick(() => {
          this.updateControlLayout();
        });
        return;
      }
    },
    onDragShow() {
      // const onOpenDrawer = this.openDrawer;
      // if (!onOpenDrawer) {
      // }
    },
    closeSidebar(evt) {
      const parent = evt.target.closest(".drawer");
      if (!parent) {
        this.show = false;
        this.$nextTick(() => {
          this.updateControlLayout();
        });
        this.removeCloseSidebarListener();
      }
    },
    addCloseSidebarListener() {
      if (this.triggerEvent === "click") {
        window.addEventListener("click", this.closeSidebar);
      }
      if (this.triggerEvent === "mouseover") {
        window.addEventListener("mouseover", this.closeSidebar);
      }
    },
    removeCloseSidebarListener() {
      if (this.triggerEvent === "click") {
        window.removeEventListener("click", this.closeSidebar);
      }
      if (this.triggerEvent === "mouseover") {
        window.removeEventListener("mouseover", this.closeSidebar);
      }
    },
    updateControlLayout() {
      const controlsEl = this.$refs["controls"];
      const rect = controlsEl.getBoundingClientRect();
      if (this.position === "top") {
        controlsEl.style["bottom"] = `-${rect.height}px`;
      }
      if (this.position === "bottom") {
        controlsEl.style["top"] = `-${rect.height}px`;
      }
      if (this.position === "right") {
        controlsEl.style["left"] = `-${rect.width}px`;
      }
      if (this.position === "left") {
        controlsEl.style["right"] = `-${rect.width}px`;
      }
    }
  }
};
</script>

<style>
.hidden_scoll_bar {
  overflow: hidden;
}
</style>

<style scoped>
.drawer__container--show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.drawer__container--show .drawer__container-bg {
  opacity: 1;
  width: 100%;
  height: 100%;
  z-index: 20001;
}

.drawer__container--show .drawer {
  transform: translate(0) !important;
  z-index: 40000;
}
.drawer__container-bg {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.drawer {
  position: fixed;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: #fff;
  z-index: 20000;
}
.top .drawer {
  height: 100%;
  width: 100vw;
  transform: translate(0, -100%);
  top: 0;
  left: 0;
}
.bottom .drawer {
  height: 100%;
  width: 100vw;
  transform: translate(0, 100%);
  bottom: 0;
  left: 0;
}
.left .drawer {
  height: 100vh;
  width: 100%;
  transform: translate(-100%, 0);
  top: 0;
  left: 0;
}
.right .drawer {
  height: 100vh;
  width: 100%;
  transform: translate(100%, 0);
  top: 0;
  right: 0;
}

.controls__container {
  position: absolute;
  box-sizing: border-box;
  color: #606266;
  cursor: pointer;
}

.controls {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.control {
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.top .control,
.bottom .control {
  margin-left: 10px;
}
.left .control,
.right .control {
  margin-top: 10px;
}

.left .controls,
.right .controls {
  flex-direction: column;
}

.content {
  padding: 10px;
}
</style>
