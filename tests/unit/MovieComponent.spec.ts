import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import Vuex from 'vuex';
import MovieComponent from '@/components/MovieComponent.vue';

describe('MovieComponent.vue', () => {

  const shallowMountFunction = (options: any) => shallowMount(MovieComponent, {
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
