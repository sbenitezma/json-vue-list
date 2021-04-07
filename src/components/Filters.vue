<template>
  <v-row>
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-text-field
        slot="activator"
        v-model="appName"
        outlined
        label="Search by voice name"
        @change="searchByNameApps"
        @input="searchByNameApps"
      >
        <CustomIcon
          slot="prepend-inner"
          id="searchIcon"
          maxHeight="40px"
          maxWidth="40px"
          customClass="pt-0 mt-2 ml-1"
          name="search"
        ></CustomIcon>
        <CustomIcon
          slot="append"
          id="searchClose"
          maxHeight="10px"
          maxWidth="10px"
          customClass="clickable pt-0 mt-1"
          name="search-close"
          @clickAction="clearSearch"
        ></CustomIcon>
      </v-text-field>
    </v-col>
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-select
        id="selectTag"
        class="ml-0 pl-0"
        :items="getAppsTags"
        label="Tag"
        outlined
        @change="searchByTagApps"
      >
        <CustomIcon
          slot="prepend-inner"
          id="filterIcon"
          maxHeight="30px"
          maxWidth="30px"
          customClass="pa-0 mt-4 mr-1"
          name="filter"
        ></CustomIcon>
        <CustomIcon
          slot="append"
          id="selectArrow"
          maxHeight="15px"
          maxWidth="15px"
          customClass="pa-0 mt-1"
          name="select-arrow"
        ></CustomIcon>
      </v-select>
    </v-col>
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-select
        id="sortApps"
        class="ml-0 pl-0"
        :items="orderBy"
        label="Sort"
        outlined
        @change="sortApps"
      >
        <CustomIcon
          slot="prepend-inner"
          id="orderIcon"
          maxHeight="30px"
          maxWidth="30px"
          customClass="pa-0 mt-4 mr-1"
          name="order"
        ></CustomIcon>
        <CustomIcon
          slot="append"
          id="selectArrow"
          maxHeight="15px"
          maxWidth="15px"
          customClass="pa-0 mt-1"
          name="select-arrow"
        ></CustomIcon>
      </v-select>
    </v-col>
    <v-col class="d-flex" cols="3" md="3" sm="4">
      <v-hover v-slot="{ hover }">
        <CustomIcon
          id="selectRandomApp"
          maxHeight="30px"
          maxWidth="30px"
          :customClass="`${hover ? 'random-hover' : ''} pa-0 mt-4 clickable`"
          name="button-random"
          @clickAction="selectRandomApp()"
        ></CustomIcon>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CustomIcon from "@/components/CustomIcon";

export default {
  name: "Grid",
  components: {
    CustomIcon,
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
      this.$store.commit("clearAppName");
    },
    searchByNameApps(name) {
      if (name.length === 0) {
        this.clearSearch();
      } else {
        this.appName = name;
        this.$store.commit("setFilters", {
          name: this.appName,
        });
      }
    },
    searchByTagApps(tag) {
      if (tag !== "") {
        this.$store.commit("setFilters", {
          tag: tag,
        });
      } else {
        this.$store.commit("refreshShowApps");
      }
    },
    selectRandomApp() {
      this.$store.commit("setFilters", {
        order: this.orderFilter,
      });
      this.$store.commit("setActiveRandomApp");
    },
    sortApps(order) {
      this.$store.commit("setFilters", {
        order: order,
      });
      this.$store.getters.sortAppsByName(order);
    },
  },
};
</script>
