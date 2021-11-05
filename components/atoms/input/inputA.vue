<template>
  <input
    :value="value"
    @input="onInput"
    class="
      appearance-none
      block
      w-full
      bg-base_gray bg-opacity-25 focus:bg-base_of focus:bg-opacity-70
      text-base_green
      rounded
      py-3
      px-4
      leading-tight
      focus:outline-none focus:bg-white focus:border-gray-500
      "
      :type="type"
      :name="name"
      :placeholder="placeholder"
 />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'inputA',
  props: {
    value: { type: String, required: false },
    type: { type: String, required: true },
    name: { type: String, required: true },
    placeholder: { type: String, required: false }
  },
  methods: {
    onInput(e: Event):void{
      //@ts-ignore
      this.$emit("input",e.target.value)
    }
  }
})
</script>