<template>
  <div class="">
    <div>
      <div 
       class="
        flex 
        w-full justify-center items-center 
        text-base_brown mt-4 -mb-2 text-center text-xl sm:text-2xl font-bold
      ">
      <div><img src="~/assets/img/fujicoffee.webp" class="w-12"/></div>
      <div class="pt-2">FujiCoffeeオリジナル商品</div>
      </div>
    </div>
    <search-group data-testid="search" @searchItems="search" class="my-0 mx-auto" />
    <div class="my-5 text-base_red font-bold">
      <div v-show="resultNullFlg" class="text-center">
        ※該当する商品がありません
      </div>
      <div v-show="keywordNullFlg" class="text-center">
        ※検索ワードを入力してください
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <div v-for="item in searchedItems" :key="item.id">
        <Card :item="item" :routerName="routerName.fujiShop" />
      </div>
    </div>

    <div
      class="flex flex-wrap justify-center"
      v-show="searchedItems.length === 0"
    >
      <div v-for="item in itemsFromStore" :key="item.id">
        <Card :item="item" :routerName="routerName.fujiShop" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { itemType } from '../types/itemType';
import { ItemsStore } from '../store';
import Card from '../components/organisms/card.vue';
import searchGroup from '../components/morecules/searchGroup.vue';
type DataType = {
  searchedItems: itemType[];
  keywordNullFlg: boolean;
  resultNullFlg: boolean;
  routerName: Object;
};
type headType = {
  title: string;
};

export default Vue.extend({
  head(): headType {
    return {
      title: 'FUJIオリジナル商品',
    };
  },
  components: { Card,searchGroup },
  data(): DataType {
    return {
      searchedItems: [],
      keywordNullFlg: false, // 検索ワード未入力の場合
      resultNullFlg: false, // 該当結果無しの場合
      routerName: {
        fujiShop: 'ItemDetail-itemId',
      },
    };
  },
  methods: {
    search(word: string): {keywordNullFlg: boolean; resultNullFlg:boolean;}|undefined {
      this.searchedItems = [];
      // 検索ワードなし
      if (word === '') {
        return {
          keywordNullFlg: true,
          resultNullFlg: false
        }
      } else {
        this.keywordNullFlg = false;
        this.resultNullFlg = false;
        this.itemsFromStore.forEach((item: itemType) => {
          if (item.name === undefined) return;

          // 該当結果あり
          if (item.name.indexOf(word) >= 0) {
            this.searchedItems.push(item);
          }
        });
        // 該当結果なし
        if (this.searchedItems.length === 0) {
          this.resultNullFlg = true;
        }
      }
    },
  },
  computed: {
    itemsFromStore(): itemType[] {
      return ItemsStore.getItems;
    },
  },
});
</script>
