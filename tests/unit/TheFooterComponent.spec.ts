import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import Vuex from "vuex";
import TheFooterComponent from "@/components/TheFooterComponent.vue";

describe("TheFooterComponent.vue", () => {
  const shallowMountFunction = (options: any) =>
    shallowMount(TheFooterComponent, {
      vuetify,
      ...options
    });

  beforeEach(() => {
    Vue.use(Vuex);
  });

  test("render", () => {
    const wrapper = shallowMountFunction({});
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
