import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Layout from "@/components/Layout.vue";
import TabsMenu from "@/components/TabsMenu";

// add the 2 lines below
const localVue = createLocalVue();
localVue.use(Vuex);

describe.only("Layout.vue", () => {
  // add the 2 lines below
  const localVue = createLocalVue();
  // let actions;
  let mutations;
  let store;
  let vuetify;
  let wrapper;
  vuetify = new Vuetify();
  // add this before each
  beforeEach(() => {
    // actions = {
    //   LOAD_APPS: jest.fn(),
    // };
    store = new Vuex.Store({
      state: {},
      // actions,
      mutations,
    });
    wrapper = shallowMount(Layout, { store, vuetify, localVue });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Layout component", () => {
    expect(wrapper.findComponent(Layout).exists()).toBeTruthy();
  });

  it("Renders TabsMenu component", () => {
    expect(wrapper.findComponent(TabsMenu).exists()).toBeTruthy();
  });
});
