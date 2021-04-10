<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.like-action {
  float: right;
}
.clickable {
  cursor: pointer;
}
.custom-icon {
  border-radius: 2% !important;
  white-space: normal;
}
.random-hover {
  filter: invert(80%) sepia(90%) saturate(1887%) hue-rotate(167deg)
    brightness(200%) contrast(111%);
}
</style>

<template>
  <v-hover v-slot:default="{ hover }">
    <v-img
      :alt="alt"
      aspect-ratio="1"
      :class="`${customClass} custom-icon`"
      contain
      :id="id"
      :height="maxHeight"
      :width="maxWidth"
      :src="getIcon(name, hover)"
      transition="scale-transition"
      @click="setAction"
    >
    </v-img>
  </v-hover>
</template>
<script>
export default {
  name: "Icon",
  props: {
    alt: {
      type: String,
      required: true,
    },
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
      let appIcon = require(`@/assets/icons/${name}`);
      if (appIcon) {
        if (hover && this.hoverIcon) {
          appIcon = require(`@/assets/icons/${this.hoverIcon}`);
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
