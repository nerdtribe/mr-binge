import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import Vuex from 'vuex';
import TheNavbarComponent from '@/components/TheNavbarComponent.vue';

describe('TheNavbarComponent.vue', () => {

  const shallowMountFunction = (options: any) => shallowMount(TheNavbarComponent, {
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
