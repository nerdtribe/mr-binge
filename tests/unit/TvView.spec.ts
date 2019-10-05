import { shallowMount } from '@vue/test-utils';
import TvView from '@/views/TvView.vue';

describe('TvView.vue', () => {

  test('render', () => {
    const wrapper = shallowMount(TvView);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
