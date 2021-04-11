import Vue from "vue";
import Vuex from "vuex";
import { actions } from "@/store/actions";

describe("Store actions", () => {
  Vue.use(Vuex);
  let store;
  let setDataMock;

  beforeEach(() => {
    setDataMock = jest.fn();
    store = new Vuex.Store({
      state: { data: {} },
      mutations: {
        LOAD_APPS: setDataMock,
      },
      actions: {
        LOAD_APPS: actions.LOAD_APPS,
      },
    });
  });
  it("Tests using a mock mutation but real store", () => {
    store.hotUpdate({
      mutations: {
        setOriginApps: setDataMock,
        setShowApps: setDataMock,
        setTags: setDataMock,
        setLoading: setDataMock,
      },
    });
    return store.dispatch("LOAD_APPS").then(() => {
      expect(setDataMock.mock.calls[0][1]).toBeTruthy();
      expect(setDataMock.mock.calls[0][1]).toHaveLength(89);
    });
  });
});
