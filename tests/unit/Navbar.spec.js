import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Navbar from "@/components/Navbar.vue";
import Icon from "@/components/Icon.vue";

describe("Navbar.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  vuetify = new Vuetify();

  beforeEach(() => {
    // Mount component to be accessible for classes
    wrapper = mount(Navbar, { vuetify, localVue });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders Navbar component", () => {
    expect(wrapper.findComponent(Navbar).exists()).toBeTruthy();
  });

  it("Should render Navbar classes", () => {
    let toolbarClass = wrapper.find(".v-toolbar__content");
    expect(toolbarClass.exists()).toBeTruthy();
    expect(toolbarClass.element).toMatchSnapshot();
  });

  it("Navbar contains and renders Icon component", () => {
    expect(wrapper.findComponent(Icon).exists()).toBeTruthy();
  });

  it("Navbar contains and renders Icon classes", () => {
    let imageClass = wrapper.find(".v-image");
    expect(imageClass.exists()).toBeTruthy();
    expect(imageClass.element).toMatchSnapshot();
  });
});
