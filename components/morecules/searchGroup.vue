<template>
  <div class="flex items-center container mx-6 sm:mt-0">
    <input-search @input="inputKeyWord"/>
    <search-logo @search="search" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import inputSearch from "../atoms/input/inputSearch.vue"
import searchLogo from "../atoms/logo/searchLogo.vue"

type DataType = {
  keyword: string
};

export default Vue.extend({
  components:{
    inputSearch,
    searchLogo
  },
  data(): DataType{
    return{
      keyword:''
    }
  },
  methods: {
    search(): void {
      this.$emit('searchItems',this.keyword);
    },

    inputKeyWord(keyWord:string):void{
      this.keyword = keyWord;
    },
  },

});
</script>
