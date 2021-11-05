import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import RakuItemId from '../../../pages/RakutenItemDetail/_itemId.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../../.nuxt/store';
import { initialiseStores } from '../../../utils/store-accsessor.ts';
import { config } from '@vue/test-utils';

config.showDeprecationWarnings = false;
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
describe('Testing pages/RakutenItemDetail/_itemid.vue component', () => {
  let wrapper;
  let divWrapper;
  let store;
  let ApiItemsStore;
  let UserStore;
  let confirmSpy;

  beforeAll(() => {
    initialiseStores(createStore());
    let fn = jest.fn();
    ApiItemsStore = {
      namespaced: true,
      getters: {
        getItemDetail: fn,
      },
    };
    UserStore = {
      actions:{
        fetchSignupInfoAct:()=>{return {name:"テストユーザ"}}
      },
    }
    store = new Vuex.Store({
      modules: {
        apis: ApiItemsStore,
        users: UserStore
      },
    });

    let stub2 = ['squareBottun', 'Detail'];
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
    wrapper = mount(RakuItemId, {
      localVue,
      router,
      store,
      stubs: stub2,
      data() {
        return {
          params: 'asdf',
        };
      },
    });
    divWrapper = wrapper.find('div');
  });
  afterAll(() => confirmSpy.mockRestore());

  it('itemId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('clickイベント(back_onStep)が発火されている', () => {
    divWrapper.get('div').trigger('click');
  });
  it('$router.pushの引数が正しいか', () => {
    const mockRouterPush = jest.fn();
    const app_mount = shallowMount(RakuItemId, {
      mocks: {
        $router: {
          push: mockRouterPush,
        },
      },
    });
    app_mount.find('div').trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith;
  });
  it('totalItemPriceが期待通りか', async () => {
    await expect(wrapper.vm.calcTotalPrice).toEqual(0);
  });
  it('$router.pushが発火してるか(back_onStep)', async () => {
    const mockRouterPush = jest.fn();
    const mockRouteParams = jest.fn();
    const app_mount = mount(RakuItemId, {
      mocks: {
        $router: {
          push: mockRouterPush,
        },
        $route: {
          params: mockRouteParams,
        },
      },
    });
    await app_mount.setData({
      itemDetail: { id: 1 },
    });
    app_mount.find('[data-testid="back_onStep"]').trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith;
    expect(mockRouteParams).toHaveBeenCalledWith;
  });
  it('addCart()が呼ばれているか', async () => {
    await wrapper.setData({
      itemDetail: {
        id: 1,
        name: 'コーヒー',
        price: 500,
        discription: '苦い',
        img: 'img',
        rank: 12,
      },
      itemDetail: {
        id: 2,
        name: 'チョココーヒー',
        price: 500,
        discription: '苦い',
        img: 'img',
        rank: 13,
      },
    });
    let buttonWrapper = wrapper.find('[data-testid="addCart"]');
    buttonWrapper.vm.$emit('click');
    expect(buttonWrapper.trigger('addCart')).toBeTruthy();
  });
  it('createdの発火', () => {
    wrapper.setMethods({
      getItemDetail: jest.fn(),
    });
    expect(wrapper.vm.getItemDetail).toBeCalled;
  });
  it('asyncDataが正常に動く', () => {
    const data = wrapper.vm.$options.asyncData({
      params: { paramsId: 2 },
    });
    wrapper.setData(data);
    expect(wrapper.vm.itemDetail).toEqual({
      discription: '苦い',
      id: 2,
      img: 'img',
      name: 'チョココーヒー',
      price: 500,
      rank: 13,
    });
  });
  it('calcTotalPriceが正しく表示される(分岐:itemdetailが存在するパターン)', async () => {
    wrapper.setData({
      itemDetail: {
        price: 500,
      },
      selectedItemNum: 2,
    });
    await expect(wrapper.vm.calcTotalPrice).toEqual(1000);
  });
  it('addCartが正しく分岐する', () => {
    let buttonWrapper = wrapper.find('[data-testid="addCart"]');
    buttonWrapper.vm.$emit('click');
  });
  it('addCartが正しく分岐する', () => {
    wrapper.setData({userInfo:{name:"テストの人"}})
    let buttonWrapper = wrapper.find('[data-testid="addCart"]');
    buttonWrapper.vm.$emit('click');
  });
});

// npm run test /test/pages/RakutenItemDetail/itemId.spec.js
