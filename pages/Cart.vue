<template>
  <div>
  <CartTable :cartItemFromStore="cartItemFromStoreComp[0]" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CartStore } from '../store';
import { orderItemType } from '../types/cartItemType';
type headType = {
title: string;
};
type DataType = {
cartItemFromStore: orderItemType[];
};
export default Vue.extend({
head(): headType {
return {
title: 'カート',
};
},
// async fetch(): Promise<void> {
//   // if (!this.moniterCarts.orderId) {
//     console.log('asyncfetch()()()))')
//   await CartStore.fetchitemInfoAct();
//   //await Promise.all([fetchitemInfo]);
//   // }
// },

data(): DataType {
return { cartItemFromStore: CartStore.getitemInfo };
},
async asyncData(){
await CartStore.fetchitemInfoAct()
return { getitemInfo: CartStore.getitemInfo };
},
computed: {
cartItemFromStoreComp() {
return CartStore.getitemInfo;
},
},
});
</script>
