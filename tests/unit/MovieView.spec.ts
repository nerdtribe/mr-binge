import { shallowMount } from '@vue/test-utils';
import MovieView from '@/views/MovieView.vue';

describe('MovieView.vue', () => {

  test('render', () => {
    const wrapper = shallowMount(MovieView);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
