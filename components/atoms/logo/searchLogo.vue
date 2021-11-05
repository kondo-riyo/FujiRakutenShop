<template>
        <img
        src="../../../assets/img/search.webp"
        class="block w-6 mr-auto mt-10"
        @click="search"
      />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    search():void {
      this.$emit("search");
    }
  }
})
</script>