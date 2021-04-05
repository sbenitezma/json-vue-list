<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  .on-hover {
    opacity: 2;
    cursor: pointer;
    border: 3px solid #fdf69b !important;
  }
  &:not(.on-hover) {
    opacity: 1;
  }
}
</style>
<template>
  <v-row dense>
    <v-col :cols="12">
      <v-hover v-slot="{ hover }">
        <v-card
          color="accent"
          :elevation="hover || item.active ? 12 : 2"
          :class="`${
            hover || item.active ? 'on-hover mr-5 mb-3' : 'mr-5 mb-3'
          }`"
          max-width="350"
          max-height="350"
        >
          <Icon
            v-if="item.favourite"
            id="favouriteGrid"
            maxHeight="40px"
            maxWidth="40px"
            customClass="float: right"
            name="voice-favourite"
            @clickAction="setFavourite()"
          ></Icon>
          <Icon
            v-else
            id="favouriteOffGrid"
            maxHeight="40px"
            maxWidth="40px"
            customClass="float: right"
            name="voice-favourite-off"
            @clickAction="setFavourite()"
          ></Icon>
          <div @click="setActive()">
            <div class="d-flex justify-space-between">
              <v-avatar class="ma-0" size="80" tile>
                <v-img
                  max-height="80px"
                  max-width="80px"
                  style="
                    cursor: pointer;
                    border-radius: 2% !important;
                    white-space: normal;
                  "
                  :src="getAppIcon(item)"
                  aspect-ratio="1"
                ></v-img>
              </v-avatar>
            </div>
            <v-card-title
              class="title ma-0 pt-0 pl-4"
              v-text="`${truncateString(item.name, 20)}`"
            >
            </v-card-title>
            <v-card-subtitle v-text="item.tags.join(',')"></v-card-subtitle>
          </div>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Card",
  components: { Icon },
  props: {
    item: {
      type: Object,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
      transparent: "rgba(255, 255, 255, 0)",
    };
  },
  created() {},
  methods: {
    /**
     * Short too long strings
     * @param str
     * @param num
     * @returns {string|*}
     */
    truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    },
    /**
     * Get Apps images
     * @param item
     * @returns {string|*}
     */
    getAppIcon(item) {
      let appIcon = require(`@/assets/images/${item.icon}`);
      if (appIcon) {
        return appIcon;
      } else {
        return `https://source.unsplash.com/collection/3727392/300x300?sig=${item}`;
      }
    },
    /**
     * Set Favourite app
     */
    setFavourite() {
      this.$store.dispatch("setFavourite", this.item);
    },
    /**
     * Set active app
     */
    setActive() {
      this.$store.dispatch("setActive", this.item);
    },
  },
};
</script>
