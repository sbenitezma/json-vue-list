import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Grid from "@/components/Grid.vue";
import Card from "@/components/Card.vue";
import Filters from "@/components/Filters.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe.only("Grid.vue", () => {
  let state;
  let store;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    vuetify = new Vuetify();
    localVue.use(vuetify);

    state = {
      showApps: [
        {
          id: "2x1",
          name: "2x1",
          icon: "VoicesVoiceIcon01.png",
          tags: ["misc"],
        },
        {
          id: "8bits",
          name: "8bits",
          icon: "VoicesVoiceIcon02.png",
          tags: ["devices"],
        },
      ],
      loading: false,
    };
    store = new Vuex.Store({
      state,
    });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Grid component", () => {
    wrapper = shallowMount(Grid, { store, localVue, vuetify });
    expect(wrapper.vm.showApps).toBeDefined();
    expect(wrapper.findComponent(Grid).exists()).toBeTruthy();
  });

  it("Renders Card component", () => {
    wrapper = shallowMount(Grid, { store, localVue, vuetify });
    expect(wrapper.findComponent(Card).exists()).toBeTruthy();
  });

  it("Renders Filters component", () => {
    wrapper = shallowMount(Grid, { store, localVue, vuetify });
    expect(wrapper.findComponent(Filters).exists()).toBeTruthy();
  });
});
