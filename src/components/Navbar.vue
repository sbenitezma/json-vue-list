<template>
  <v-app-bar app dark>
    <div class="d-flex justify-center">
      <v-img
        alt="Voicemod Logo"
        contain
        :src="require('@/assets/images/logo-header.svg')"
        transition="scale-transition"
        width="200"
      />
    </div>
  </v-app-bar>
</template>
<script>
export default {
  name: "Navbar",
};
</script>
