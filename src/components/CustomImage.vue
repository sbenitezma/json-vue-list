<style lang="scss" scoped>
.app-img {
  border-radius: 2% !important;
  white-space: normal;
}
</style>
<template>
  <v-img
    :alt="alt"
    aspect-ratio="1"
    class="app-img"
    :contain="contain"
    :id="id"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :src="getAppIcon(name)"
    transition="scale-transition"
  >
  </v-img>
</template>
<script>
export default {
  name: "CustomImage",
  props: {
    alt: {
      type: String,
      required: true,
    },
    contain: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
      default: "",
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
    /**
     * Get Apps images
     * @param name
     * @returns {string|*}
     */
    getAppIcon(name) {
      let appIcon = require(`@/assets/images/${name}`);
      if (appIcon) {
        return appIcon;
      } else {
        return `https://source.unsplash.com/collection/3727392/300x300?sig=${Math.floor(
          Math.random() * 11
        )}`;
      }
    },
  },
};
</script>
