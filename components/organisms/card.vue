<template>
  <div
    class="
      flex flex-row
      sm:flex-col
      container
      p-2
      sm:p-10
      max-w-xs
      rounded-xl
      overflow-hidden
      shadow
      hover:shadow-xl
      transition
      duration-300
      m-1
      sm:m-3
      bg-white bg-opacity-50
    "
  >
    <div class="sm:w-auto w-1/2">
      <router-link
        :to="{
          name: `${routerName}`,
          params: { itemId: item.id },
        }"
      >
        <img class="rounded-xl sm:w-56 sm:h-56" :src="item.img" />
      </router-link>
    </div>

    <div class="sm:w-auto w-1/2">
      <div >
        <rings @selectRing="changeImg" :item="item" />
        <h1 class="mt-5 sm:text-lg font-semibold text-center truncate">
          {{ item.name }}
        </h1>
      </div>
      <div class="text-center">
        <span class="mt-2 mx-2">{{ item.price }}円(税込)</span>
        <span>
          <router-link
            :to="{
              name: `${routerName}`,
              params: { itemId: item.id },
            }"
          >
            <round-bottun class="mx-2 mt-2"> 詳細 </round-bottun>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import rings from '../morecules/rings.vue';
import roundBottun from '../atoms/button/roundBottun.vue';

export default Vue.extend({
  components: { rings, roundBottun },
  props: ['item', 'routerName'],
  methods: {
    changeImg(img: string): void {
      this.item.img = img;
    },
  },
});
</script>
