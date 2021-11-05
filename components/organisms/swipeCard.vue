<template>
  <div
    class="
      flex
      sm:flex-col
      container
      p-0 sm:p-10
      max-w-xs
      overflow-hidden
      hover:shadow-xl
      transition
      duration-300
      max-w-xs
    "
  >
    <div
      class="
        max-w-sm
        bg-white
        px-6text-2xl
        ml-5
        pr-5
        pl-5
        font-bold
        text-gray-700
        pt-6
        pb-2
        rounded-sm
        shadow-lg
        transform
        hover:scale-105
        transition
        duration-500
        flex
        sm:flex-col
      "
    >
      <div class="relative w-1/2 my-0 mx-auto sm:w-full sm:mr-0 mr-2">
        <router-link
          :to="{
            name: `${routerName}`,
            params: { itemId: swipeItem.id },
          }"
        >
          <img
            class="w-36 h-36 sm:w-48 sm:h-48 rounded-sm"
            :src="swipeItem.img"
            alt="Colors"
          />
        </router-link>
        <p
          v-if="swipeItem.rank"
          class="
            absolute
            top-0
            bg-yellow-200
            text-gray-800
            font-semibold
            py-1
            px-3
          "
        >
          {{ swipeItem.rank }}位
        </p>
      </div>
      <div class="w-1/2 sm:w-full">
        <h1 class="mt-4 text-gray-800 sm:font-bold cursor-pointer truncate">
          {{ swipeItem.name }}
        </h1>
        <rings @selectRing="changeImg" :item="swipeItem" />
        <div class="my-4">
          <div class="flex space-x-1 items-center">
            <span>
              <img class="text-indigo-600" src="~/assets/img/yenIcon.webp" />
            </span>
            <p>{{ swipeItem.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import rings from '../morecules/rings.vue';

export default Vue.extend({
  components: { rings },
  props: ['swipeItem', 'routerName'],
  methods: {
    changeImg(img: string): void {
      this.swipeItem.img = img;
    },
  },
});
</script>
