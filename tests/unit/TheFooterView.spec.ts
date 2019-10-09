import { shallowMount } from '@vue/test-utils';
import TheFooterView from '@/views/TheFooterView.vue';

describe('TheFooterView.vue', () => {

  test('render', () => {
    const wrapper = shallowMount(TheFooterView);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
