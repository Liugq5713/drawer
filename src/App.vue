<template>
  <div id="app">
    <Drawer position="top" controlOffset="300px" contentSize="200px">
      <template #controls>
        <div class="button margin-left--10">
          <div>hello</div>
          <span>Here might be a page title</span>
        </div>
        <div class="button margin-left--10">
          <div>hello</div>
          <span>Here might be a page title</span>
        </div>
        <div class="button margin-left--10">
          <div>hello</div>
          <span>Here might be a page title</span>
        </div>
      </template>
    </Drawer>
    <Drawer
      triggerEvent="mouseover"
      position="right"
      controlOffset="30vh"
      contentSize="600px"
    >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem iste non cupiditate harum, minima rerum omnis consequatur sequi sed inventore quae consequuntur fuga asperiores dolore esse, amet facere, similique laborum?</Drawer>
    <Drawer position="bottom" controlOffset="300px" contentSize="200px"/>
    <Drawer position="left" controlOffset="300px" contentSize="200px"/>
  </div>
</template>

<script>
import Drawer from "./components/Drawer";

export default {
  name: "app",
  components: {
    Drawer
  },
  methods: {}
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
.margin-left--10 {
  margin-left: 10px;
}
</style>


