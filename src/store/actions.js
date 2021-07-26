import db from "@/api/db/voices.json";
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
  /**
   * Clear App Name
   * @param commit
   * @returns {Promise<void>}
   */
  async clearAppName({ commit }) {
    commit("clearAppName");
  },
  /**
   * Refresh App Name
   * @param commit
   * @returns {Promise<void>}
   */
  async refreshShowApps({ commit }) {
    commit("refreshShowApps");
  },
  /**
   * Set Active app
   * @param commit
   * @param item
   * @returns {Promise<void>}
   */
  async setActive({ commit }, item) {
    commit("setActive", item);
  },
  /**
   * Set Active Random app
   * @param commit
   * @returns {Promise<void>}
   */
  async setActiveRandomApp({ commit }) {
    commit("setActiveRandomApp");
  },
  /**
   * Set Favourite app
   * @param commit
   * @param item
   * @returns {Promise<void>}
   */
  async setFavourite({ commit }, item) {
    commit("setFavourite", item);
  },
  /**
   * Set Filters
   * @param commit
   * @param filter
   * @returns {Promise<void>}
   */
  async setFilters({ commit }, filter) {
    commit("setFilters", filter);
  },
};
