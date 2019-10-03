// Good Resources
// https://medium.com/@lachlanmiller_52885/data-and-interaction-testing-in-vue-e7914a9179d7
// http://iobio.io/user_guides/2019/05/20/vue-js-unit-testing-with-jest/
// https://vue-test-utils.vuejs.org/guides/#getting-started
// https://vuetifyjs.com/en/getting-started/unit-testing

import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {

  test('render', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
