<template>
  <Drawer
    position="right"
    :openDrawer="openDrawer"
    :controls="controls"
    controlOffset="200px"
    contentSize="400px"
    triggerEvent="mouseover"
    class="demo"
  >
    <template v-slot:control="{drawer}">
      <div class="button margin-left--10">
        <div v-if="drawer.drawerShow" class="vertical">{{drawer.control.hidden}}</div>
        <div v-else class="vertical">{{drawer.control.show}}</div>
      </div>
    </template>
    <div style="text-align:center">
      <h2>都看到这里不妨关注一波咯</h2>
      <p>一个一年小前端，关注我的微信公众号，和我一起交流，我会尽我所能，并且看看我能成长成什么样子吧。</p>
      <img src="https://wpimg.wallstcn.com/4f6c3923-d77b-4788-88c7-a47ef26dba48.jpg" alt>
    </div>
  </Drawer>
</template>

<script>
import Drawer from "../../../src/components/Drawer";
export default {
  components: {
    Drawer
  },
  data() {
    return {
      controls: [
        {
          show: "不开",
          hidden: "不开"
        },
        {
          show: "来这",
          hidden: "关闭"
        }
      ]
    };
  },
  methods: {
    openDrawer(target) {
      let shouldOpen = true;
      while (!target.matches(".controls")) {
        if (target.matches(".control-0")) {
          shouldOpen = false;
          break;
        } else {
          target = target.parentNode;
        }
      }
      return shouldOpen;
    }
  }
};
</script>

<style scoped>
.vertical {
  writing-mode: vertical-rl;
  height: 40px;
  line-height: 20px;
  font-size: 16px;
  letter-spacing: 5px;
}
.demo >>> .control {
  padding: 20px 12px;
}
</style>
