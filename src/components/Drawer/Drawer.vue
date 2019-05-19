<template>
  <div class="drawer__container" :class="{'drawer__container--show':show}">
    <div class="drawer__container-bg"/>
    <div class="drawer" :style="drawerStyle">
      <div class="controls" ref="controls" :style="controlStyle" @click="open" @mouseover="open">
        <slot name="controls">
          <div>
            <span>{{show?'隐藏':'显示'}}</span>
          </div>
        </slot>
      </div>
      <div class="content" v-if="show">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // show: {
    //   type: Boolean,
    //   default: false
    // },
    position: {
      type: String,
      required: true
    },
    drawerStyle: {
      type: Object,
      required: true
    },
    controlStyle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addClickEvent();
      }
    }
  },
  mounted() {
    const rect = this.$refs["controls"].getBoundingClientRect();
    if (this.position === "top") {
      this.$refs["controls"].style["bottom"] = `-${rect.height}px`;
    }
    if (this.position === "bottom") {
      this.$refs["controls"].style["top"] = `-${rect.height}px`;
    }
    if (this.position === "right") {
      console.log("rect", rect);
      this.$refs["controls"].style["left"] = `-${rect.width}px`;
    }
    if (this.position === "left") {
      this.$refs["controls"].style["right"] = `-${rect.width}px`;
    }
  },
  destroyed() {
    this.removeClickEvent();
  },
  methods: {
    open() {
      this.show = !this.show;
    },
    closeSidebar(evt) {
      const parent = evt.target.closest(".drawer");
      if (!parent) {
        this.show = false;
        this.removeClickEvent();
      }
    },
    addClickEvent() {
      window.addEventListener("click", this.closeSidebar);
    },
    removeClickEvent() {
      window.removeEventListener("click", this.closeSidebar);
    }
  }
};
</script>

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
  transition: height 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: #fff;
  z-index: 20000;
}

.controls {
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  cursor: pointer;
}
.content {
  padding: 10px;
}
</style>
