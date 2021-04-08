import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import ProgressBar from "@/components/ProgressBar.vue";

// add the 2 lines below
const localVue = createLocalVue();
localVue.use(Vuex);

describe.only("ProgressBar.vue", () => {
  // add the 2 lines below
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  vuetify = new Vuetify();

  beforeEach(() => {
    // Mount component to be accessible for classes
    wrapper = mount(ProgressBar, { vuetify, localVue });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Progressbar component", () => {
    expect(wrapper.findComponent(ProgressBar).exists()).toBeTruthy();
  });

  it("Should render ProgressBar classes", () => {
    let progressClass = wrapper.find(".v-progress-circular");
    expect(progressClass.exists()).toBeTruthy();
    expect(progressClass.element).toMatchSnapshot();
  });
});
