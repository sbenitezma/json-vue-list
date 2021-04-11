import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Card from "@/components/Card.vue";
import { getters } from "@/store/getters";
import { mutations } from "@/store/mutations";

describe("Card.vue", () => {
  const localVue = createLocalVue();
  let item;
  let state;
  let store;
  let vuetify;
  let wrapper;

  item = {
    id: "alien",
    name: "Alien",
    icon: "VoicesVoiceIcon01.png",
    tags: ["robotic"],
    favourite: true,
    active: false,
  };

  vuetify = new Vuetify();
  localVue.use(vuetify);
  localVue.use(Vuex);
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
  };
  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
    wrapper = shallowMount(Card, {
      store,
      localVue,
      vuetify,
      propsData: {
        item: item,
      },
    });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Card component", () => {
    expect(wrapper.findComponent(Card).exists()).toBeTruthy();
  });

  it("Should have correct object type props", () => {
    const app = wrapper.vm.$options.props.item;
    expect(app.type).toBe(Object);
  });
});
