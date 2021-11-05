import { shallowMount } from '@vue/test-utils';
import searchGroup from '../../components/morecules/searchGroup.vue';
import { config } from '@vue/test-utils'

config.showDeprecationWarnings = false
describe('Testing searchGroup component', () => {
  const wrapper = shallowMount(searchGroup,{
      data(){
          return {
              keyword:"キーワード"
          }
      }
  });
  it('searchGroupが存在する', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
it('emitによってsearchが発火されている', () => {
    let ringWrapper = wrapper.find('search-logo-stub');
    ringWrapper.vm.$emit('search');
    expect(ringWrapper.emitted('search')).toBeTruthy();
  });
  it('emitによってinputKeyWordが発火されている', () => {
    let ringWrapper = wrapper.find('input-search-stub');
      ringWrapper.vm.$emit('input');
   expect(ringWrapper.trigger('inputKeyWord')).toBeTruthy();
  });
});
