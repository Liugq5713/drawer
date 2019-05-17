<template>
  <div class="rightPanel-container" :class="{show:show}">
    <div class="rightPanel-background"/>
    <div class="rightPanel">
      <div class="btn--wrapper" @click="open">
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
  watch: {
    show() {
      document.body.classList.toggle("showRightPanel");
    }
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
      const parent = evt.target.closest(".rightPanel");
      if (!parent) {
        this.show = false;
      }
    }
  }
};
</script>

<style scoped>
.showRightPanel {
  position: relative;
  width: calc(100% - 20px);
}

.rightPanel-background {
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  position: fixed;
  z-index: -1;
}
.rightPanel {
  background: #fff;
  z-index: 3000;
  position: fixed;
  height: 100vh;
  width: 100%;
  max-width: 700px;
  top: 0px;
  left: 0px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  z-index: 40000;
  left: auto;
  right: 0px;
}

.rightPanel >>> .el-button {
  padding: 12px 10px;
}

.btn--wrapper {
  position: absolute;
  left: -40px;
  right: 0;
  top: 30vh;
  width: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 200px;
}
.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.show .rightPanel-background {
  z-index: 20000;
  opacity: 1;
  width: 100%;
  height: 100%;
}
.show .rightPanel {
  transform: translate(0);
}
</style>
