<template>
  <v-col cols="12" md="12">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="favouriteApps"
      :search="search"
      :single-select="true"
      item-key="name"
      class="elevation-1"
      hide-default-header
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th
              v-for="item in headers"
              :key="item.value"
              :style="{ backgroundColor: item.color }"
              class="column"
              v-bind:class="[
                item.sortable ? 'sortable' : '',
                pagination.sortBy === item.value ? 'active' : '',
                pagination.descending ? 'desc' : 'asc',
              ]"
              @click="item.sortable ? changeSort(item.value) : ''"
            >
              {{ item.text }}
              <v-icon
                style="cursor: pointer"
                v-if="item.sortable && pagination.descending"
                small
                >mdi-arrow-down</v-icon
              >
              <v-icon
                style="cursor: pointer"
                v-else-if="item.sortable && !pagination.descending"
                small
                >mdi-arrow-up</v-icon
              >
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item.icon="{ item }">
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <v-img
              max-width="50"
              width="50"
              :src="getAppIcon(item)"
              aspect-ratio="1"
            ></v-img>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.active="props">
        <template v-if="props.item">
          <v-btn fab dark small @click="alert(props.item)">
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
        </template>
      </template>
      <template v-slot:item.favourite="props">
        <template v-if="props.item">
          <Icon
            maxHeight="20px"
            maxWidth="20px"
            v-if="props.item.favourite"
            name="voice-favourite"
            @clickAction="setFavourite(props.item)"
          ></Icon>
          <Icon
            maxHeight="20px"
            maxWidth="20px"
            v-else
            name="voice-favourite-off"
            @clickAction="setFavourite(props.item)"
          ></Icon>
        </template>
      </template>
    </v-data-table>
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
  watch: {
    pagination: {
      handler() {
        this.getApps();
      },
      deep: true,
    },
  },
  data() {
    return {
      totalDesserts: 0,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        itemsPerPage: 5,
      },
      selected: [],
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
          text: "Icon",
          align: "left",
          value: "icon",
          width: "20%",
          filterable: false,
        },
        {
          text: "Name",
          align: "left",
          value: "name",
          width: "40%",
          sortable: true,
          filterable: false,
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
     * Get Favourite Apps
     */
    getApps() {
      let items = this.favouriteApps;
      const { sortBy, descending, page, itemsPerPage } = this.pagination;
      this.totalDesserts = items.length;
      if (sortBy) {
        items = items.sort((a, b) => {
          const sortA = a[sortBy];
          const sortB = b[sortBy];

          if (descending) {
            if (sortA < sortB) return 1;
            if (sortA > sortB) return -1;
            return 0;
          } else {
            if (sortA < sortB) return -1;
            if (sortA > sortB) return 1;
            return 0;
          }
        });
      }

      if (itemsPerPage > 0) {
        items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      }
    },
    /**
     * Change table sorting
     */
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    /**
     * Get Image of app
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
     * Remove favourite app from list
     * @param item
     */
    setFavourite(item) {
      this.$store.dispatch("setFavourite", item);
    },
  },
};
</script>
