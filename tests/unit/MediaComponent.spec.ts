import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import Vuex from "vuex";
import MediaComponent from "@/components/MediaComponent.vue";

describe("MediaComponent.vue", () => {
  const shallowMountFunction = (options: any) =>
    shallowMount(MediaComponent, {
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
