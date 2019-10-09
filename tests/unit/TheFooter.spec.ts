import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import Vuex from 'vuex';
import TheFooter from '@/components/TheFooter.vue';

describe('TheFooter.vue', () => {

  const shallowMountFunction = (options: any) => shallowMount(TheFooter, {
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
