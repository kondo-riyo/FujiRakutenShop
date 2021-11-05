import { shallowMount } from '@vue/test-utils';
import rings from '../../components/morecules/rings.vue';

describe('Testing rings component', () => {
  const wrapper = shallowMount(rings, {
    propsData: {
      item: {
        img: 'imgimg',
      },
    },
  });
  it('ringsが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('propsが受け取れている', () => {
    expect(wrapper.vm.$props.item.img).toBe('imgimg');
  });
  it('emitによってselectRingが発火されている', () => {
    let ringWrapper = wrapper.find('ring-red-stub');
    ringWrapper.vm.$emit('selectRing');
    expect(ringWrapper.emitted('selectRing')).toBeTruthy();
  });
});
