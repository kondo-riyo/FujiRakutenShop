<template>
    <button
      class="
        bg-base_red
        hover:bg-base_orange
        text-base_cream
        font-bold
        py-2
        px-6
        rounded-full
        "
        @click="click"
    ><slot />
    </button>    
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'roundBottun',
  methods: {
    click():void {
      this.$emit("click");
    }
  }
})
</script>
