import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import MediaDetailComponent from '@/components/MediaDetailComponent.vue';

describe('MediaDetailComponent.vue', () => {

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  const shallowMountFunction = (options: any) => shallowMount(MediaDetailComponent, {
    localVue,
    vuetify,
    router,
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
