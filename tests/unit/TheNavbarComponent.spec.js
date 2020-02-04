import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import TheNavbarComponent from "@/components/TheNavbarComponent";

describe("TheNavbarComponent.vue", () => {
  const shallowMountFunction = options => shallowMount(TheNavbarComponent, {
    Vuetify,
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
});
