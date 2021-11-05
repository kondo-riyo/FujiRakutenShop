import { shallowMount } from '@vue/test-utils';
import orderModal from '../../components/organisms/orderModal.vue';

describe('Testing orderModal component', () => {
  const wrapper = shallowMount(orderModal, {
    propsData: {
      orderInfo: {
        address: '東京',
        allPrice: 3240,
        creditCardNum: '',
        deliveryDate: '2021-10-28',
        deliveryTime: '17',
        email: 'check@co.jp',
        name: 'テストユーザ',
        payment: 1,
        postalcode: '0150041',
        selectPayment: false,
        tel: '12312341234',
      },
      status: 1,
    },
  });

  it('orderModalが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('selectタグで@changeが発火されている', () => {
    wrapper.find('div').trigger('click');
  });

  it('filter statusが1の時は未入金と表示する', () => {
    let modalWrapper = wrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('未入金');
  });
  it('filter statusが2の時は入金済と表示する', () => {
    const newWrapper = shallowMount(orderModal, {
      propsData: {
        orderInfo: {
          name: 'テストユーザ2',
        },
        status: 2,
      },
    });
    let modalWrapper = newWrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('入金済');
  });
  it('filter statusが3の時は発送済と表示する', () => {
    const newWrapper = shallowMount(orderModal, {
      propsData: {
        orderInfo: {
          name: 'テストユーザ3',
        },
        status: 3,
      },
    });
    let modalWrapper = newWrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('発送済');
  });
  it('filter statusが4の時は配達済と表示する', () => {
    const newWrapper = shallowMount(orderModal, {
      propsData: {
        orderInfo: {
          name: 'テストユーザ4',
        },
        status: 4,
      },
    });
    let modalWrapper = newWrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('配達済');
  });
  it('filter statusが9の時は配達済と表示する', () => {
    const newWrapper = shallowMount(orderModal, {
      propsData: {
        orderInfo: {
          name: 'テストユーザ9',
        },
        status: 9,
      },
    });
    let modalWrapper = newWrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('キャンセル');
  });
  it('filter statusが上記以外の時は確認中と表示する', () => {
    const newWrapper = shallowMount(orderModal, {
      propsData: {
        orderInfo: {
          name: 'テストユーザ9',
        },
        status: 8,
      },
    });
    let modalWrapper = newWrapper.get('[data-testid="paymentStatus"]');
    expect(modalWrapper.text()).toBe('確認中');
  });
});
//npm run test test/organisms/orderModal.spec.js
