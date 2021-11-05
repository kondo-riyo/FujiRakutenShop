import { shallowMount } from '@vue/test-utils';
import disableButton from '../../../components/atoms/button/disableButton.vue'

describe('Testing disapleButton component', () => {
    it('disableButtonが存在する', () => {
      const wrapper = shallowMount(disableButton)
      expect(wrapper.exists()).toBeTruthy()
    })

    it('slotにコンテンツが挿入できている',()=>{
      const wrapper = shallowMount(disableButton, {
        slots: {
          default: '<div data-test="slotContent">slotの内容です</div>',
        },  
      });
      const slotContent = wrapper.find('[data-test="slotContent"]');
      expect(slotContent.exists()).toBe(true);
      expect(slotContent.text()).toBe('slotの内容です');
    })
})

