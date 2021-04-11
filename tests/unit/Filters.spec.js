import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { getters } from "@/store/getters";
import { mutations } from "@/store/mutations";

import Filters from "@/components/Filters.vue";
import Icon from "@/components/Icon.vue";

describe("Filters.vue", () => {
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
      appName: "test",
    };
    store = new Vuex.Store({
      state,
      getters,
      mutations,
      vuetify,
      localVue,
    });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Filters component", () => {
    wrapper = shallowMount(Filters, { store, localVue, vuetify });
    expect(wrapper.findComponent(Filters).exists()).toBeTruthy();
  });

  it("Renders Icon component", () => {
    wrapper = shallowMount(Filters, { store, localVue, vuetify });
    expect(wrapper.findComponent(Icon).exists()).toBeTruthy();
  });

  it("Test component method clearSearch", async () => {
    wrapper.vm.clearSearch();
    expect(wrapper.vm.appName).toBe("");
  });

  it("Test component method searchByNameApps", async () => {
    let name = "device";
    wrapper.vm.searchByNameApps(name);
    expect(wrapper.vm.appName).toBe("device");
  });

  it("Test component method searchByTagApps", async () => {
    let tag = "human";
    wrapper.vm.searchByTagApps(tag);
    const activeApp = getters.activeApp(state);
    expect(activeApp).toEqual(state.activeApp);
  });
});
