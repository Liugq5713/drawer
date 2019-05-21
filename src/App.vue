<template>
  <div id="app">
    <Drawer
      position="top"
      :openDrawer="openDrawer"
      :controls="controls"
      controlOffset="300px"
      contentSize="200px"
      triggerEvent="mouseover"
    >
      <template v-slot:control="{drawer}">
        <div class="button margin-left--10">
          <div v-if="drawer.drawerShow">{{drawer.control.hidden}}</div>
          <div v-else>{{drawer.control.show}}</div>
        </div>
      </template>
    </Drawer>
    <Drawer
      position="right"
      :controls="controls"
      controlOffset="30vh"
      contentSize="600px"
    >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem iste non cupiditate harum, minima rerum omnis consequatur sequi sed inventore quae consequuntur fuga asperiores dolore esse, amet facere, similique laborum?</Drawer>
    <Drawer position="bottom" triggerEvent="mouseover" controlOffset="300px" contentSize="200px"/>
    <Drawer position="left" controlOffset="300px" contentSize="200px"/>
    <div style="height:1000px;width:100px"></div>
  </div>
</template>

<script>
import Drawer from "./components/Drawer";

export default {
  name: "app",
  components: {
    Drawer
  },
  data() {
    return {
      controls: [
        {
          show: "点击我不打开",
          hidden: "隐藏"
        },
        {
          show: "show",
          hidden: "hidden"
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
      console.log("shouldOpen", shouldOpen);
      return shouldOpen;
    }
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
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

.button:hover {
  background-color: rgb(139, 135, 135);
}
.margin-left--10 {
  margin-left: 10px;
}
</style>


