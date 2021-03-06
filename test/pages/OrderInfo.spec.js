
import { mount, createLocalVue } from '@vue/test-utils';
import OrderInfo from '../../pages/OrderInfo.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';
import VueMeta from 'vue-meta'
import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' })

describe('Testing OrderInfo component', () => {
  let wrapper;
  let UserStore;
  let CartStore;
  let AdminStore;
  let store;
  let confirmSpy;
  let inputWrapper;
  beforeAll(() => {
    initialiseStores(createStore());
    let fn = jest.fn();
    let stubComponents = ['DeliverySelect','roundBottun','inputA', 'squareBottun'];
    UserStore = {
      namespaced: true,
      getters: {
        getUserInfo: fn
      },
      actions:{
        fetchSignupInfoAct: jest.fn(()=>{return {name:'ใในใ'}})
      }
    };
    CartStore = {
      namespaced: true,
      getters: {
        getitemInfo: jest.fn(()=>{return [{orderId:"vdjvnjdbv1", itemInfo: [{ totalPrice: 400 }, { totalPrice: 400 }],
      }]})
      },
    };
    AdminStore = {
      namespaced: true,
      actions: {
        addAdminAct: fn
      }
    }
    store = new Vuex.Store({
      modules: {
        user: UserStore,
        cart: CartStore,
        admin: AdminStore
      }
    })

    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));
    
    wrapper = mount(OrderInfo, {
      localVue,
      router,
      store,
      stubs: stubComponents,
      computed: {
        userInfoFromStore() {
          return [{
            email: 'sample@sample.com',
            password: '12345',
            name: 'fuji',
            tel: '11122223333',
            postalcode: '1230000',
            address: 'tokyo',
            uid: 'asdf'    
          }]
        },
        itemInfoFromStore() {
          return [{
            // orderInfo: { allPrice: 0 },
            orderId: '123456',
            itemInfo: [{ totalPrice: 400 }, { totalPrice: 400 }],
            status: '1',
          }];
        },
        getAllPrice(){
          let allPrice = 0;
          //@ts-ignore
          this.itemInfoFromStore[0].itemInfo.forEach(item=>{
           allPrice = allPrice + item.totalPrice
          })
          return allPrice;
        },
      },

    });
    inputWrapper = wrapper.find('input')
  });
  afterAll(() => confirmSpy.mockRestore());

  it('OrderInfoใๅญๅจใใ', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headใ่กจ็คบใใใใ', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('ใๅฑใๅๆๅ?ฑๅฅๅ')
  });
  it('creditPay()ใ็บ็ซใใใฆใใ', () => {
    wrapper.setData({selectPayment:false})
    let inputWrapper = wrapper.find('[data-testid="creditPay"]')
    inputWrapper.get('input').trigger('click');
    expect(inputWrapper.trigger('creditPay')).toBeTruthy();
    expect(wrapper.vm.selectPayment).toEqual(true)
  });
  it('notcreditPay()ใ็บ็ซใใใฆใใ', () => {
    wrapper.setData({selectPayment:false})
    let inputWrapper = wrapper.find('[data-testid="notcreditPay"]')
    inputWrapper.get('input').trigger('click');
    expect(inputWrapper.trigger('notcreditPay')).toBeTruthy();
    expect(wrapper.vm.selectPayment).toEqual(false)
  });
  it('inputName()ใ็บ็ซใใใฆใใ', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputName"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputName')).toBeTruthy();
  });
  it('inputMail()ใ็บ็ซใใใฆใใ', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputMail"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputMail')).toBeTruthy();
  });
  it('inputPostalcode()ใ็บ็ซใใใฆใใ', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputPostalcode"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputPostalcode')).toBeTruthy();
  });
  it('inputAddress()ใ็บ็ซใใใฆใใ', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputAddress"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputAddress')).toBeTruthy();
  });
  it('inputTel()ใ็บ็ซใใใฆใใ', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputTel"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputTel')).toBeTruthy();
  });
  it('inputDeliveryDate()ใ็บ็ซใใใฆใใ', () => {
    let inputAWrapper = wrapper.find('[data-testid="inputDeliveryDate"]');
    inputAWrapper.vm.$emit('input')
    expect(inputAWrapper.trigger('inputDeliveryDate')).toBeTruthy();
  });
  it('userInfoFromStoreใๆๅพ้ใใ', async () => {
    await expect(wrapper.vm.userInfoFromStore).toEqual([
      {
        email: 'sample@sample.com',
        password: '12345',
        name: 'fuji',
        tel: '11122223333',
        postalcode: '1230000',
        address: 'tokyo',
        uid: 'asdf'
        },
    ]);
  });
  it('getAllPriceใๆๅพ้ใใ', async () => {
    await expect(wrapper.vm.getAllPrice).toEqual(800);
  });
  it('yubinbango()ใ็บ็ซใใใฆใใ', () => {
    wrapper.setMethods({ yubinango: jest.fn() })
    let squbuttonWrapper = wrapper.find('[data-testid="yubinbango"]');
    squbuttonWrapper.vm.$emit('click')
    expect(squbuttonWrapper.trigger('yubinbango')).toBeTruthy();
  });
  it('OrderSubmit()ใ็บ็ซใใใฆใใ', () => {
    let buttonWrapper = wrapper.find('[data-testid="OrderSubmit"]');
    buttonWrapper.vm.$emit('click')
    expect(buttonWrapper.trigger('OrderSubmit')).toBeTruthy();
  });  
  it('compirmใfalseใฎๅ?ดๅใชใซใๅผใฐใชใ',()=>{
    confirmSpy.mockImplementation(jest.fn(() => false));
    let buttonWrapper = wrapper.find('[data-testid="OrderSubmit"]');
    buttonWrapper.vm.$emit('click')
  })
});


// npm run test /test/pages/OrderInfo.spec.js