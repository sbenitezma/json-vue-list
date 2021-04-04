<template>
  <v-app>
    <Navbar />
    <v-main>
      <Layout />
    </v-main>
  </v-app>
</template>

<script>
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
    Layout,
  },

  data: () => ({
    //
  }),
};
</script>
