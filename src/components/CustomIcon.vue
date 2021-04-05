<style lang="scss" scoped>
.like-action {
  float: right;
}
.custom-icon {
  cursor: pointer;
  border-radius: 2% !important;
  white-space: normal;
}
</style>

<template>
  <v-hover v-slot:default="{ hover }">
    <v-img
      aspect-ratio="1"
      :class="`${customClass} custom-icon ma-3`"
      contain
      :id="id"
      :height="maxHeight"
      :width="maxWidth"
      :src="getIcon(name, hover)"
      @click="setAction"
    >
    </v-img>
  </v-hover>
</template>
<script>
export default {
  name: "Icon",
  props: {
    color: {
      type: String,
      default: "primary",
      required: false,
    },
    customClass: {
      type: String,
      required: false,
    },
    hoverIcon: {
      type: String,
      required: false,
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
     * Get Custom icon by name
     * @param name
     * @param hover
     * @returns {string|*}
     */
    getIcon(name, hover) {
      let appIcon = require(`@/assets/icons/${name}.svg`);
      if (appIcon) {
        if (hover && this.hoverIcon) {
          appIcon = require(`@/assets/icons/${this.hoverIcon}.svg`);
        }
        return appIcon;
      } else {
        return `https://source.unsplash.com/collection/3727392/300x300?sig=${100}`;
      }
    },
    /**
     * Emit custom action to parent component (active/favourite)
     */
    setAction() {
      this.$emit("clickAction");
    },
  },
};
</script>
