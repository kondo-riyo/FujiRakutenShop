<template>
  <div class="mt-3 space-x-4 flex p-1 justify-center">
    <ring-red @selectRing="selectRing" :item="item" />
    <ring-orange @selectRing="selectRing" :item="item" />
    <ring-purple @selectRing="selectRing" :item="item" />
    <ring-cream @selectRing="selectRing" :item="item" />
    <ring-brown @selectRing="selectRing" :item="item" />
  </div>
</template>

<script lang="ts">
import ringRed from '../atoms/ring/ringRed.vue'
import ringOrange from '../atoms/ring/ringOrange.vue'
import ringPurple from '../atoms/ring/ringPurple.vue'
import ringCream from '../atoms/ring/ringCream.vue'
import ringBrown from '../atoms/ring/ringBrown.vue'

import Vue from 'vue';
export default Vue.extend({
  components:{
    ringRed,
    ringOrange,
    ringPurple,
    ringCream,
    ringBrown
  },
  props: ['item'],
  methods: {
    selectRing(img: string):void {
      this.$emit('selectRing', img);
    },
  },
});
</script>
