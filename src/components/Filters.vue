<template>
  <v-row id="filtersSectionGrid">
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-text-field
        id="searchAppByNameGrid"
        slot="activator"
        v-model="appName"
        outlined
        label="Search by voice name"
        @change="searchByNameApps"
        @input="searchByNameApps"
      >
        <Icon
          alt="Search apps by name"
          slot="prepend-inner"
          id="searchIconGrid"
          maxHeight="40px"
          maxWidth="40px"
          customClass="pt-0 mt-2 ml-1"
          name="search.svg"
        ></Icon>
        <Icon
          alt="Close search apps by name"
          slot="append"
          id="searchCloseGrid"
          maxHeight="10px"
          maxWidth="10px"
          customClass="clickable pt-0 mt-1"
          name="search-close.svg"
          @clickAction="clearSearch"
        ></Icon>
      </v-text-field>
    </v-col>
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-select
        id="searchByTagGrid"
        class="ml-0 pl-0"
        :items="getAppsTags"
        label="Tag"
        outlined
        @change="searchByTagApps"
      >
        <Icon
          alt="Filter apps by name"
          slot="prepend-inner"
          id="filterIconGrid"
          maxHeight="30px"
          maxWidth="30px"
          customClass="pa-0 mt-4 mr-1"
          name="filter.svg"
        ></Icon>
        <Icon
          alt="Filter apps"
          slot="append"
          id="selectArrowTagsGrid"
          maxHeight="15px"
          maxWidth="15px"
          customClass="pa-0 mt-1"
          name="select-arrow.svg"
        ></Icon>
      </v-select>
    </v-col>
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-select
        alt="Sort apps"
        id="sortAppsGrid"
        class="ml-0 pl-0"
        :items="orderBy"
        label="Sort"
        outlined
        @change="sortApps"
      >
        <Icon
          alt="Order apps"
          slot="prepend-inner"
          id="orderIconGrid"
          maxHeight="30px"
          maxWidth="30px"
          customClass="pa-0 mt-4 mr-1"
          name="order.svg"
        ></Icon>
        <Icon
          alt="Sort apps"
          slot="append"
          id="selectArrowSortGrid"
          maxHeight="15px"
          maxWidth="15px"
          customClass="pa-0 mt-1"
          name="select-arrow.svg"
        ></Icon>
      </v-select>
    </v-col>
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-hover v-slot="{ hover }">
        <Icon
          alt="Select random app"
          id="selectRandomApp"
          maxHeight="30px"
          maxWidth="30px"
          :customClass="`${hover ? 'random-hover' : ''} pa-0 mt-4 clickable`"
          name="button-random.svg"
          @clickAction="selectRandomApp()"
        ></Icon>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Icon from "@/components/Icon";

export default {
  name: "Filters",
  components: {
    Icon,
  },
  data() {
    return {
      appName: "",
      orderBy: ["ASC", "DESC"],
    };
  },
  computed: {
    ...mapState(["tagFilter", "orderFilter"]),
    ...mapGetters({
      getAppsTags: "getAppsTags",
    }),
  },
  methods: {
    clearSearch() {
      this.appName = "";
      this.$store.dispatch("clearAppName");
    },
    searchByNameApps(name) {
      if (name.length === 0) {
        this.clearSearch();
      } else {
        this.appName = name;
        this.$store.dispatch("setFilters", {
          name: this.appName,
        });
      }
    },
    searchByTagApps(tag) {
      if (tag !== "") {
        this.$store.dispatch("setFilters", {
          tag: tag,
        });
      } else {
        this.$store.dispatch("refreshShowApps");
      }
    },
    selectRandomApp() {
      this.$store.dispatch("setFilters", {
        order: this.orderFilter,
      });
      this.$store.dispatch("setActiveRandomApp");
    },
    sortApps(order) {
      this.$store.dispatch("setFilters", {
        order: order,
      });
      this.$store.getters.sortAppsByName(order);
    },
  },
};
</script>
