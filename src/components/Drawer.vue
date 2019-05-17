<template>
  <div class="drawer" :class="{'drawer--show':show}">
    <div class="drawer-bg"/>
    <div class="panel">
      <div class="control" @click="open">
        <slot>
          <div>
            <span style="writing-mode: vertical-rl;">{{show?'隐藏':'显示'}}</span>
          </div>
        </slot>
      </div>
      <div class="page" v-if="show">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  prop: {
    show: {
      type: Boolean,
      default: false
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
      const parent = evt.target.closest(".panel");
      if (!parent) {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped>
.drawer--show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.drawer--show .drawer-bg {
  z-index: 20000;
  opacity: 1;
  width: 100%;
  height: 100%;
}

.drawer--show .panel {
  transform: translate(0);
}
.drawer-bg {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.panel {
  height: 100vh;
  width: 100%;
  max-width: 700px;
  position: fixed;
  top: 0px;
  right: 0px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.control {
  width: 40px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 30vh;
  left: -40px;
  right: 0;
  color: #606266;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-right: 0;
  cursor: pointer;
}
</style>
