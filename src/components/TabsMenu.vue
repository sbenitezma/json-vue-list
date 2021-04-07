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
          <v-row no-gutters>
            <v-col cols="12" md="12">
              <v-card-title class="headline"> Active APP </v-card-title>
              <v-card-text>
                <div v-if="!activeApp">
                  <span class="subtitle-2">No active app selected</span>
                </div>
                <div v-else>
                  <Card :item="activeApp" :id="activeApp.id" />
                </div>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="12">
              <v-card-title>
                <span class="headline ml-2">Showing APPS</span>
                <span class="ml-2 mr-2 subtitle-1">
                  ({{ showApps.length }})
                </span>
                -
                <span class="ml-2 headline">All APPS</span>
                <span class="ml-2 subtitle-1"> ({{ originApps.length }}) </span>
              </v-card-title>
              <v-card-text>
                <Grid />
              </v-card-text>
            </v-col>
          </v-row>
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
import { mapGetters, mapState } from "vuex";
import Card from "@/components/Card";
import Grid from "@/components/Grid";
import Table from "@/components/Table";
import ProgressBar from "@/components/ProgressBar";

export default {
  name: "TabsMenu",
  components: {
    Card,
    Grid,
    ProgressBar,
    Table,
  },
  computed: {
    ...mapState(["originApps", "showApps", "loading"]),
    ...mapGetters(["activeApp"]),
  },
  data: () => ({
    tab: null,
    items: ["Voice Apps", "Favourite Apps"],
  }),
  methods: {},
};
</script>
