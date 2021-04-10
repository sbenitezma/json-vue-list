import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import ProgressBar from "@/components/ProgressBar.vue";

describe.only("ProgressBar.vue", () => {
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
