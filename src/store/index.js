import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import db from "@/api/db/voices.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardList: true,
    apps: [],
    loading: true,
    locales: ["en", "es"],
    locale: "en",
  },
  mutations: {
    /**
     * Set apps.json apps
     * @param state
     * @param apps
     */
    setApps(state, apps) {
      state.apps = apps;
    },
    /**
     * Set page loading
     * @param state
     * @param loading
     */
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    /**
     * Load all Apps API info
     * @param commit
     * @returns {Promise<void>}
     * @constructor
     */
    async LOAD_APPS({ commit }) {
      await axios
        .get(db)
        .then((response) => {
          commit("setApps", response.data);
          commit("setLoading", false);
        })
        .catch(() => {
          // commit("setApps", apps);
          commit("setLoading", false);
        });
    },
  },
  getters: {},
});
