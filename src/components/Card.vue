<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.v-card {
  transition: opacity 0.4s ease-in-out;
  .on-hover {
    opacity: 2;
    cursor: pointer;
    border: 3px solid $secondary !important;
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
            alt="Set favourite app"
            :id="`favouriteGrid-${item.id}`"
            maxHeight="30px"
            maxWidth="30px"
            customClass="like-action clickable ma-3"
            name="voice-favourite.svg"
            @clickAction="setFavourite()"
          ></Icon>
          <Icon
            v-else
            alt="Set favourite off"
            :id="`favouriteOffGrid-${item.id}`"
            maxHeight="30px"
            maxWidth="30px"
            customClass="like-action clickable ma-3"
            name="voice-favourite-off.svg"
            hover-icon="voice-favourite.svg"
            @clickAction="setFavourite()"
          ></Icon>
          <div @click="setActive()">
            <div class="d-flex justify-space-between">
              <v-avatar class="ma-0" size="80" tile>
                <Icon
                  :alt="item.name"
                  :id="`voiceAppImage-${item.id}`"
                  :name="item.icon"
                  max-height="80px"
                  max-width="80px"
                  aspect-ratio="1"
                />
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
     * Set Favourite app
     */
    setFavourite() {
      this.$store.commit("setFavourite", this.item);
    },
    /**
     * Set active app
     */
    setActive() {
      this.$store.commit("setActive", this.item);
    },
  },
};
</script>
