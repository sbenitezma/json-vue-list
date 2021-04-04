<template>
  <v-col cols="12" md="12">
    <v-row no-gutters>
      <v-col
        cols="12"
        lg="2"
        md="2"
        sm="4"
        v-for="(item, id) in originApps"
        :key="id"
      >
        <Card :item="item" :id="id" />
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import { mapState } from "vuex";
import Card from "@/components/Card";

export default {
  name: "Grid",
  components: {
    Card,
  },
  computed: {
    ...mapState(["originApps"]),
  },
  data() {
    return {};
  },
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
    setFavourite(item) {
      this.$store.commit("setFavourite", item);
    },
  },
};
</script>
