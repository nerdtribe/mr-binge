import { shallowMount } from "@vue/test-utils";
import MovieView from "@/views/MovieView";

describe("MovieView.vue", () => {
  test("render", () => {
    const wrapper = shallowMount(MovieView);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
