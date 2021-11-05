import { shallowMount, createLocalVue } from '@vue/test-utils';
import home from '../../pages/index.vue';
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
describe('Testing home component', () => {
  let wrapper;
  let store;

  beforeAll(() => {
    initialiseStores(createStore());

    store = new Vuex.Store();
    wrapper = shallowMount(home, {
      localVue,
      router,
      store,
    });
  });
  it('homeが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('ホーム');
  });
});

