import Vue from "vue";
import Vuetify from "vuetify";
import transitions from "vuetify/es5/components/transitions";
import "vuetify/dist/vuetify.min.css";
import customTheme from "@/plugins/theme";
import "@mdi/font/css/materialdesignicons.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  components: {
    transitions,
  },
  theme: {
    dark: true,
    options: {
      customProperties: true,
      iconfont: "mdi",
      icons: true,
      treeShake: true,
      defaultAssets: {
        font: {
          family: "Source Sans Pro",
        },
      },
    },
    themes: customTheme,
  },
});
