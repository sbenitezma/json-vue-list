import Vue from "vue";
import Vuex from "vuex";
import { getters } from "@/store/getters";
import { actions } from "@/store/actions";
import { mutations } from "@/store/mutations";

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

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
