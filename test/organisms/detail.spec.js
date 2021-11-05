import { shallowMount } from '@vue/test-utils';
import detail from '../../components/organisms/detail.vue';

describe('Testing detail component', () => {
  const wrapper = shallowMount(detail, {
    propsData: {
      itemDetail: {
        img: 'imgimg',
        description: '商品説明',
        name: 'アイテム',
        price: 500,
      },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }, 
  });
  it('detailが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('selectタグで@changeが発火されている', () => {
    wrapper.find('select').trigger('change');
  });
  it('emitによってchangeimgが発火されている', () => {
    let ringWrapper = wrapper.find('rings-stub');
    ringWrapper.vm.$emit('selectRing');
    expect(ringWrapper.trigger('changeImg')).toBeTruthy();
  });
  
});
