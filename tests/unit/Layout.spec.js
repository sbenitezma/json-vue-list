import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Layout from "@/components/Layout.vue";
import TabsMenu from "@/components/TabsMenu";

describe.only("Layout.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;

  let store;
  let actions;

  vuetify = new Vuetify();
  localVue.use(Vuex);

  beforeEach(() => {
    actions = {
      LOAD_APPS: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Layout component", () => {
    wrapper = shallowMount(Layout, { store, vuetify, localVue });
    expect(wrapper.findComponent(Layout).exists()).toBeTruthy();
  });

  it("Renders TabsMenu component", () => {
    wrapper = shallowMount(Layout, { store, vuetify, localVue });
    expect(wrapper.findComponent(TabsMenu).exists()).toBeTruthy();
  });

  it("Expect fetchApps mounted action being called", async () => {
    const fetchAction = jest.spyOn(Layout.methods, "fetchApps");
    wrapper = shallowMount(Layout, {
      store,
      vuetify,
      localVue,
    });
    expect(fetchAction).toHaveBeenCalled();
  });
});
