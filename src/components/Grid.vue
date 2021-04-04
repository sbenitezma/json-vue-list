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
        <Card :item="item" :id="id"></Card>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import { mapState } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "Grid",
  computed: {
    ...mapState(["originApps"]),
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    Card,
  },
};
</script>
