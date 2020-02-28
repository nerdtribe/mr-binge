import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import MediaDetailComponent from "@/components/MediaDetailComponent";

// Ignore youtube-embed as its tested via cypress
Vue.config.ignoredElements = ["youtube"];

describe("MediaDetailComponent.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  const shallowMountFunction = options => shallowMount(MediaDetailComponent, {
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
});
