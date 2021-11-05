import { shallowMount } from '@vue/test-utils';
import ringPurple from '../../../components/atoms/ring/ringPurple.vue';

describe('Testing ringPurple component', () => {
  let ringPurpleWrapper;

  const wrapper = shallowMount(ringPurple, {
    // propsプロパティの設定
    propsData: {
      item: {
        imgPurple: 'redred',
      },
    },
  });
  ringPurpleWrapper = wrapper.find('div');

  it('ringPurpleが存在する', () => {
    expect(ringPurpleWrapper.exists()).toBeTruthy();
  });
  it('clickイベントが発火する', async () => {
    await ringPurpleWrapper.find('div').trigger('click');
  });
  it('emitによってclick(selectRing)が発火されている', () => {
    ringPurpleWrapper.get('div').trigger('click');
    expect(ringPurpleWrapper.emitted('selectRing')).toBeTruthy();
  });
  it('propsが受け取れている', () => {
    expect(ringPurpleWrapper.vm.$props.item.imgPurple).toBe('redred');
  });
});
