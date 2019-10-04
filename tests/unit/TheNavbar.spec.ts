import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import Vuex from 'vuex';
import TheNavbar from '@/components/TheNavbar.vue';

describe('TheNavbar.vue', () => {

  const shallowMountFunction = (options: any) => shallowMount(TheNavbar, {
    vuetify,
    ...options,
  });

  beforeEach(() => {
    Vue.use(Vuex);
  });

  test('render', () => {
    const wrapper = shallowMountFunction({});
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
