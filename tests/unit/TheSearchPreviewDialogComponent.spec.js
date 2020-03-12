import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import TheSearchPreviewDialogComponent from "@/components/TheSearchPreviewDialogComponent";

// Ignore youtube-embed as its tested via cypress
Vue.config.ignoredElements = ["youtube"];

describe("TheSearchPreviewDialogComponent.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  const shallowMountFunction = options => shallowMount(TheSearchPreviewDialogComponent, {
    Vuetify,
    localVue,
    router,
    ...options
  });

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);
  });

  test("render", () => {
    const wrapper = shallowMountFunction({});
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test("add", () => {
    const wrapper = shallowMountFunction({});
    const consoleSpy = jest.spyOn(console, "log");
    wrapper.vm.add("Test");
    expect(consoleSpy).toHaveBeenCalledWith("Firing Test");
  });
});
