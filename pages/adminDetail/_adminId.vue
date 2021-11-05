<template>
   <div class="p-1">
    <div 
    @click="back_onStep"
    class="
    flex
    items-center
    group
    m-1
    ">
      <div class="
      bg-base_aka bg-opacity-30 sm:bg-transparent
      sm:group-hover:bg-base_aka sm:group-hover:bg-opacity-30
      p-3 sm:p-4
      rounded-full
      ">
        <img src="~assets/img/yajirusi_icon.webp" class="transform rotate-90 w-3 sm:w-5">
      </div>
      <div class="text-base_aka text-opacity-80 text-sm sm:text-base font-bold m-3 mx-1">
        ユーザー情報一覧に戻る
      </div>
    </div>
    <div class="grid justify-items-center">
    <div>
      <!-- <div>
      <select
       @change="displaySelect"
       v-model="selectStatus"
       name="表示status"
       class="
        bg-base_red hover:bg-opacity-70
        text-white text-center
        rounded-lg
        p-3
        m-1
       "
       >
               <option value="0"> ALL </option>
               <option value="1">未入金(代引き)</option>
               <option value="2">入金済(クレジット)</option>
               <option value="3">発送済</option>
               <option value="4">配達済</option>
               <option value="9">キャンセル</option>               
      </select>
    </div>
    <div 
     v-if="!this.newlogItems.length"
     class="text-base_red font-bold border-b-2 border-base_gray text-lg pt-6"
    >
      {{this.statusName}}商品はありません
    </div> -->
    <div
      class="grid justify-items-center"
    >
      <div class="bg-white bg-opacity-60 rounded-xl w-screen lg:w-1000">
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
            text-center
          "
        >
          <div class="p-1 lg:w-3/5 lg:text-center text-2xl">
            商品情報
          </div>
          <div class="p-1 lg:w-1/5 text-2xl hidden lg:inline-block">
            配達情報
          </div>
          <div class="p-1 lg:w-1/5 text-2xl hidden lg:inline-block">
          </div>
        </div>
        <div
          v-for="logItem in getLogItems"
          :key="logItem.orderId"
          class="
            lg:flex
            border-solid
            rounded
            border-b-2 border-r-2 border-l-2
            border-base_red
          "

        > 
        <!--   1. アイテム情報 -->
          <div 
           class="p-1 lg:w-3/5" >
            <div
              v-for="item in logItem.itemInfo"
              :key="item.specialId"
              class="m-1 p-0"
            >
              <div 
                class="
                  flex
                  items-center
                  lg:w-auto
                  w-screen
                  justify-center
              ">
                <div class="lg:w-1/4 w-2/5">
                  <img class="rounded shadow-xl" :src="item.itemImg" />
                </div>
                <div class="flex flex-col ml-1 w-96 w-3/5 lg:w-3/4">
                  <div class="p-0 flex">
                    <div class="w-3/4 truncate">
                      <span class="font-bold lg:text-xl">{{
                        item.itemName
                      }}</span
                      >×{{ item.itemNum }}
                    </div>
                    <div class="w-1/4 lg:text-base text-xs">
                      {{ item.itemPrice * item.itemNum }}円
                    </div>
                  </div>
                  <div
                    class="p-1 lg:text-base text-xs flex"
                    v-for="(topping, index) in item.toppings"
                    :key="index"
                  >
                    <div class="w-3/4">+{{ topping.name }}</div>
                    <div class="w-1/4 lg:text-base text-xs">
                      {{ topping.price }}円
                    </div>
                  </div>
                  <div class="p-1 pt-5 flex">
                    <div class="w-3/4 lg:text-base text-xs">合計</div>
                    <div class="w-1/4 lg:text-base text-xs">
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
                py-3
              "
            >
              <div class="w-16"></div>
              <div class="lg:text-2xl text-lg lg:pr-0 pr-2 lg:w-2/6">
                合計金額
              </div>
              <div class="lg:text-3xl text-xl font-bold">
                {{ logItem.orderInfo.allPrice }}円
              </div>
            </div>
         </div>
        <!-- 1. お客様情報 -->
         <div
            class="
              w-80
              bg-base_gray
              bg-opacity-20
              text-lg
              flex flex-col
              justify-center
              items-center
              pl-2
              pb-3
              lg:w-1/5
              w-full
            "
          >
            <div>
              <div
                class="
                  lg:hidden
                  text-xl
                  border-solid
                  border-base_red
                  border-b-2 border-opacity-20
                  pt-2
                  pb-1
                  mb-2
                "
              >
                配達情報
              </div>
              <div>注文者 : {{ logItem.orderInfo.name}} 様</div>
              <div>配送先 : {{ logItem.orderInfo.address }}</div>
              <div>
                配送日時 : {{ logItem.orderInfo.deliveryDate }}
                {{ logItem.orderInfo.deliveryTime }}時
              </div>
            </div>
          </div>
          <!-- 1. 配達情報 -->
          <div
            class="
              w-80
              bg-base_gray bg-opacity-20 lg:bg-transparent
              border-base_red border-opacity-20 border-dashed border-t-2 lg:border-0
              text-lg
              flex flex-col
              justify-center
              items-center
              pl-2
              py-3
              lg:w-1/5
              w-full
            "
          >
            <div>
              <select
                v-model="logItem.status"
                @change="statusChange(logItem.orderId, logItem.status, params)"
                name="配達status"
                class="p-1 bg-base_red text-white text-center rounded"
                data-testid="statusChange"
              >
                <option value=1>未入金(代引き)</option>
                <option value=2>入金済</option>
                <option value=3>発送済</option>
                <option value=4>配達済</option>
                <option value=9>キャンセル</option>
              </select>
            </div>
          </div>
        </div>
        </div>

          <!-- 1. 終わり -->

      </div>
    </div>
    </div>
    <div 
    @click="back_onStep"
    class="
    flex
    items-center
    group
    m-1
    ">
      <div class="
      bg-base_aka bg-opacity-30 sm:bg-transparent
      sm:group-hover:bg-base_aka sm:group-hover:bg-opacity-30
      p-3 sm:p-4
      rounded-full
      ">
        <img src="~assets/img/yajirusi_icon.webp" class="transform rotate-90 w-3 sm:w-5">
      </div>
      <div class="text-base_aka text-opacity-80 text-sm sm:text-base font-bold m-3 mx-1">
        ユーザー情報一覧に戻る
      </div>
    </div>
   </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { AdminStore } from '../../store';
