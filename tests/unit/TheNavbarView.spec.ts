import { shallowMount } from '@vue/test-utils';
import TheNavbarView from '@/views/TheNavbarView.vue';

describe('TheNavbar.vue', () => {

  test('render', () => {
    const wrapper = shallowMount(TheNavbarView);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
