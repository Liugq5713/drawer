<template>
  <div id="app">
    <Drawer position="top" controlOffset="300px" contentSize="200px">
      <template #controls>
        <span>Here might be a page title</span>
      </template>
    </Drawer>
    <Drawer
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
  }
};
</script>

