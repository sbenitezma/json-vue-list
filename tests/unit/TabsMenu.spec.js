import Vuex from "vuex";
import Vuetify from "vuetify";
import { createLocalVue, shallowMount } from "@vue/test-utils";

import TabsMenu from "@/components/TabsMenu.vue";
import Card from "@/components/Card.vue";
import ProgressBar from "@/components/ProgressBar";

describe("TabsMenu.vue", () => {
  const localVue = createLocalVue();
  let getters;
  let state;
  let store;
  let vuetify;
  let wrapper;

  vuetify = new Vuetify();
  localVue.use(vuetify);
  localVue.use(Vuex);

  beforeEach(() => {
    state = {
      originApps: [
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
        {
          id: "adult-to-children",
          name: "Adult to children",
          icon: "VoicesVoiceIcon03.png",
          tags: ["human"],
        },
        {
          id: "alien",
          name: "Alien",
          icon: "VoicesVoiceIcon01.png",
          tags: ["robotic"],
        },
        {
          id: "android",
          name: "Android",
          icon: "VoicesVoiceIcon02.png",
          tags: ["robotic"],
        },
      ],
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

    getters = {
      activeApp: () => ({
        id: "2x1",
        name: "2x1",
        icon: "VoicesVoiceIcon01.png",
        tags: ["misc"],
      }),
    };

    store = new Vuex.Store({
      state,
      getters,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders TabsMenu component", () => {
    wrapper = shallowMount(TabsMenu, { store, localVue, vuetify });
    expect(wrapper.findComponent(TabsMenu)).toBeTruthy();
  });

  it("Loading value in component is false and Progress not rendered", () => {
    wrapper = shallowMount(TabsMenu, { store, localVue, vuetify });
    expect(wrapper.find(".v-overlay").exists()).toBeFalsy();
    expect(wrapper.findComponent(ProgressBar).exists()).toBeFalsy();
  });

  it('Renders "store.getters.showApps" and "store.getters.originApps" inside showingAppsText', () => {
    wrapper = shallowMount(TabsMenu, { store, localVue });
    const headline = wrapper.find("#showingAppsText");
    expect(headline.text()).toBe(
      `Showing (${state.showApps.length}/${state.originApps.length})`
    );
  });

  it("Renders Card component because activeApp is not empty", () => {
    wrapper = shallowMount(TabsMenu, { store, localVue, vuetify });
    expect(wrapper.findComponent(Card)).toBeTruthy();
  });
});
