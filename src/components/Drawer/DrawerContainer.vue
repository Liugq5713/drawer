<template>
  <div>
    <Drawer
      :triggerEvent="triggerEvent"
      :position="position"
      :drawerStyle="drawerStyle[position]"
      :controlStyle="controlStyle[position]"
    >
      <slot></slot>
      <template #controls>
        <slot name="controls"></slot>
      </template>
    </Drawer>
  </div>
</template>

<script>
import Drawer from "./Drawer";
export default {
  props: {
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
      default: "400px"
    },
    contentSize: {
      type: String,
      default: "300px"
    },
    openDrawer: {
      type: Function
    }
  },
  components: {
    Drawer
  },
  data() {
    return {
      drawerStyle: {
        top: {
          height: "100%",
          width: "100vw",
          transform: "translate(0, -100%)",
          maxHeight: this.contentSize,
          top: 0,
          left: 0,
          backgroundColor: "#b9b9b9"
        },
        right: {
          height: "100vh",
          width: "100%",
          transform: "translate(100%,0)",
          maxWidth: this.contentSize,
          top: 0,
          right: 0,
          backgroundColor: "#b9b9b9"
        },
        bottom: {
          height: "100%",
          width: "100vw",
          transform: "translate(0, 100%)",
          maxHeight: this.contentSize,
          bottom: 0,
          left: 0,
          backgroundColor: "#b9b9b9"
        },
        left: {
          height: "100vh",
          width: "100%",
          maxWidth: this.contentSize,
          transform: "translate(-100%,0 )",
          top: 0,
          left: 0,
          backgroundColor: "#b9b9b9"
        }
      },
      controlStyle: {
        top: {
          left: this.controlOffset,
          borderTop: 0
        },
        right: {
          top: this.controlOffset,
          borderRight: 0
          // writingMode: "vertical-rl"
        },
        bottom: {
          left: this.controlOffset,
          borderBottom: 0
        },
        left: {
          top: this.controlOffset,
          borderLeft: 0
          // writingMode: "vertical-rl"
        }
      }
    };
  }
};
</script>