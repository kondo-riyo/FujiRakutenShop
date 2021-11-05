import { shallowMount, createLocalVue } from '@vue/test-utils';
import OrderComp from '../../pages/OrderComp.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta'

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' })

describe('Testing OrderComp component', () => {
  let wrapper;
//   let divWrapper;
  beforeEach(() => {
    initialiseStores(createStore());
    wrapper = shallowMount(OrderComp, {
      localVue,
      router,
    //   store,
    });
  });
  it('OrderCompが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('注文完了')
  })
});
