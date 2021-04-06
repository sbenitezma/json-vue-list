import Vue from "vue";
import Vuex from "vuex";
import db from "@/api/db/voices.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    originApps: [],
    showApps: [],
    currentTags: [],
    appNameFilter: "",
    tagFilter: "",
    orderFilter: "",
    loading: true,
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
     * @param state
     * @returns {*}
     */
    getAppsTags: (state) => {
      let allTags = ["All Tags"];
      state.originApps.forEach((obj) => {
        obj.tags.forEach((tag) => {
          allTags.push(tag);
        });
      });
      allTags = [...new Set(allTags)];
      return allTags;
    },
    /**
     * Search by title
     * @param state
     * @returns {function(*=, *): void}
     */
    searchByName: (state) => (params) => {
      var x = state.showApps.filter(
        (obj) =>
          obj.name.toLowerCase().indexOf(params.name.toLowerCase()) !== -1
      );
      console.log(x);
      return state.showApps.filter(
        (obj) =>
          obj.name.toLowerCase().indexOf(params.name.toLowerCase()) !== -1
      );
    },
    /**
     * Search app by tag
     * @param state
     * @returns {function(*=, *): void}
     */
    searchByTag: (state) => (tag) => {
      return state.showApps.filter((obj) => obj.tag[0].includes(tag));
    },
    /**
     * Sort App by name Desc or Asc
     * @param state
     * @returns {function(*): void}
     */
    sortAppsByName: (state) => (order) => {
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
  },
  mutations: {
    applyFilters(state, payload) {
      if (payload.order) {
        state.orderFilter = payload.orderFilter;
      }
      if (payload.tagFilter) {
        state.tagFilter = payload.tagFilter;
      }
      if (payload.appNameFilter) {
        state.appNameFilter = payload.appNameFilter;
      }
      this.commit("searchApps", {
        order: state.orderFilter,
        name: state.appNameFilter,
        tag: state.tagFilter,
      });
    },
    /**
     * Clear App name text filter
     * @param state
     */
    clearAppName(state) {
      state.appNameFilter = "";
    },
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
     * Search apps using filters
     * @param state
     * @param payload
     * @returns {function(*=, *): void}
     */
    searchApps(state, payload) {
      this.commit("refreshShowApps");
      if (payload.name !== "") {
        state.appNameFilter = payload.name;
        state.showApps = this.getters.searchByName({
          name: payload.name,
        });
      }
      if (
        payload.tag !== "" &&
        payload.tag !== undefined &&
        payload.tag !== "All Tags"
      ) {
        state.tagFilter = payload.tag;
        state.showApps = this.getters.searchByTag({ tag: payload.tag });
      }
    },
    /**
     * Select Random App and apply active status
     * @param state
     */
    setActiveRandomApp(state) {
      let randomIdx = Math.floor(Math.random() * state.showApps.length);
      this.commit("setActive", state.showApps[randomIdx]);
      this.commit("searchApps", {
        name: state.appNameFilter,
        tag: state.tagFilter,
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
    /**
     * Set Tags array
     * @param state
     * @param apps
     */
    setTags(state, apps) {
      let allTags = [];
      apps.forEach((obj) => {
        obj.tags.forEach((tag) => {
          allTags.push(tag);
        });
      });
      allTags = [...new Set(allTags)];
      state.currentTags = allTags;
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
        commit("setTags", originApps);
        commit("setLoading", false);
      } else {
        commit("setLoading", false);
      }
    },
  },
});
