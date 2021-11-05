import { mount, createLocalVue } from '@vue/test-utils';
import Signup from '../../pages/signup.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMeta from 'vue-meta';
import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';
import { config } from '@vue/test-utils';

config.showDeprecationWarnings = false;
const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMeta, { keyName: 'head' });
describe('Testing Signup component', () => {
  let wrapper;
  let store;

  beforeAll(() => {
    initialiseStores(createStore());
    let Stubs = ['roundBottun', 'inputA'];
    store = new Vuex.Store();
    wrapper = mount(Signup, {
      stubs: Stubs,
      localVue,
      router,
      store,
      data() {
        return {
          isChecked: true,
          userInfo: {
            name: 'namae',
            postalCode: '1660003',
            addRess: '',
          },
        };
      },
    });
  });
  it('Signup.vueが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('会員登録');
  });
  it('cickでイベント(onClick)が発火する', async () => {
    let cancelWrapper = wrapper.get('[data-testid="onClick"]');
    cancelWrapper.trigger('click');
    expect(cancelWrapper.trigger('onClick')).toBeTruthy();
  });
  it('@inputでイベント(inputName)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputName"]');
    userInfoWrapper.vm.$emit('input');
    expect(userInfoWrapper.trigger('inputName')).toBeTruthy();
  });
  it('@inputでイベント(inputTel)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputTel"]');
    userInfoWrapper.vm.$emit('input');
    expect(userInfoWrapper.trigger('inputTel')).toBeTruthy();
  });
  it('@inputでイベント(inputPassword)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputPassword"]');
    userInfoWrapper.vm.$emit('input');
    expect(userInfoWrapper.trigger('inputPassword')).toBeTruthy();
  });
  it('@inputでイベント(inputMail)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputMail"]');
    userInfoWrapper.vm.$emit('input');
    expect(userInfoWrapper.trigger('inputMail')).toBeTruthy();
  });
  it('@inputでイベント(inputPostalcode)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputPostalcode"]');
    userInfoWrapper.vm.$emit('input');
    expect(userInfoWrapper.trigger('inputPostalcode')).toBeTruthy();
  });
  it('@inputでイベント(inputAddress)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputAddress"]');
    userInfoWrapper.vm.$emit('input');
    expect(userInfoWrapper.trigger('inputAddress')).toBeTruthy();
  });
  it('@inputでイベント(inputAddress)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="inputAddress"]');
    userInfoWrapper.vm.$emit('input');
    expect(userInfoWrapper.trigger('inputAddress')).toBeTruthy();
  });
  it('@clickでイベント(yubinbango)が発火する', async () => {
    wrapper.setMethods({ yubinango: jest.fn() })
    let userInfoWrapper = wrapper.find('[data-testid="yubinbango"]');
    userInfoWrapper.vm.$emit('click');
    expect(userInfoWrapper.trigger('yubinbango')).toBeTruthy();
  });
  it('@clickでイベント(signup)が発火する', async () => {
    let userInfoWrapper = wrapper.find('[data-testid="signup"]');
    userInfoWrapper.vm.$emit('click');
    expect(userInfoWrapper.trigger('signup')).toBeTruthy();
  });
});
