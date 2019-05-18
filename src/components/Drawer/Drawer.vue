<template>
  <div class="drawer__container" :class="{'drawer__container--show':show}">
    <div class="drawer__container-bg"/>
    <div class="drawer" :style="drawerStyle">
      <div class="controls" ref="controls" :style="controlStyle" @click="open">
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
  mounted() {
    window.addEventListener("click", this.closeSidebar);
  },
  destroyed() {
    window.removeEventListener("click", this.closeSidebar);
  },
  methods: {
    open() {
      this.show = !this.show;
    },
    closeSidebar(evt) {
      const parent = evt.target.closest(".drawer");
      if (!parent) {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped>
.drawer__container--show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.drawer__container--show .drawer__container-bg {
  z-index: 20000;
  opacity: 1;
  width: 100%;
  height: 100%;
}

.drawer__container--show .drawer {
  transform: translate(0) !important;
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
  z-index: 40000;
}

.controls {
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  cursor: pointer;
}
.content {
  padding: 10px;
}
</style>
