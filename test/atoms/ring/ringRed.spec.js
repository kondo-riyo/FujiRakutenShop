import { shallowMount } from '@vue/test-utils';
import ringRed from '../../../components/atoms/ring/ringRed.vue';

describe('Testing ringRed component', () => {
  let ringRedWrapper;

  const wrapper = shallowMount(ringRed, {
    // propsプロパティの設定
    propsData: {
      item: {
        imgRed: 'redred',
      },
    },
  });
  ringRedWrapper = wrapper.find('div');

  it('ringRedが存在する', () => {
    expect(ringRedWrapper.exists()).toBeTruthy();
  });
  it('clickイベントが発火する', async () => {
    await ringRedWrapper.find('div').trigger('click');
  });
  it('emitによってclick(selectRing)が発火されている', () => {
    ringRedWrapper.get('div').trigger('click');
    expect(ringRedWrapper.emitted('selectRing')).toBeTruthy();
  });
  it('propsが受け取れている', () => {
    expect(ringRedWrapper.vm.$props.item.imgRed).toBe('redred');
  });
});
