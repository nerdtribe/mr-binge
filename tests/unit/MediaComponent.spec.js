import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import MediaComponent from "@/components/MediaComponent";

describe("MediaComponent.vue", () => {
  const shallowMountFunction = options => shallowMount(MediaComponent, {
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
