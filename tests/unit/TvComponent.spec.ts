import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import Vuex from 'vuex';
import TvComponent from '@/components/TvComponent.vue';

describe('TvComponent.vue', () => {

  const shallowMountFunction = (options: any) => shallowMount(TvComponent, {
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
