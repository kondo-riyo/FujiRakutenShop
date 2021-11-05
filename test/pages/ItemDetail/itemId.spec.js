import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import FujiItemId from '../../../pages/ItemDetail/_itemId.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import { createStore } from '../../../.nuxt/store';
import { initialiseStores } from '../../../utils/store-accsessor.ts';
import { config } from '@vue/test-utils';

config.showDeprecationWarnings = false;
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' });

describe('Testing pages/itemDetail/_itemid.vue component', () => {
  let wrapper;
  let divWrapper;
  let CartStore;
  let UserStore;
  let ToppingsStore;
  let store;
  let squareBottunWrapper;
  let inputWrapper;
  let confirmSpy;
  let fn = jest.fn();
  initialiseStores(createStore());

  beforeAll(() => {
    UserStore = {
      namespaced: true,
       // userInfo: { name: 'テストさん' },
       userInfo: jest.fn(()=>{return null}),
    };
    CartStore = {
      namespaced: true,
      getters: {
        getOrderLog: fn,
      },
      actions: {
        addItemToCartAct: fn,
      },
    };
    ToppingsStore = {
      namespaced: true,
      getters: {
        getToppings: jest.fn(() => {
          return [
            {
              id: 1,
              name: 'アイス',
              priceL: 300,
              priceM: 200,
              isActiveM: false,
              isActiveL: false,
            },
            {
              id: 2,
              name: 'はちみつ',
              priceL: 300,
              priceM: 200,
              isActiveM: false,
              isActiveL: false,
            },
          ];
        }),
      },
    };
    let stub2 = ['squareBottun', 'Detail'];
    store = new Vuex.Store({
      modules: {
        cart: CartStore,
        topping: ToppingsStore,
        user: UserStore
      },
    });
    wrapper = mount(FujiItemId, {
      localVue,
      router,
      store,
      stubs: stub2,
      computed: {
        getToppings() {
          return [
            {
              id: 1,
              name: 'アイス',
              priceL: 300,
              priceM: 200,
              isActiveM: false,
              isActiveL: false,
            },
            {
              id: 2,
              name: 'はちみつ',
              priceL: 300,
              priceM: 200,
              isActiveM: false,
              isActiveL: false,
            },
          ];
        },
      },
    });
    divWrapper = wrapper.find('div');
    squareBottunWrapper = wrapper.find('squarebottun-stub');
    inputWrapper = wrapper.find('input');
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
  });
  afterAll(() => confirmSpy.mockRestore());

  it('itemId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('商品詳細');
  });
  it('clickイベント(Step)が発火されている', () => {
    divWrapper.get('div').trigger('click');
    expect(divWrapper.trigger('back_onStep')).toBeTruthy();
  });
  // it('$router.pushの引数が正しいか', () => {
  //   const mockRouterPush = jest.fn();
  //   const app_mount = shallowMount(FujiItemId, {
  //     mocks: {
  //       $router: {
  //         push: mockRouterPush
  //       },
  //     }
  //   });
  //   app_mount.find('div').trigger('click');
  //   expect(mockRouterPush).toHaveBeenCalledWith
  // });
  it('changeイベント(selectToppngSize)が発火', () => {
    const radioWrapper = wrapper.find('[data-testid="cal-modalM"]');
    expect(radioWrapper.trigger('change')).toBeTruthy();
  });
  it('changeイベント(selectToppngSize)が発火', () => {
    const radioWrapper = wrapper.find('[data-testid="cal-modalL"]');
    expect(radioWrapper.trigger('change')).toBeTruthy();
  });
  it('changeイベント(selectToppngSize)が発火', () => {
    const radioWrapper = wrapper.find('[data-testid="cal-modalNone"]');
    expect(radioWrapper.trigger('change')).toBeTruthy();
  });
  it('created(getItemdetail)が発火する', () => {
    wrapper.setMethods({
      getItemDetail: jest.fn(),
    });
    expect(wrapper.vm.getItemDetail).toBeCalled;
  });
  it('calcTotalPriceが正しく表示される(分岐:itemdetailが存在するパターン)', async () => {
    wrapper.setData({
      itemDetail: {
        price: 100,
        img: 'https://hdhdhdhdh',
        nama: 'もか',
        description: 'ですです',
      },
      selectedItemNum: 1,
      allToppingPrice: 200,
    });
    await expect(wrapper.vm.calcTotalPrice).toEqual(300);
  });
  it('computed(getToppings)が正しく表示される', () => {
    console.log(wrapper.store);
    expect(wrapper.vm.getToppings).toEqual([
      {
        id: 1,
        name: 'アイス',
        priceL: 300,
        priceM: 200,
        isActiveM: false,
        isActiveL: false,
      },
      {
        id: 2,
        name: 'はちみつ',
        priceL: 300,
        priceM: 200,
        isActiveM: false,
        isActiveL: false,
      },
    ]);
  });
  it('squareBottunのクリックイベント(addCart)が発火されている', () => {
    squareBottunWrapper.trigger('click');
    expect(store.addItemToCartAct).toHaveBeenCalled;
  });
  it('addCartが正しく分岐する(userInfoがnull)', () => {
    confirmSpy.mockImplementation(jest.fn(() => false));
    squareBottunWrapper.vm.$emit('click');
  });
  it('addCartが正しく分岐する(userInfoが存在する)', () => {
    wrapper.setData({userInfo:{name:"テストテスト"}})
    squareBottunWrapper.vm.$emit('click');
  });
});

// npm run test /test/pages/ItemDetail/itemId.spec.js
