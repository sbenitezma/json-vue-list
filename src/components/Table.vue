<template>
  <v-col cols="12" md="12">
    <v-row>
      <v-col cols="6" md="6">
        <v-text-field
          id="searchAppNameTable"
          v-model="search"
          outlined
          label="Search"
          single-line
          hide-details
        >
          <Icon
            alt="Search app"
            slot="prepend-inner"
            id="searchIconTable"
            maxHeight="40px"
            maxWidth="40px"
            customClass="pt-0 mt-2 ml-1"
            name="search.svg"
          ></Icon>
          <Icon
            alt="Close search"
            slot="append"
            id="searchCloseTable"
            maxHeight="10px"
            maxWidth="10px"
            customClass="clickable pt-0 mt-1"
            name="search-close.svg"
            @clickAction="clearSearch()"
          ></Icon>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="favouriteApps"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.active="props">
            <template v-if="props.item">
              <v-icon v-if="props.item.active" dark right color="secondary">
                mdi-star
              </v-icon>
              <v-icon
                v-else
                dark
                right
                color="secondary"
                @click="setActive(props.item)"
              >
                mdi-star-outline
              </v-icon>
            </template>
          </template>
          <template v-slot:item.favourite="props">
            <template v-if="props.item">
              <Icon
                alt="Set favourite off"
                custom-class="ma-3 clickable"
                id="favouriteOffTable"
                maxHeight="20px"
                maxWidth="20px"
                v-if="props.item.favourite"
                hover-icon="voice-favourite-off.svg"
                name="voice-favourite.svg"
                @clickAction="setFavourite(props.item)"
              ></Icon>
            </template>
          </template>
          <template v-slot:item.icon="{ item }">
            <v-row no-gutters>
              <v-col cols="12" md="12">
                <Icon
                  :alt="item.name"
                  :id="`voiceAppImage-${item.id}`"
                  :name="item.icon"
                  max-height="50px"
                  max-width="50px"
                  aspect-ratio="1"
                />
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import { mapGetters } from "vuex";
import Icon from "@/components/Icon";

export default {
  name: "Table",
  components: { Icon },
  computed: {
    ...mapGetters(["favouriteApps"]),
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Active", value: "active", sortable: false, width: "10%" },
        {
          text: "Favourite",
          value: "favourite",
          sortable: false,
          width: "10%",
        },
        {
          text: "App Icon",
          align: "left",
          value: "icon",
          width: "20%",
          sortable: false,
          filterable: false,
        },
        {
          text: "Name",
          align: "left",
          value: "name",
          width: "40%",
          sortable: true,
          filterable: true,
        },
        {
          text: "Tags",
          align: "left",
          value: "tags",
          width: "30%",
          sortable: false,
          filterable: true,
        },
      ],
      page: 1,
      pagesNumber: [25, 50, 100],
      selectedNumResults: 25,
    };
  },
  methods: {
    /**
     * Clear search value
     */
    clearSearch() {
      this.search = "";
    },
    /**
     * Get Image of app
     * @param item
     * @returns {string|*}
     */
    getAppIcon(item) {
      let appIcon = require(`@/assets/icons/${item.icon}`);
      if (appIcon) {
        return appIcon;
      } else {
        return `https://source.unsplash.com/collection/3727392/300x300?sig=${item}`;
      }
    },
    /**
     * Remove favourite app from list
     * @param item
     */
    setFavourite(item) {
      this.$store.commit("setFavourite", item);
    },
    /**
     * Set active app
     */
    setActive(item) {
      this.$store.commit("setActive", item);
    },
  },
};
</script>
