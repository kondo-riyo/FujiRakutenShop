<template>
  <input
    @input="onInput"
    class="
      w-1/2
      sm:w-1/3
      p-2
      py-2
      mr-2
      rounded-md
      shadow-md
      border border-gray-300
      focus:outline-none
      hover:bg-base_of
      ring
      ring-base_red
      ring-offset-2
      focus:ring-8 focus:ring-opacity-20
      mt-10
      mb-0
      ml-auto
    "
  />
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    onInput(e:string): void {
        //@ts-ignore
        this.$emit('input', e.target.value);
    },
  },
});
</script>
