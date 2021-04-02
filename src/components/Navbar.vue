<template>
  <v-app-bar app dark>
    <div class="d-flex align-center">
      <v-img
        alt="Voicemod Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/logo-header.svg')"
        transition="scale-transition"
        width="200"
      />
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
export default {};
</script>
