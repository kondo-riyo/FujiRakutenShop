import { shallowMount, createLocalVue } from '@vue/test-utils';
import cartTable from '../../components/templates/cart/cartTable.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Testing cartTable component', () => {
  let wrapper;
  let store;
  let fn;
  let CartStore;
  let confirmSpy;
  beforeAll(() => {
    initialiseStores(createStore());
    fn = jest.fn();
    CartStore = {
      namespaced: true,
      actions: {
        deleteCartItemAct: fn,
        fetchitemInfoAct: fn,
      },
    };
    store = new Vuex.Store({
      modules: {
        cart: CartStore,
      },
    });
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));

    wrapper = shallowMount(cartTable, {
      propsData: {
        cartItemFromStore: { itemInfo: [{ itemName: 'name',toppings:[{name:'はちみつ',size:1}] }], status: 0 },
        routerName: '',
      },
      localVue,
      router,
      store,
    });
  });
  afterAll(() => confirmSpy.mockRestore());
  it('cartTableが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('propsが受取れている', () => {
    expect(wrapper.vm.$props.cartItemFromStore.itemInfo[0].itemName).toBe(
      'name'
    );
    expect(wrapper.vm.$props.cartItemFromStore.status).toBe(0);
  });
  it('@clickでtoppingSizeが発火する', () => {
    wrapper.vm.toppingSize();
  });
  it('@clickでdeleteCartItemが発火する', () => {
     wrapper.get('[data-testid="show_cartItems"]').trigger('click');
    expect(store.deleteCartItemAct).toHaveBeenCalled
  });
  it('toppingSizeで正しい値を返す➀:el=1の時「多」を返す',()=>{
   const divWrapper = wrapper.find('[data-testid="toppingSize"]')
   expect(divWrapper.text()).toEqual('+ はちみつ (多)')
  })
  it('toppingSizeで正しい値を返す➀:el=1の時「少」を返す',async ()=>{
   await wrapper.setProps({cartItemFromStore: { itemInfo: [{ itemName: 'name',toppings:[{name:'はちみつ',size:2}] }]},})
    const divWrapper = wrapper.find('[data-testid="toppingSize"]')
    expect(divWrapper.text()).toEqual('+ はちみつ (少)')
   })
it('compirmがfalseの場合なにも呼ばない',()=>{
  confirmSpy.mockImplementation(jest.fn(() => false));
  wrapper.get('[data-testid="show_cartItems"]').trigger('click');
 expect(store.deleteCartItemAct).toHaveBeenCalled
})
});
// npm run test test/templates/cartTable.spec.js