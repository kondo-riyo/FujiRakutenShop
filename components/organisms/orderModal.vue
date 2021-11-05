<template>
  <div>
    <div id="overlay" @click.self="$emit('close')">
      <div id="content" class="sm:w-1/2">
        <p
          class="bg-base_gray rounded-full text-center w-7"
          @click="$emit('close')"
        >
          ×
        </p>
        <div class="sm:m-3">
          <div class="sm:flex text-left mx-4 sm:m-4">
            <div class="sm:w-2/5 text-base_gray sm:px-10">注文者</div>
            <div class="sm:w-3/5">{{ orderInfo.name }} さん</div>
          </div>
          <div class="text-left mx-4 sm:m-4 sm:flex">
            <div class="sm:w-2/5 text-base_gray sm:px-10">お届け先</div>
            <div class="sm:w-3/5">{{ orderInfo.address }}</div>
          </div>
          <div class="sm:flex text-left mx-4 sm:m-4">
            <div class="sm:w-2/5 text-base_gray sm:px-10">電話番号</div>
            <div class="sm:w-3/5">{{ orderInfo.tel }}</div>
          </div>
          <div class="sm:flex text-left mx-4 sm:m-4">
            <div class="sm:w-2/5 text-base_gray sm:px-10">メール</div>
            <div class="sm:w-3/5">{{ orderInfo.email }}</div>
          </div>
          <div class="sm:flex text-left mx-4 sm:m-4">
            <div class="sm:w-2/5 text-base_gray sm:px-10">配達日時</div>
            <div class="sm:w-3/5">
              {{ orderInfo.deliveryDate }} {{ orderInfo.deliveryTime }}時
            </div>
          </div>
          <div class="sm:flex text-left mx-4 sm:m-4">
            <div class="sm:w-2/5 text-base_gray sm:px-10">支払状況</div>
            <div data-testid="paymentStatus" class="sm:w-3/5">
              {{ status | paymentStatus }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = {
  showContent: boolean;
};
export default Vue.extend({
  props: ['orderInfo', 'status'],
  data(): DataType {
    return {
      showContent: false,
    };
  },
  filters: {
    paymentStatus(
      status: number
    ): '未入金' | '入金済' | '発送済' | '配達済' | 'キャンセル' | '確認中' {
      if (status === 1) {
        return '未入金';
      } else if (status === 2) {
        return '入金済';
      } else if (status === 3) {
        return '発送済';
      } else if (status === 4) {
        return '配達済';
      } else if (status === 9) {
        return 'キャンセル';
      } else {
        return '確認中'
      }
    },
  },
});
</script>

<style scoped>
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.042);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 2;
  /* width: 50%; */
  padding: 1em;
  background: rgba(248, 248, 248, 0.2);
  border-radius: 30px;
  border-color: rgba(153, 134, 117, 0.26);
  border-width: 4px;
  box-shadow: 20px;
}
</style>
