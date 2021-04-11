import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Card from "@/components/Card.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

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
  };

  vuetify = new Vuetify();
  localVue.use(vuetify);

  beforeEach(() => {
    store = new Vuex.Store({
      state,
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

  it("Test component method TruncateString", async () => {
    wrapper.setProps({
      item: {
        id: item.id,
        name: "Alien Versus Predator is a good movie",
        icon: item.icon,
        tags: item.tags,
      },
    });
    await wrapper.vm.$nextTick();
    let truncatedText = wrapper.vm.truncateString(wrapper.vm.item.name, 20);
    expect(truncatedText).toBe("Alien Versus Predato...");
  });
});
