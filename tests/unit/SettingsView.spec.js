import { shallowMount } from "@vue/test-utils";
import SettingsView from "@/views/SettingsView";

describe("SettingsView.vue", () => {
  test("render", () => {
    const wrapper = shallowMount(SettingsView);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
