<template>
  <div class="">
    <div v-if="!moniterCarts" class="grid p-20">
      <div class="mr-auto ml-auto font-bold sm:text-2xl text-lg">
        ※現在カートに商品はありません。
      </div>
    </div>

    <div v-if="moniterCarts">
      <div v-if="moniterCarts.itemInfo.length === 0" class="grid p-20">
        <div class="mr-auto ml-auto font-bold sm:text-2xl text-lg">
          ※現在カートに商品はありません
        </div>
        <button
          class="
            bg-base_red
            sm:w-1/3
            hover:bg-base_orange
            text-white
            font-bold
            py-2
            px-4
            rounded-full
            m-10
            mr-auto
            ml-auto
          "
        >
          <router-link to="/">商品を選ぶ</router-link>
        </button>
      </div>
      <div
        v-if="moniterCarts.itemInfo.length > 0"
        class="sm:p-4 p-2 grid justify-items-center"
      >
        <div class="mt-10 mb-10">
          <div class="div-auto shadow-xl rounded">
            <div
              class="
                bg-base_red
                flex
                sm:p-1
                rounded
                text-center
                text-base_cream
                sm:text-lg
                font-bold
              "
            >
              <div class="sm:w-6/12 w-5/12">商品情報</div>
              <div class="sm:w-2/12 w-2/12">
                価格<span class="hidden sm:inline">(税抜)</span
                ><span class="sm:hidden inline">(円)</span>
              </div>
              <div class="sm:w-1/12 w-2/12">個数</div>
              <div class="sm:w-2/12 w-2/12">
                合計<span class="hidden sm:inline">(税抜)</span
                ><span class="sm:hidden inline">(円)</span>
              </div>
              <div class="sm:w-1/12 w-1/12"></div>
            </div>
            <div
              class="
                bg-white
                border-solid
                rounded
                border-b-2 border-r-2 border-l-2
                border-base_red
              "
            >
              <div
                v-for="cartitem in moniterCarts.itemInfo"
                :key="cartitem.specialId"
                class="
                  flex
                  shadow-inner
                  text-center
                  hover:bg-base_cream hover:bg-opacity-50 hover:shadow
                  items-center
                  p-1
                "
              >
                <div class="sm:flex items-center sm:w-6/12 w-5/12">
                  <img class="rounded sm:w-1/3 w-2/3" :src="cartitem.itemImg" />
                  <div
                    class="sm:w-64 w-32 flex flex-col text-left sm:pl-5 sm:mb-5"
                  >
                    <div class="">
                      <p class="sm:text-2xl text-xs font-bold">
                        {{ cartitem.itemName }}
                      </p>
                    </div>
                    <div
                      data-testid="toppingSize"
                      v-for="topping in cartitem.toppings"
                      :key="topping.id"
                      class="sm:text-sm text-xs"
                    >
                      + {{ topping.name }} ({{ toppingSize(topping.size) }})
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:w-2/12 w-2/12">
                  <div class="sm:text-xl text-lg">
                    {{ cartitem.itemPrice
                    }}<span class="hidden sm:inline">円</span>
                  </div>
                  <div
                    v-for="topping in cartitem.toppings"
                    :key="topping.id"
                    class="sm:text-sm text-xs"
                  >
                    + {{ topping.price
                    }}<span class="hidden sm:inline">円</span>
                  </div>
                </div>
                <div class="sm:text-xl sm:w-1/12 w-2/12 text-lg">
                  {{ cartitem.itemNum }}<span class="hidden sm:inline">個</span>
                </div>
                <div class="sm:text-2xl sm:w-2/12 w-2/12 text-lg font-bold">
                  {{ cartitem.totalPrice
                  }}<span class="hidden sm:inline">円</span>
                </div>
                <div class="sm:w-1/12 w-1/12">
                  <button
                    title="商品を削除"
                    @click="deleteCartItem(cartitem.specialId)"
                    class="sm:w-1/2 w-3/4"
                    data-testid="show_cartItems"
                  >
                    <img src="~/assets/img/trash.webp" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <div class="text-2xl text-center">
            合計金額<span class="text-4xl sm:text-6xl font-bold">
              {{ allItemsPrice }}</span
            >円
          </div>
          <div class="mt-10 mb-3 mr-auto ml-auto">
            <button
              class="
                bg-base_red
                hover:bg-base_orange
                text-white
                font-bold
                py-2
                px-4
                rounded-full
              "
              v-show="moniterCarts.itemInfo.length > 0"
            >
              <router-link to="/OrderInfo"> 注文に進む </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CartStore } from '../../../store';
export default Vue.extend({
  props: {
    cartItemFromStore: {
      type: Object,
      required: true,
      default: () => ({
        itemInfo: [],
        status: 0,
      }),
    },
  },
  methods: {
    toppingSize(el: number): string {
      if (el === 1) {
        return '多';
      } else if (el === 2) {
        return '少';
      } else {
        return '';
      }
    },
    deleteCartItem(id: string): void {
      if (confirm('カートから商品を削除しますか？')) {
        CartStore.deleteCartItemAct(id);
      }
    },
  },
  computed: {
    allItemsPrice(): number {
      let price = 0;
      // @ts-ignore
      this.cartItemFromStore.itemInfo.forEach((item) => {
        price = price + item.totalPrice;
      });
      return price;
    },
    moniterCarts(): any {
      // @ts-ignore
      return this.cartItemFromStore;
    },
  },
});
</script>
