<template>
  <v-img
    class="ma-3"
    contain
    :max-height="maxHeight"
    :max-width="maxWidth"
    :style="`${customClass};
    cursor: pointer;
    border-radius: 2% !important;
    white-space: normal;
    `"
    :src="getIcon(name)"
    aspect-ratio="1"
    @click="setAction"
  ></v-img>
</template>

<script>
export default {
  name: "Icon",
  props: {
    color: {
      type: String,
      default: "primary", // green, green--outline, white
      required: false,
    },
    customClass: {
      type: String,
      required: false,
    },
    maxHeight: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    getIcon(name) {
      let appIcon = require(`@/assets/icons/${name}.svg`);
      if (appIcon) {
        return appIcon;
      } else {
        return `https://source.unsplash.com/collection/3727392/300x300?sig=${name}`;
      }
    },
    setAction() {
      this.$emit("clickAction");
    },
  },
};
</script>
