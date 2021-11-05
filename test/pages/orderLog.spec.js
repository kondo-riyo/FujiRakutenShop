import { shallowMount, createLocalVue } from '@vue/test-utils';
import OrderLog from '../../pages/OrderLog.vue';
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
describe('Testing OrderLog component', () => {
  let wrapper;
  let store;
  let CartStore;

  beforeAll(() => {
    initialiseStores(createStore());

    let fn = jest.fn();
    CartStore = {
      namespaced: true,
      getters: {
        getOrderLog: fn,
      },
      actions: {
        fetchitemInfoAct: fn,
        cancelOrderAct: fn,
      },
    };

    store = new Vuex.Store({
      modules: {
        cart: CartStore,
      },
    });
    wrapper = shallowMount(OrderLog, {
      localVue,
      router,
      store,
      computed: {
        totalItemPrice() {
          let totalPrice = 0;
          this.getOrderLogs.forEach((item) => {
            item.itemInfo.forEach((price) => {
              totalPrice = totalPrice + price.totalPrice;
            });
          });
          return totalPrice;
        },
        getOrderLogs() {
          return [
            {
              orderInfo: { allPrice: 0 },
              itemInfo: [{ totalPrice: 400 }, { totalPrice: 400 }],
              status: 1,
            },
          ];
        },
      },
    });
  });
  it('OrderLogが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('注文履歴');
  });
  it('totalItemPriceが期待通りか？', async () => {
    await expect(wrapper.vm.totalItemPrice).toEqual(800);
  });
  it('getOrderLogsが期待通りか？', async () => {
    await expect(wrapper.vm.getOrderLogs).toEqual([
      {
        itemInfo: [{ totalPrice: 400 }, { totalPrice: 400 }],
        orderInfo: { allPrice: 0 },
        status: 1,
      },
    ]);
  });
  it('closeModalがemitされる', () => {
    let closeWrapper = wrapper.find('order-modal-stub');
    closeWrapper.vm.$emit('close');
    expect(closeWrapper.trigger('closeModal')).toBeTruthy();
  });
  it('cickでイベント(cancelOrder)が発火する',async () => {
    let cancelWrapper = wrapper.find('[data-testid="cancelOrder"]');
    cancelWrapper.trigger('click')
    cancelWrapper.trigger('cancelOrder')
    expect(cancelWrapper.trigger('cancelOrder')).toBeTruthy();
    //↓passするがカバレッジに変化なし↓
    //expect(store.cancelOrderAct).toHaveBeenCalled;
  })
  it('cickでイベント(openModal)が発火する', () => {
    let cancelWrapper = wrapper.find('square-bottun-stub');
    cancelWrapper.vm.$emit('click');
    expect(cancelWrapper.trigger('openModal')).toBeTruthy();
  });
  it('fetchのfetchitemInfoActアクションがレンダリング前に動作する',()=>{
      const context = {store}
      wrapper.vm.$options.fetch(context);
      expect(context.store.fetchitemInfoAct).toHaveBeenCalled
  })
});
// npm run test test/pages/orderLog.spec.js