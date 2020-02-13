import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import TheSettingsComponent from "@/components/TheSettingsComponent";

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);

describe("TheSettingsComponent.vue", () => {
  const shallowMountFunction = options => shallowMount(TheSettingsComponent, {
    Vuetify,
    localVue,
    ...options,
    sync: false
  });

  let store;
  let state;
  let getters;
  let actions;

  beforeEach(() => {
    state = {
      tmdbApiKey: "state test"
    };
    getters = {
      tmdbApiKey: () => "getter test",
    };
    actions = {
      tmdbApiKey: jest.fn()
    };
    store = new Vuex.Store({
      state,
      getters,
      actions
    });
  });

  test("render", () => {
    const wrapper = shallowMountFunction({ store });
    // const wrapper = shallowMount(TheSettingsComponent, { store, localVue, Vuetify });
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
