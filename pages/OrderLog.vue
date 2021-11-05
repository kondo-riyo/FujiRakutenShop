<template>
  <div class="pt-2">
    <div v-if="getOrderLogs.length === 0" class="grid p-20">
      <div class="mr-auto ml-auto font-bold sm:text-2xl text-lg">
        ※注文履歴はありません
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
      class="grid sm:m-5 m-1 justify-items-center"
      v-if="getOrderLogs.length > 0"
    >
      <div class="bg-white bg-opacity-60 rounded-xl sm:w-auto w-screen">
        <div
          class="
            bg-base_red
            text-base_cream
            font-bold
            text-xl
            rounded
            border-solid border-2
            border-base_red
            flex
          "
        >
          <div class="p-1 sm:w-3/4 w-screen sm:text-center text-2xl">
            商品情報
          </div>
          <div class="p-1 sm:w-1/4 text-2xl hidden sm:inline-block">
            配達情報
          </div>
        </div>
        <div
          v-for="logItem in getOrderLogs"
          :key="logItem.orderId"
          class="
            sm:flex
            border-solid
            rounded
            border-b-2 border-r-2 border-l-2
            border-base_red
          "
        >
          <div class="p-2 sm:w-600">
            <div
              v-for="item in logItem.itemInfo"
              :key="item.specialId"
              class="m-1 p-1"
            >
              <!-- アイテム情報 -->
              <div
                class="
                  flex
                  items-center
                  sm:w-auto
                  w-screen
                  justify-center
                  sm:h-64
                "
              >
                <div class="sm:w-1/4 w-1/4">
                  <img class="rounded shadow-xl" :src="item.itemImg" />
                </div>
                <div class="flex flex-col ml-2 w-3/4 sm:w-96">
                  <div class="p-1 flex">
                    <div class="w-3/4 truncate">
                      <span class="font-bold sm:text-xl">{{
                        item.itemName
                      }}</span
                      >×{{ item.itemNum }}
                    </div>
                    <div class="w-1/4 sm:text-base text-xs">
                      {{ item.itemPrice * item.itemNum }}円
                    </div>
                  </div>
                  <div
                    class="p-1 sm:text-base text-xs flex"
                    v-for="(topping, index) in item.toppings"
                    :key="index"
                  >
                    <div class="w-3/4">+{{ topping.name }}</div>
                    <div class="w-1/4 sm:text-base text-xs">
                      {{ topping.price }}円
                    </div>
                  </div>
                  <div class="p-1 pt-5 flex">
                    <div class="w-3/4 sm:text-base text-xs">合計</div>
                    <div class="w-1/4 sm:text-base text-xs">
                      {{
                        item.itemPrice * item.itemNum + item.allToppingPrice
                      }}円
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                flex
                items-center
                border-solid border-t-2
                border-base_gray
                border-opacity-20
                mt-3
                pt-3
                pb-3
              "
            >
              <div class="w-16"></div>
              <div class="sm:text-2xl text-xl sm:pr-0 pr-2 sm:w-2/6">
                合計金額
              </div>
              <div class="sm:text-3xl text-xl font-bold w-1/4">
                {{ logItem.orderInfo.allPrice }}円
              </div>
            </div>
          </div>
          <div
            class="
              sm:bg-base_gray
              sm:bg-opacity-20
              flex
              sm:flex-col
              justify-center
              items-center
              px-1
              py-3
              sm:w-1/3
              w-full
            "
          >
            <square-bottun 
             class="sm:mr-0 text-base sm:text-lg" 
             @click="openModal(logItem)"
            >
              配送情報確認
            </square-bottun>
            <div>
              <order-modal
                :status="mordalStatus"
                :orderInfo="mordalOrderInfo"
                v-show="showContent"
                @close="closeModal"
              ></order-modal>

              <div class="sm:mt-2 ml-1 sm:ml-0">
                <square-bottun
                  class="block text-base sm:text-lg"
                  v-show="logItem.status === 1"
                  @click="cancelOrder(logItem)"
                  data-testid="cancelOrder"
                  >注文キャンセル</square-bottun
                >
                <disableButton class="block text-base sm:text-lg" v-show="logItem.status === 9"
                  >キャンセル済み</disableButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { CartStore } from '../store';
import { orderedItemType, orderItemType } from '../types/cartItemType';
import disableButton from  '../components/atoms/button/disableButton.vue'
import squareBottun from '../components/atoms/button/squareBottun.vue'
import orderModal from '../components/organisms/orderModal.vue' 

type DataType = {
      showContent: boolean,
      mordalOrderInfo: string,
      mordalStatus: number,
}
type headType = {
  title: string;
};

export default Vue.extend({
  head(): headType {
    return {
      title: '注文履歴',
    };
  },
  components:{disableButton,squareBottun,orderModal},
  data(): DataType {
    return {
      showContent: false,
      mordalOrderInfo: '',
      mordalStatus: 1,
    };
  },
  computed: {
    getOrderLogs(): orderItemType[] {
      return CartStore.getOrderLog;
    },
  },
  async fetch(): Promise<void> {
      await CartStore.fetchOrderLogAct();
   },
  methods: {
    cancelOrder(logItem: orderedItemType): void {
      CartStore.cancelOrderAct(logItem);
    },
    openModal(logItem: any): void {
      this.showContent = true;
      this.mordalOrderInfo = logItem.orderInfo;
      this.mordalStatus = logItem.status;
    },
    closeModal(): void {
      this.showContent = false;
    },
  },
});
</script>
