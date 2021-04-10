<template>
  <v-app-bar app dark>
    <div class="d-flex justify-center">
      <Icon
        alt="Voicemod Logo"
        aspect-ratio="1"
        id="voicemodLogo"
        max-height="200px"
        max-width="200px"
        name="logo-header.svg"
        contain
      />
    </div>
  </v-app-bar>
</template>
<script>
import Icon from "@/components/Icon";

export default {
  name: "Navbar",
  components: { Icon },
};
</script>
