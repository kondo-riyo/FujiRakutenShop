import { shallowMount, createLocalVue } from '@vue/test-utils';
import card from '../../components/organisms/card.vue';
import VueRouter from 'vue-router';

// router-linkを読み込むため、仮のrouterを作成
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Testing card component', () => {
  const wrapper = shallowMount(card, {
    propsData: {
      item: {
        img: 'imgimg',
        id: '123',
        name: 'アイテム',
        price: 500,
      },
      routerName:"",
    },
    localVue,
    router
  });
  it('cardが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('emitによってchangeimgが発火されている', () => {
    let ringWrapper = wrapper.find('rings-stub');
    ringWrapper.vm.$emit('selectRing');
    expect(ringWrapper.trigger('changeImg')).toBeTruthy();
  });
});
