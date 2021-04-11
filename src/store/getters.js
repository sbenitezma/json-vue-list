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
