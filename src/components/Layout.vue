<template>
  <v-container fluid>
    <v-col cols="10" md="10" offset-md="1" offset-sm="1" offset-xl="1">
      <v-row v-if="loading">
        <v-col cols="10" md="10" offset-md="2">
          <v-overlay :value="loading" style="margin-left: 100px">
            <v-progress-circular
              indeterminate
              size="64"
              color="#001CC5"
              class="ml-md-12 mr-md-0"
              absolute
            ></v-progress-circular>
          </v-overlay>
        </v-col>
      </v-row>
      <template v-else>
        <TabsMenu />
      </template>
    </v-col>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import TabsMenu from "@/components/TabsMenu.vue";

export default {
  name: "Layout",
  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchApps();
  },
  data: () => ({
    tab: null,
    items: ["Voice Apps", "Favourite Apps"],
  }),
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    /**
     * Get Async Voice Apps
     * @returns {Promise<void>}
     */
    async fetchApps() {
      await this.$store.dispatch("LOAD_APPS");
    },
  },
  components: {
    TabsMenu,
  },
};
</script>
