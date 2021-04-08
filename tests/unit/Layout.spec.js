import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Layout from "@/components/Layout.vue";
import TabsMenu from "@/components/TabsMenu";

const localVue = createLocalVue();
localVue.use(Vuex);

describe.only("Layout.vue", () => {
  const localVue = createLocalVue();
  let mutations;
  let store;
  let vuetify;
  let wrapper;
  vuetify = new Vuetify();

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
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
