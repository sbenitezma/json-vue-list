import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import CustomIcon from "@/components/CustomIcon";

// add the 2 lines below
const localVue = createLocalVue();
localVue.use(Vuex);

describe.only("CustomIcon.vue", () => {
  // add the 2 lines below
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  vuetify = new Vuetify();

  beforeEach(() => {
    // Mount component to be accessible for classes
    wrapper = mount(CustomIcon, {
      vuetify,
      localVue,
      propsData: {
        alt: "Test Image",
        format: "png",
        maxHeight: "200px",
        maxWidth: "200px",
        name: "logo-header",
      },
    });
  });
  // Destroy the component wrapper after each test
  afterEach(() => {
    wrapper.destroy();
  });

  it("Renders CustomIcon component", () => {
    expect(wrapper.findComponent(CustomIcon).exists()).toBeTruthy();
  });

  it("Should render CustomIcon classes", () => {
    let toolbarClass = wrapper.find(".v-image");
    expect(toolbarClass.exists()).toBeTruthy();
    expect(toolbarClass.element).toMatchSnapshot();
  });

  it("Should render properly an image according provided props", async () => {
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.element.style.maxHeight).toBe("200px");
    expect(wrapper.element.style.maxWidth).toBe("200px");
  });

  it("Should update the component properly after changing props", async () => {
    wrapper.setProps({
      maxHeight: "500px",
      maxWidth: "500px",
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.element.style.maxHeight).toBe("500px");
    expect(wrapper.element.style.maxWidth).toBe("500px");
  });
});
