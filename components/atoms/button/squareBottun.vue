<template>
    <button
      class="
        bg-base_gray
        hover:bg-opacity-75 hover:text-white
        text-base_cream
        font-bold
        py-2
        px-6
        rounded-lg
        "
        @click="click"
    ><slot />
    </button>    
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    click():void {
      this.$emit("click");
    }
  }
})
</script>
