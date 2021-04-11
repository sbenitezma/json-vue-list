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
};
