import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Navbar from "@/components/Navbar.vue";
import CustomImage from "@/components/CustomImage";

// add the 2 lines below
const localVue = createLocalVue();
localVue.use(Vuex);

describe.only("Navbar.vue", () => {
  // add the 2 lines below
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

  it("Navbar contains and renders CustomImage component", () => {
    expect(wrapper.findComponent(CustomImage).exists()).toBeTruthy();
  });

  it("Navbar contains and renders CustomImage classes", () => {
    let imageClass = wrapper.find(".v-image");
    expect(imageClass.exists()).toBeTruthy();
    expect(imageClass.element).toMatchSnapshot();
  });
});
