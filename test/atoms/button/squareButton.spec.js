import { shallowMount } from '@vue/test-utils';
import squareBottun from '../../../components/atoms/button/squareBottun.vue';

describe('Testing disapleButton component', () => {
  const wrapper = shallowMount(squareBottun);
  it('squareBottunが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('clickイベントが発火する', async () => {
    await wrapper.find('button').trigger('click');
  });
  it('emitによってclickが発火されている',()=>{
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  });
  it('slotにコンテンツが挿入できている', () => {
    const wrapper = shallowMount(squareBottun, {
      slots: {
        default: '<div data-test="slotContent">slotの内容です</div>',
      },
    });
    const slotContent = wrapper.find('[data-test="slotContent"]');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('slotの内容です');
  });
});