// Good Resources
// https://medium.com/@lachlanmiller_52885/data-and-interaction-testing-in-vue-e7914a9179d7
// http://iobio.io/user_guides/2019/05/20/vue-js-unit-testing-with-jest/
// https://vue-test-utils.vuejs.org/guides/#getting-started
// https://vuetifyjs.com/en/getting-started/unit-testing

import { mount, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import Vuex from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  let actions: any;
  let store: any;

  const shallowMountFunction = (options: any) => shallowMount(HelloWorld, {
    store,
    vuetify,
    ...options,
  });

  const mountFunction = (options: any) => mount(HelloWorld, {
    store,
    vuetify,
    ...options,
  });

  beforeEach(() => {
    Vue.use(Vuex);

    // Store Mocks
    actions = {
      addApiKey: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  test('render', () => {
    const wrapper = shallowMountFunction({});
    expect(wrapper.isVueInstance()).toBe(true);
  });

  test('should update api key data', async () => {
    const wrapper = mountFunction({});
    wrapper.find('[data-apiKey]').setValue('test123');
    expect(wrapper.vm.$data.apiKeyInput).toEqual('test123');
  });

  test('should emit an event when the action v-btn is clicked', () => {
    const wrapper = mountFunction({});
    wrapper.find('#saveBtn').trigger('click');
    expect(actions.addApiKey).toHaveBeenCalledTimes(1);
  });
});
