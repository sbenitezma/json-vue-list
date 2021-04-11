import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { getters } from "@/store/getters";

import Table from "@/components/Table.vue";
import Icon from "@/components/Icon.vue";

describe("Table.vue", () => {
  const localVue = createLocalVue();
  let state;
  let store;
  let vuetify;
  let wrapper;

  vuetify = new Vuetify();
  localVue.use(vuetify);
  localVue.use(Vuex);

  beforeEach(() => {
    state = {
      activeApp: {
        id: "alien",
        name: "Alien",
        icon: "VoicesVoiceIcon01.png",
        tags: ["robotic"],
        favourite: true,
        active: true,
      },
      originApps: [
        {
          id: "alien",
          name: "Alien",
          icon: "VoicesVoiceIcon01.png",
          tags: ["robotic"],
          favourite: true,
          active: true,
        },
        {
          id: "android",
          name: "Android",
          icon: "VoicesVoiceIcon02.png",
          tags: ["human"],
          favourite: true,
          active: false,
        },
      ],
      showApps: [
        {
          id: "alien",
          name: "Alien",
          icon: "VoicesVoiceIcon01.png",
          tags: ["robotic"],
          favourite: true,
          active: true,
        },
        {
          id: "android",
          name: "Android",
          icon: "VoicesVoiceIcon02.png",
          tags: ["human"],
          favourite: true,
          active: false,
        },
      ],
    };
    store = new Vuex.Store({
      state,
      getters,
      vuetify,
      localVue,
    });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Table component", () => {
    wrapper = shallowMount(Table, { store, localVue, vuetify });
    expect(wrapper.findComponent(Table).exists()).toBeTruthy();
  });

  it("Renders Icon component", () => {
    wrapper = shallowMount(Table, { store, localVue, vuetify });
    expect(wrapper.findComponent(Icon).exists()).toBeTruthy();
  });
});
