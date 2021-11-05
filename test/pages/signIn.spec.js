import { mount, createLocalVue } from '@vue/test-utils';
import Signin from '../../pages/signin.vue';
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
describe('Testing Signin component', () => {
  let wrapper;
  let store;
  let stubComponents = ['roundBottun', 'inputA'];
  beforeAll(() => {
    initialiseStores(createStore());

    store = new Vuex.Store();
    wrapper = mount(Signin, {
      localVue,
      router,
      store,
      stubs: stubComponents,
    });
  });
  it('Signinが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('headが存在する', () => {
    expect(wrapper.vm.$metaInfo.title).toBe('ログイン');
  });
  it('computedが正しい値(text)を返す', async () => {
    await wrapper.setData({ isChecked: true });
    expect(wrapper.vm.inputType).toBe('text');
  });
  it('computedが正しい値(passwprd)を返す', async () => {
    await wrapper.setData({ isChecked: false });
    expect(wrapper.vm.inputType).toBe('password');
  });
  it('cickでイベント(hidePassword)が発火し、処理が正しく動作する', async () => {
    let passWrapper = wrapper.get('[data-testid="hidePassword"]');
    wrapper.setData({ isChecked: false });
    await passWrapper.trigger('click');
    expect(wrapper.vm.isChecked).toBe(true);
  });
  it('@inputでイベント(inputMail)が発火する', async () => {
    let loginWrapper = wrapper.get('[data-testid="inputMail"]');
    loginWrapper.vm.$emit('input');
    expect(loginWrapper.trigger('inputMail')).toBeTruthy();
  });
  it('@inputでイベント(inputPassword)が発火する', async () => {
    let loginWrapper = wrapper.get('[data-testid="inputPassword"]');
    loginWrapper.vm.$emit('input');
    expect(loginWrapper.trigger('inputPassword')).toBeTruthy();
  });
});
// npm run test test/pages/signIn.spec.js
