import { shallowMount } from '@vue/test-utils';
import inputSearch from '../../../components/atoms/input/inputSearch.vue';

describe('Testing inputSearch component', () => {
  const wrapper = shallowMount(inputSearch);

  it('inputSearchが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('inputイベントが発火する', async () => {
    await wrapper.find('input').trigger('input');
  });
});
