import { shallowMount, createLocalVue } from '@vue/test-utils';
import Cart from '../../pages/Cart.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' });
describe('Testing Cart component', () => {
  let wrapper;
  let store;
  let CartStore;

  beforeAll(() => {
    initialiseStores(createStore());

    store = new Vuex.Store();
    wrapper = shallowMount(Cart, {
      localVue,
      router,
      store,
    });
  });
  it('Cartが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('カート');
  });
});
