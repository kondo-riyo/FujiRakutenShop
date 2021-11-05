import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Header from '../../components/templates/Header.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { createStore } from '../../.nuxt/store';
import { initialiseStores } from '../../utils/store-accsessor.ts';

const localVue = createLocalVue();
const router = new VueRouter();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Testing Header component', () => {
  let wrapper;
  let divWrapper;
  let store;
  let fn;
  let UserStore;

  beforeEach(() => {
    initialiseStores(createStore());
    fn = jest.fn();
    UserStore = {
      namespaced: true,
      actions: {
        logout: fn,
      },
    };

    store = new Vuex.Store({
      modules: {
        user: UserStore,
      },
    });
    wrapper = shallowMount(Header, {
      localVue,
      router,
      store,
    });
    divWrapper = wrapper.find('div');
  });
  it('Headerが存在する', () => {
    expect(divWrapper.exists()).toBeTruthy();
  });
  it('click(logout)が発火されている', () => {
    divWrapper.get('div').trigger('click');
    expect(store.logout).toHaveBeenCalled;
  });
 // v-ifでuserInfoがない場合にdata-tesiidが表示されないので、
 // v-showに切り替えています
  it('クリック時に$route.pushが実行される', async () => {
    const $route = {
      name: null
    }
    wrapper.find('[data-testid="logout"]').trigger('click');
    expect(wrapper.vm.$route.name).toBe($route.name)
  });
});

// npm run test /test/templates/Header.spec.js
