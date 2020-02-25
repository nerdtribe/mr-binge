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
  let actions;
  let storeDispatchSpy;

  beforeEach(() => {
    state = {
      tmdbApiKey: "test123",
      tmdbApiEnabled: false,
    };
    actions = {
      tmdbApiKey: jest.fn(),
      tmdbApiEnabled: jest.fn(),
    };
    store = new Vuex.Store({
      state,
      actions
    });

    storeDispatchSpy = jest.spyOn(store, "dispatch");
  });

  test("render", () => {
    const wrapper = shallowMountFunction({ store });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test("tmdbApiKey", () => {
    const wrapper = shallowMountFunction({ store });
    expect(wrapper.vm.tmdbApiKey).toBe("test123");
    expect(actions.tmdbApiKey).not.toHaveBeenCalled();
    wrapper.vm.tmdbApiKey = "test1234";
    expect(actions.tmdbApiKey).toHaveBeenCalledTimes(1);
    expect(storeDispatchSpy).toHaveBeenCalledWith("tmdbApiKey", "test1234");
  });

  test("tmdbApiEnabled", () => {
    const wrapper = shallowMountFunction({ store });
    expect(wrapper.vm.tmdbApiEnabled).toBe(false);
    expect(actions.tmdbApiEnabled).not.toHaveBeenCalledTimes(1);
    wrapper.vm.tmdbApiEnabled = true;
    expect(storeDispatchSpy).toHaveBeenCalledWith("tmdbApiEnabled", true);
  });
});
