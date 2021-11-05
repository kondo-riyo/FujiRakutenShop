import { shallowMount } from '@vue/test-utils';
import inputA from '../../../components/atoms/input/inputA.vue';
// @ts-ignore
describe('Testing inputSearch component', () => {
  let inputWrapper;
  beforeAll(() => {
    // 子コンポーネントのマウントを行わないマウント
    const wrapper = shallowMount(inputA, {
      // propsプロパティの設定
      propsData: {
        name: 'name',
        type: 'type',
        placeholder: 'placehlder',
      },
    });
    inputWrapper = wrapper.find('input');
  });

  it('inputAが存在する', () => {
    expect(inputWrapper.exists()).toBeTruthy();
  });
  it('inputイベントが発火する', () => {
     inputWrapper.find('input').trigger('input');
  });
});
