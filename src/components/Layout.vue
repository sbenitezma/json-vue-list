<template>
  <v-container fluid>
    <v-col cols="10" md="10" offset-md="1" offset-sm="1" offset-xl="1">
      <TabsMenu />
    </v-col>
  </v-container>
</template>

<script>
import TabsMenu from "@/components/TabsMenu.vue";

export default {
  name: "Layout",
  mounted() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchApps();
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
