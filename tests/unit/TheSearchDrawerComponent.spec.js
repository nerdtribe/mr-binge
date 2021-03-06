import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import TheSearchDrawerComponent from "@/components/TheSearchDrawerComponent";

describe("TheSearchDrawerComponent.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  const shallowMountFunction = options => shallowMount(TheSearchDrawerComponent, {
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

  test("dialog", () => {
    const wrapper = shallowMountFunction({});
    wrapper.vm.drawer = true;
    expect(wrapper.vm.drawer).toBeTruthy();
  });

  test("add", () => {
    const wrapper = shallowMountFunction({});
    const consoleSpy = jest.spyOn(console, "log");
    wrapper.vm.add("Test");
    expect(consoleSpy).toHaveBeenCalledWith("Firing Test");
  });
});