import { orderItemType } from '../../types/cartItemType';

type DataType = {
  selectStatus: number;
  statusName: string;
  newlogItems: any;
  params: string;
  options:[
    {label: string, value: number},
    {label: string, value: number},
    {label: string, value: number},
    {label: string, value: number},
    {label: string, value: number},
  ]
};
type headType = {
  title: string;
};

export default Vue.extend({
  head(): headType {
    return {
      title: '注文履歴',
    };
  },
  data(): DataType {
    return {
      selectStatus: 0,
      statusName: '',
      newlogItems: [],
      params: '',
      options:[
        {label: '未入金(代引き)', value: 1},
        {label: '入金済', value: 2},
        {label: '発送済', value: 3},
        {label: '配達済', value: 4},
        {label: 'キャンセル', value: 9}
      ]
    };
  },
  computed: {
    getLogItems(): orderItemType[] {
    // getLogItems():void{
      return  AdminStore.getstoreLogItems
      //@ts-ignore
      // return this.displaySelect
    },
  },
  async fetch(): Promise<void> {
      this.params = String(this.$route.params.adminId);
      await AdminStore.fetchLogItemsAct(this.params);
  },  
  methods:{
      // statusを変えるためのStore呼び出し
      statusChange(id:string, status:number, uid:string):void{
          let idStatus= {id:id, status:Number(status), uid:uid}
          AdminStore.updateStatusAct(idStatus)
      },
      back_onStep(): void {
        this.$router.push('/admin')
      },
      selectToStatus(value: any) {
        this.selectStatus = value
        console.log('selectToStatus'+this.selectStatus)
      },
      // displaySelect(): any[]|undefined{
      //   console.log(this.selectStatus)
      //   if(this.selectStatus === 0){
      //     this.statusName = '注文済みの'
      //     return this.newlogItems = AdminStore.getstoreLogItems
      //   } else {
      //     if(this.selectStatus === 1){
      //       this.statusName = '未入金(代引き)の'
      //     }else if(this.selectStatus === 2){
      //       this.statusName = '入金済(クレジット)の'
      //     }else if(this.selectStatus === 3){
      //       this.statusName = '発送済の'
      //     }else if(this.selectStatus === 4){
      //       this.statusName = '配達済の'
      //     }else if(this.selectStatus === 9){
      //       this.statusName = '注文をキャンセルした'
      //     }
      //     //@ts-ignore
      //     // this.newlogItems = this.getLogItems.filter((e:any) => e.status = this.selectStatus)
      //     this.newlogItems = AdminStore.getstoreLogItems.filter((e:any) => this.selectStatus = e.status )
      //     // return this.newlogItems
      //   }
      // }
  }
});
</script>
