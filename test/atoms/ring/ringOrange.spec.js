import { shallowMount } from '@vue/test-utils';
import ringOrange from '../../../components/atoms/ring/ringOrange.vue';

describe('Testing ringOrange component', () => {
  let ringOrangeWrapper;

  const wrapper = shallowMount(ringOrange, {
    // propsプロパティの設定
    propsData: {
      item: {
        imgOrange: 'redred',
      },
    },
  });
  ringOrangeWrapper = wrapper.find('div');

  it('ringOrangeが存在する', () => {
    expect(ringOrangeWrapper.exists()).toBeTruthy();
  });
  it('clickイベントが発火する', async () => {
    await ringOrangeWrapper.find('div').trigger('click');
  });
  it('emitによってclick(selectRing)が発火されている', () => {
    ringOrangeWrapper.get('div').trigger('click');
    expect(ringOrangeWrapper.emitted('selectRing')).toBeTruthy();
  });
  it('propsが受け取れている', () => {
    expect(ringOrangeWrapper.vm.$props.item.imgOrange).toBe('redred');
  });
});
