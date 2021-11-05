import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import searchFujiItems from '../../pages/searchFujiItems.vue';
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

describe('Testing searchFujiItems component', () => {
  let wrapper;
  let store;
  let ItemsStore;

  beforeAll(() => {
    initialiseStores(createStore());

    let fn = jest.fn();
    ItemsStore = {
      namespaced: true,
      getters: {
        getItems: fn,
      },
    };

    store = new Vuex.Store({
      modules: {
        items: ItemsStore,
      },
    });

    wrapper = shallowMount(searchFujiItems, {
      localVue,
      router,
      store,
      data() {
        return {
          KeyWord: '',
          keywordNullFlg: false,
          resultNullFlg: false,
        };
      },
    });
  });
  it('searchFujiItemsが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('FUJIオリジナル商品');
  });
  it('@searchItemsでイベント(search)が発火する', async () => {
    let cancelWrapper = wrapper.find('[data-testid="search"]');
    cancelWrapper.vm.$emit('searchItems');
    expect(cancelWrapper.trigger('search')).toBeTruthy();
  });
  it('search()のword=""の時', ()=>{
    const newWrapper = mount(searchFujiItems, {
      propsData: {
        word: ''
      }
    });
    let searchWrapper = newWrapper.get('[data-testid="search"]');
    expect(searchWrapper.trigger('search')).toBeTruthy()
  });
});

// npm run test /test/pages/searchFujiItems.spec.js