// Good Resources
// https://medium.com/@lachlanmiller_52885/data-and-interaction-testing-in-vue-e7914a9179d7
// http://iobio.io/user_guides/2019/05/20/vue-js-unit-testing-with-jest/
// https://vue-test-utils.vuejs.org/guides/#getting-started
// https://vuetifyjs.com/en/getting-started/unit-testing

import { shallowMount, createLocalVue } from '@vue/test-utils';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(vuetify);

describe('Home.vue', () => {

  test('render', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
