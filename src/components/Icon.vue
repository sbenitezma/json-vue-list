<style>
#favouriteGrid {
}
#favouriteOffGrid {
}
</style>
<template>
  <!-- eslint-disable-next-line vue/no-unused-vars -->
  <v-hover v-slot:default="{ hover }">
    <v-img
      aspect-ratio="1"
      class="ma-3"
      contain
      :id="id"
      :max-height="maxHeight"
      :max-width="maxWidth"
      :style="`${customClass}; cursor: pointer; border-radius: 2% !important; white-space: normal;`"
      :src="getIcon(name)"
      @click="setAction"
    >
      <!--      <v-expand-transition>-->
      <!--        <div-->
      <!--          v-if="hover"-->
      <!--          class="d-flex primary v-fav&#45;&#45;reveal"-->
      <!--          style="height: 100%"-->
      <!--        >-->
      <!--          $14.99-->
      <!--        </div>-->
      <!--      </v-expand-transition>-->
    </v-img>
  </v-hover>
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
     * @returns {string|*}
     */
    getIcon(name) {
      let appIcon = require(`@/assets/icons/${name}.svg`);
      if (appIcon) {
        return appIcon;
      } else {
        return `https://source.unsplash.com/collection/3727392/300x300?sig=${name}`;
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
