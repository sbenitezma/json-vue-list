<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card>
          <v-card-title class="headline">
            All APPS
            <span class="ml-2">({{ originApps.length }})</span></v-card-title
          >
          <v-card-text>
            <Grid />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-title class="headline"> Favourite APPS </v-card-title>
          <v-card-text>
            <Table />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Grid from "@/components/Grid";
import Table from "@/components/Table";

export default {
  name: "TabsMenu",
  data: () => ({
    tab: null,
    items: ["Voice Apps", "Favourite Apps"],
  }),
  computed: {
    ...mapState(["originApps"]),
    ...mapGetters(["favoriteApps"]),
  },
  methods: {},
  components: {
    Grid,
    Table,
  },
};
</script>
