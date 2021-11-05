<template>
  <div class="sm:flex my-0 mx-auto">
    <div class="flex flex-col">
      <div class="sm:mr-5 my-0 mx-auto">
        <img :src="itemDetail.img" class="rounded-xl w-72 h-72" />
      </div>

      <rings @selectRing="changeImg" :item="itemDetail" />
    </div>
    <div
      class="
        flex flex-col
        justify-center
        bg-white
        p-3
        sm:p-5
        rounded-xl
        sm:w-3/4
        w-80
      "
    >
      <div>
        <p
          class="text-gray-700 text-2xl sm:text-3xl font-semibold sm:font-bold"
        >
          {{ itemDetail.name }}
        </p>
      </div>
      <div class="mt-5">
        <p>
          <span class="text-xl sm:text-3xl">￥{{ itemDetail.price }}</span>
          税込
        </p>
      </div>
      <div>
        <p class="block my-2 sm:my-4 sm:text-xl">
          {{ itemDetail.description }}
        </p>
      </div>

      <div class="flex">
        <div class="flex items-center">
          <span class="mr-3">
            <font style="vertical-align: inherit">
              <font style="vertical-align: inherit">個数</font>
            </font>
          </span>
          <div class="relative">
            <select
              class="
                rounded
                border
                appearance-none
                border-gray-300
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-base_orange
                focus:border-base_orange
                text-base
                pl-3
                pr-10
              "
              @change="updateValue"
            >
              <option v-for="(num, index) in options" :key="index" :value="num">
                {{ num }}
              </option>
            </select>
            <span
              class="
                absolute
                right-0
                top-0
                h-full
                text-center text-gray-600
                pointer-events-none
                flex
                w-4
                items-center
                justify-center
              "
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import rings from '../morecules/rings.vue';
type DataType = {
  selectedItemNum: number;
};
export default Vue.extend({
  components: { rings },
  data(): DataType {
    return {
      selectedItemNum: 1,
    };
  },
  props: ['itemDetail', 'options'],
  methods: {
    updateValue(e: string): void {
      //@ts-ignore
      this.$emit('input', e.target.value);
    },
    changeImg(img: string): void {
      this.itemDetail.img = img;
    },
  },
  created() {
    this.$emit('input', 1);
  },
});
</script>
