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
     * Set active a random APP
     * @param commit
     */
    setActiveRandomApp({ commit }) {
      commit("selectActiveRandomApp");
    },
    /**
     * Set active action
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
    /**
     * Sort apps ascendant or descendent
     * @param commit
     * @param order
     */
    sortApps({ commit }, order) {
      commit("sortAppsByName", order);
    },
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
      this.commit("setLoading", true);
      state.showApps = JSON.parse(JSON.stringify(state.originApps));
      this.commit("setLoading", false);
    },
    /**
     * Select Random App and apply active status
     * @param state
     */
    selectActiveRandomApp(state) {
      let randomIdx = Math.floor(Math.random() * state.showApps.length);
      this.commit("setActive", state.showApps[randomIdx]);
    },
    /**
     * Search apps using filters
     * @param state
     * @param name
     * @param tag
     */
    searchApps(state, name, tag) {
      let results = state.showApps;
      if (name !== "") {
        results = this.commit("searchByTitle", name, results);
      }
      if (tag !== "") {
        results = this.commit("searchByTag", tag, results);
      }
      state.showApps = JSON.parse(JSON.stringify(results));
    },
    /**
     * Search by title
     * @param state
     * @param title
     * @param results
     * @returns {*}
     */
    searchByTitle(state, title, results) {
      return results.filter((obj) => obj.name.includes(title));
    },
    /**
     * Search app by tag
     * @param state
     * @param tag
     * @param results
     * @returns {*}
     */
    searchByTag(state, tag, results) {
      return results.filter((obj) => obj.tag[0].includes(tag));
    },
    /**
     * Set Apps sorting by name
     * @param state
     * @param order
     */
    sortAppsByName(state, order) {
      state.showApps.sort((elem1, elem2) => {
        let temp1 = elem1.name;
        let temp2 = elem2.name;

        if (typeof temp1 === "string") {
          temp1 = `${temp1}`.toLowerCase();
        }
        if (typeof temp2 === "string") {
          temp2 = `${temp2}`.toLowerCase();
        }
        if (order === "ASC") {
          return temp1 < temp2 ? -1 : temp1 > temp2 ? 1 : 0;
        } else if (order === "DESC") {
          return temp1 < temp2 ? 1 : temp1 > temp2 ? -1 : 0;
        }
      });
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
        this.commit("refreshShowApps");
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
     * Return active app
     * @param state
     * @returns {*[]}
     */
    activeApp: (state) => {
      return state.originApps.find((app) => app.active);
    },
    /**
     * Get favouriteApps
     * @param state
     * @returns {*[]}
     */
    favouriteApps: (state) => {
      return state.originApps.filter((app) => app.favourite);
    },
    /**
     * Get Apps Tags
     * @param apps
     * @returns {*}
     */
    getTags(apps) {
      return apps.filter((app) => app.tags);
    },
  },
});
