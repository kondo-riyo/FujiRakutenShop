import { shallowMount } from '@vue/test-utils';
import ringBrown from '../../../components/atoms/ring/ringBrown.vue';

describe('Testing ringBrown component', () => {
  let ringBrownWrapper;

  const wrapper = shallowMount(ringBrown, {
    // propsプロパティの設定
    propsData: {
      item: {
        imgBrown: 'redred',
      },
    },
  });
  ringBrownWrapper = wrapper.find('div');

  it('ringBrownが存在する', () => {
    expect(ringBrownWrapper.exists()).toBeTruthy();
  });
  it('clickイベントが発火する', async () => {
    await ringBrownWrapper.find('div').trigger('click');
  });
  it('emitによってclick(selectRing)が発火されている', () => {
    ringBrownWrapper.get('div').trigger('click');
    expect(ringBrownWrapper.emitted('selectRing')).toBeTruthy();
  });
  it('propsが受け取れている', () => {
    expect(ringBrownWrapper.vm.$props.item.imgBrown).toBe('redred');
  });
});
