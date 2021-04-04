<template>
  <v-row dense>
    <v-col :cols="12">
      <v-card
        color="accent"
        elevation="8"
        class="mr-5 mb-3"
        max-width="350"
        max-height="350"
      >
        <v-btn
          class="ma-3"
          fab
          icon
          height="20px"
          style="float: right"
          width="20px"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
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
        ></v-card-title>
        <v-card-subtitle v-text="item.tags.join(',')"></v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Card",
  props: ["item", "id"],
  created() {},
  data() {
    return {};
  },
  methods: {
    truncateString(str, num) {
      if (str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    },
    getAppIcon(item) {
      let appIcon = require(`@/assets/images/${item.icon}`);
      if (appIcon) {
        return appIcon;
      } else {
        return `https://source.unsplash.com/collection/3727392/300x300?sig=${item}`;
      }
    },
  },
};
</script>
