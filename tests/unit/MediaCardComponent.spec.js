import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import MediaCardComponent from "@/components/MediaCardComponent";

describe("MediaCardComponent.vue", () => {
  const shallowMountFunction = options => shallowMount(MediaCardComponent, {
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
