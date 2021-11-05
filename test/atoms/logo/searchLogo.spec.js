import { shallowMount } from '@vue/test-utils';
import searchLogo from '../../../components/atoms/logo/searchLogo.vue';
// @ts-ignore
describe('Testing searchLogo component', () => {
  const wrapper = shallowMount(searchLogo);

  it('searchLogoが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('clickイベントが発火する', async () => {
    await wrapper.find('img').trigger('click');
  });
  it('emitによってclick(search)が発火されている', () => {
    wrapper.get('img').trigger('click');
    expect(wrapper.emitted('search')).toBeTruthy();
  });
});
