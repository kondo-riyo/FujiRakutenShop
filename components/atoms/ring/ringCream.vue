<template>
  <div
    class="
      p-1
      border-4
      rounded-full
      cursor-pointer
      hover:border-base_cream hover:scale-105
      transition
      transform
      duration-200
    "
    v-if="item.imgCream"
    @click="selectRing(item.imgCream)"
  >
    <span class="block h-3 w-3 bg-base_cream rounded-full"> </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['item'],
  methods: {
    selectRing(img: string):void {
      this.$emit('selectRing', img);
    },
  },
});
</script>