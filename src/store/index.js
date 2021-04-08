import Vue from "vue";
import Vuex from "vuex";
import db from "@/api/db/voices.json";

Vue.use(Vuex);

export const state = {
  originApps: [],
  showApps: [],
  currentTags: [],
  appNameFilter: "",
  tagFilter: "",
  orderFilter: "",
  loading: true,
};

export const getters = {
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
    return state.showApps.filter(
      (obj) => obj.name.toLowerCase().indexOf(params.name.toLowerCase()) !== -1
    );
  },
  /**
   * Search app by tag
   * @param state
   * @returns {function(*=, *): void}
   */
  searchByTag: (state) => (filterObj) => {
    return state.showApps.filter((obj) => {
      return (
        obj.tags.findIndex((t) => {
          return t.includes(filterObj.tag);
        }) >= 0
      );
    });
  },
  /**
   * Sort App by name Desc or Asc
   * @param state
   * @returns {function(*): void}
   */
  sortAppsByName: (state) => (order) => {
    return state.showApps.sort((elem1, elem2) => {
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
};

export const mutations = {
  /**
   * Setup filters on search
   * @param state
   * @param payload
   */
  setFilters(state, payload) {
    if (payload) {
      if (payload.order) {
        state.orderFilter = payload.order;
      }
      if (payload.tag) {
        state.tagFilter = payload.tag;
      }
      if (payload.name) {
        state.appNameFilter = payload.name;
      }
    }
    this.commit("refreshShowApps");
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
    this.commit("setFilters");
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
    if (payload.order) {
      state.orderFilter = payload.order;
      state.showApps = this.getters.sortAppsByName(payload.order);
    }
  },
  /**
   * Select Random App and apply active status
   * @param state
   */
  setActiveRandomApp(state) {
    let randomIdx = Math.floor(Math.random() * state.showApps.length);
    this.commit("setActive", state.showApps[randomIdx]);
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
      this.commit("setFilters");
    }
  },
  /**
   * Set Favourite App
   * @param state
   * @param payload
   */
  setFavourite(state, payload) {
    let originIndex = state.originApps.findIndex(
      (obj) => obj.id === payload.id
    );
    if (originIndex >= 0) {
      state.originApps[originIndex].favourite = !state.originApps[originIndex]
        .favourite;
    }
    this.commit("setFilters");
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
};

export const actions = {
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
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
