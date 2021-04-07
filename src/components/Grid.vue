<template>
  <v-col cols="12" md="12">
    <Filters />
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
import Filters from "@/components/Filters";

export default {
  name: "Grid",
  components: {
    Card,
    Filters,
  },
  computed: {
    ...mapState(["showApps"]),
  },
};
</script>
