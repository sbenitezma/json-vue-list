<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Layout msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Layout from "@/components/Layout.vue";

export default {
  name: "Home",
  components: {
    Layout,
  },
};
</script>
