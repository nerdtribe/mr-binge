import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import Vuex from "vuex";
import MediaCardComponent from "@/components/MediaCardComponent.vue";

describe("MediaCardComponent.vue", () => {
  const shallowMountFunction = (options: any) =>
    shallowMount(MediaCardComponent, {
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
