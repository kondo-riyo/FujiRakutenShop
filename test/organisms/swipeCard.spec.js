import { shallowMount, createLocalVue } from '@vue/test-utils';
import swipeCard from '../../components/organisms/swipeCard.vue';
import VueRouter from 'vue-router';

// router-linkを読み込むため、仮のrouterを作成
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Testing swipeCard component', () => {
  const wrapper = shallowMount(swipeCard, {
    propsData: {
      swipeItem: {
        img: 'imgimg',
        id: '123',
        name: 'アイテム',
        price: 500,
        rank: 1,
      },
      routerName: '',
    },
    localVue,
    router,
  });
  it('swipeCardが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('emitによってinputKeyWordが発火されている', () => {
    let ringWrapper = wrapper.find('rings-stub');
    ringWrapper.vm.$emit('selectRing');
    expect(ringWrapper.trigger('changeImg')).toBeTruthy();
  });
});
