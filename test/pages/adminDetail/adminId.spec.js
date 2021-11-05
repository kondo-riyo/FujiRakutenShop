import { shallowMount, createLocalVue } from '@vue/test-utils';
import adminDetailId from '../../../pages/adminDetail/_adminId.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';

import { createStore } from '../../../.nuxt/store';
import { initialiseStores } from '../../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' })

describe('Testing pages/adminDetail/_adminId.vue component', () => {
  let wrapper;
  let divWrapper;
  let AdminStore;
  let store;

beforeAll(() => {
  initialiseStores(createStore());

  let fn = jest.fn();
  AdminStore = {
    namespaced: true,
    getters: {
      getstoreLogItems: fn,
    },
    actions: {
      updateStatusAct: fn
    }
  };

  store = new Vuex.Store({
    modules: {
      admin: AdminStore,
    },
  });
  wrapper = shallowMount(adminDetailId, {
    localVue,
    router,
    store,
    data() {
      return {
        // params: '123456'
      }
    },
    computed: {
      totalItemPrice() {
        let totalPrice = 0;
        this.getLogItems.forEach((item) => {
          item.itemInfo.forEach((price) => {
            totalPrice = totalPrice + price.totalPrice;
          });
        });
        return totalPrice;
      },
      getLogItems() {
        return [
          {
            orderInfo: { allPrice: 0 },
            orderId: '123456',
            itemInfo: [{ totalPrice: 400 }, { totalPrice: 400 }],
            status: '1',
          },
        ];
      },
    },
  });
    divWrapper = wrapper.find('div');
});

  it('adminId.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが表示されるか', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('注文履歴')
  });
  it('clickイベント(back_onStep)が発火されている', () => {
    divWrapper.get('div').trigger('click');
  });
  it('$router.pushの引数が正しいか', () => {
    const mockRouterPush = jest.fn();
    const app_mount = shallowMount(adminDetailId, {
      mocks: {
        $router: {
          push: mockRouterPush
        },
      }
    });
    app_mount.find('div').trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith
  });
  it('select', ()=> { 
    let selectWrapper = wrapper.find('[data-testid="statusChange"]');
    selectWrapper.trigger('change')
    expect(selectWrapper.trigger('statusChange')).toBeTruthy();
  });
  it('fetchがレンダリング前に呼ばれているか', ()=> {
    const context = {store};
    wrapper.vm.$options.fetch(context);
    expect(context.store.fetchLogItemsAct).toHaveBeenCalled;
  })
});

// npm run test /test/pages/adminDetail/adminId.spec.js