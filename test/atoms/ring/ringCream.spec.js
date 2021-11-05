import { shallowMount } from '@vue/test-utils';
import ringCream from '../../../components/atoms/ring/ringCream.vue';

describe('Testing ringCream component', () => {
  let ringCreamWrapper;

  const wrapper = shallowMount(ringCream, {
    // propsプロパティの設定
    propsData: {
      item: {
        imgCream: 'redred',
      },
    },
  });
  ringCreamWrapper = wrapper.find('div');

  it('ringCreamが存在する', () => {
    expect(ringCreamWrapper.exists()).toBeTruthy();
  });
  it('clickイベントが発火する', async () => {
    await ringCreamWrapper.find('div').trigger('click');
  });
  it('emitによってclick(selectRing)が発火されている', () => {
    ringCreamWrapper.get('div').trigger('click');
    expect(ringCreamWrapper.emitted('selectRing')).toBeTruthy();
  });
  it('propsが受け取れている', () => {
    expect(ringCreamWrapper.vm.$props.item.imgCream).toBe('redred');
  });
});
