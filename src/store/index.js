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
  actions: {
    /**
     * Set Active action
     * @param commit
     * @param app
     */
    setActive({ commit }, app) {
      commit("setAction", { action: "active", elem: app });
    },
    /**
     * Set favourite app
     * @param commit
     * @param app
     */
    setFavourite({ commit }, app) {
      commit("setAction", { action: "favourite", elem: app });
    },
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
      let originApps = [];
      if (db) {
        originApps = db;
        originApps.forEach((app) => {
          app.favourite = false;
          app.active = false;
        });
        const showApps = JSON.parse(JSON.stringify(originApps));
        commit("setOriginApps", originApps);
        commit("setShowApps", showApps);
        commit("setLoading", false);
      } else {
        commit("setLoading", false);
      }
    },
  },
  mutations: {
    /**
     * Set Active App
     * @param state
     * @param payload
     */
    setAction(state, payload) {
      let showIndex = -1;
      let originIndex = 0;
      if (payload.action === "favourite") {
        showIndex = state.showApps.findIndex(
          (obj) => obj.id === payload.elem.id
        );
        originIndex = state.originApps.findIndex(
          (obj) => obj.id === payload.elem.id
        );
      } else {
        let activeAppIdx = state.showApps.findIndex(
          (obj) => obj.active === true
        );

        if (activeAppIdx < 0) {
          showIndex = state.showApps.findIndex((obj) => obj.id === payload.id);
          originIndex = state.originApps.findIndex(
            (obj) => obj.id === payload.id
          );
        }
      }
      if (showIndex >= 0) {
        state.showApps[showIndex].favourite = !state.showApps[showIndex][
          payload.action
        ];
        state.originApps[originIndex].favourite = !state.originApps[
          originIndex
        ][payload.action];
      }
    },
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
  getters: {
    /**
     * Get favouriteApps
     * @param state
     * @returns {*[]}
     */
    favouriteApps: (state) => {
      return state.originApps.filter((app) => app.favourite);
    },
    getTags(apps) {
      return apps.filter((app) => app.tags);
    },
  },
});
