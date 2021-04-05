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
      commit("setActive", app);
    },
    /**
     * Set favourite app
     * @param commit
     * @param app
     */
    setFavourite({ commit }, app) {
      commit("setFavourite", app);
    },
    // selectRandom() {
    //   this.selectActive(showApps);
    //   this.selectActive(originApps);
    // },
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
     * State
     * @param state
     */
    refreshShowApps(state) {
      console.log("hola");
      state.showApps = JSON.parse(JSON.stringify(state.originApps));
    },
    /**
     * Set Active App
     * @param state
     * @param payload
     */
    setActive(state, payload) {
      if (payload.active === false) {
        let originActiveAppIdx = state.originApps.findIndex(
          (obj) => obj.active === true
        );
        if (originActiveAppIdx >= 0) {
          state.originApps[originActiveAppIdx].active = false;
        }
        let currentId = state.originApps.findIndex(
          (obj) => obj.id === payload.id
        );
        if (currentId >= 0) {
          state.originApps[currentId].active = true;
        }
        this.refreshShowApps();
        // this.applyFilters();
      }
    },
    /**
     * Set Favourite App
     * @param state
     * @param payload
     */
    setFavourite(state, payload) {
      let showIndex = state.showApps.findIndex((obj) => obj.id === payload.id);
      let originIndex = state.originApps.findIndex(
        (obj) => obj.id === payload.id
      );
      if (showIndex >= 0) {
        state.showApps[showIndex].favourite = !state.showApps[showIndex]
          .favourite;
        state.originApps[originIndex].favourite = !state.originApps[originIndex]
          .favourite;
      }
      // this.refreshShowApps();
      // this.applyFilters();
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
