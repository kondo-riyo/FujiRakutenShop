import { shallowMount, createLocalVue } from '@vue/test-utils';
import searchRakutenItems from '../../pages/searchRakutenItems.vue';
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
describe('Testing searchRakutenItems component', () => {
  let wrapper;
  let store;
  let ApiItemsStore;

  beforeAll(() => {
    initialiseStores(createStore());

    let fn = jest.fn();
    ApiItemsStore = {
      namespaced: true,
      actions: { searchApiItemsAct: fn },
      getters: {
        getSearchItemsFromApi: jest.fn(()=>{return [{},{}]}),
        getItemsFromApi:jest.fn(()=>{return [{name:"らくてん"},{name:"楽天"}]}),
      },
    };

    store = new Vuex.Store({
      modules: {
        apiItems: ApiItemsStore,
      },
    });
    wrapper = shallowMount(searchRakutenItems, {
      localVue,
      router,
      store,
      data() {
        return {
          KeyWord: 'ワード',
          keywordNullFlg: false,
        };
      },
    });
  });
  it('searchRakutenItemsが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('楽天商品');
  });
  it('@searchItemsでイベント(search)が発火する', async () => {
    let cancelWrapper = wrapper.find('[data-testid="search"]');
    cancelWrapper.vm.$emit('searchItems');
    expect(cancelWrapper.trigger('search')).toBeTruthy();
  });
  it(' seaachが正しく動く ', async () => {
    let cancelWrapper = wrapper.find('[data-testid="search"]');
    cancelWrapper.vm.$emit('searchItems');
    cancelWrapper.trigger('search');
  });
  it(' seaachが正しく動く：キーワード＝"" ', async () => {
    wrapper.setData({keywordNullFlg:true})
    let searchWrapper = wrapper.find('[data-testid="search"]');
     searchWrapper.vm.$emit('searchItems');
    await expect(wrapper.vm.keywordNullFlg).toBe(false);
    await expect(wrapper.vm.searchItemNullFlg).toBe(false);
    await expect(wrapper.vm.defaultItemsFlg).toBe(true);
  });
});

// npm run test test/pages/searchRakutenItems.spec.js
