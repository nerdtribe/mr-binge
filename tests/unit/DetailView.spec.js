import { shallowMount } from "@vue/test-utils";
import DetailView from "@/views/DetailView";

describe("DetailView.vue", () => {
  test("render", () => {
    const wrapper = shallowMount(DetailView);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
