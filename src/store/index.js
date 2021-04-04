import Vue from "vue";
import Vuex from "vuex";
import db from "@/api/db/voices.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    originApps: [],
    showApps: [],
    currentTags: [],
    titleFilter: "",
    tagFilter: [],
    loading: true,
  },
  mutations: {
    /**
     * Set page loading
     * @param state
     * @param loading
     */
    setLoading(state, loading) {
      state.loading = loading;
    },
    /**
     * Set apps.json apps
     * @param state
     * @param apps
     */
    setOriginApps(state, apps) {
      state.originApps = apps;
    },
    /**
     * Set current display apps
     * @param state
     * @param apps
     */
    setShowApps(state, apps) {
      state.showApps = apps;
    },
  },
  actions: {
    // selectActive(apps) {},
    // selectRandom() {
    //   this.selectActive(showApps);
    //   this.selectActive(originApps);
    // },
    resetShowApps() {},
    /**
     * Load all Apps API info
     * @param commit
     * @returns {Promise<void>}
     * @constructor
     */
    async LOAD_APPS({ commit }) {
      let apps = [];
      if (db) {
        apps = db;
        apps.forEach((app) => {
          app.favorite = false;
          app.active = false;
        });
        commit("setOriginApps", apps);
        commit("setShowApps", apps);
        commit("setLoading", false);
      } else {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    favoriteApps: (state) => {
      return state.originApps.filter((app) => app.favorite);
    },
    getTags(apps) {
      return apps.filter((app) => app.tags);
    },
  },
});
