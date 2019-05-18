<template>
  <div id="app">
    <Drawer position="top" controlOffset="300px" contentSize="200px"/>
    <Drawer position="right" controlOffset="30vh" contentSize="600px"/>
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

