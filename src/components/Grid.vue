<style lang="scss">
.v-input__prepend-inner {
  margin-top: 0 !important;
}
</style>
<template>
  <v-col cols="12" md="12">
    <v-row>
      <v-col class="d-flex" cols="3" md="3" sm="4">
        <v-text-field slot="activator" v-model="search" outlined label="Search">
          <CustomIcon
            slot="prepend-inner"
            id="searchIcon"
            maxHeight="40px"
            maxWidth="40px"
            customClass="pt-0 mt-2 ml-1"
            name="search"
            @clickAction="searchAppsByName()"
          ></CustomIcon>
          <CustomIcon
            slot="append"
            id="searchClose"
            maxHeight="10px"
            maxWidth="10px"
            customClass="clickable pt-0 mt-1"
            name="search-close"
            @clickAction="clearSearch()"
          ></CustomIcon>
        </v-text-field>
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
            customClass="pa-0 mt-4"
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
      <v-col class="d-flex" cols="3" md="3" sm="4"> </v-col>
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
    <v-row>
      <v-col
        cols="12"
        lg="2"
        md="2"
        sm="4"
        v-for="(item, id) in showApps"
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
import CustomIcon from "@/components/CustomIcon";

export default {
  name: "Grid",
  components: {
    Card,
    CustomIcon,
  },
  data() {
    return {
      search: "",
      orderBy: ["ASC", "DESC"],
    };
  },
  computed: {
    ...mapState(["originApps", "showApps"]),
  },
  methods: {
    clearSearch() {
      this.search = "";
    },
    sortApps(order) {
      this.$store.dispatch("sortApps", order);
    },
    searchAppsByName() {
      this.$store.dispatch("search");
    },
    selectRandomApp() {
      this.$store.dispatch("setActiveRandomApp");
    },
  },
};
</script>
