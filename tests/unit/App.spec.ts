import { shallowMount, createLocalVue } from "@vue/test-utils";
import vuetify from "@/plugins/vuetify";
import App from "@/App.vue";

const localVue = createLocalVue();
localVue.use(vuetify);

describe("Home.vue", () => {
  test("render", () => {
    const wrapper = shallowMount(App, {
      stubs: {
        RouterView: true,
        TheNavbarView: true
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
