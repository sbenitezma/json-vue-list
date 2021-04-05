<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card v-if="loading">
          <v-overlay :value="loading">
            <ProgressBar />
          </v-overlay>
        </v-card>
        <v-card v-else>
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
        <v-card v-if="loading">
          <v-overlay :value="loading">
            <ProgressBar />
          </v-overlay>
        </v-card>
        <v-card v-else>
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
import { mapState } from "vuex";
import Grid from "@/components/Grid";
import Table from "@/components/Table";
import ProgressBar from "@/components/ProgressBar";

export default {
  name: "TabsMenu",
  components: {
    Grid,
    ProgressBar,
    Table,
  },
  data: () => ({
    tab: null,
    items: ["Voice Apps", "Favourite Apps"],
  }),
  computed: {
    ...mapState(["originApps", "loading"]),
  },
  methods: {},
};
</script>
