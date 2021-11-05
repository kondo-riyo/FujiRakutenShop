<template>
  <fieldset>
    <select 
     :name="name" 
     @change="updateValue"
     class="
        appearance-none
        block
        w-full
        bg-base_gray bg-opacity-25
        text-base_green
        border border-gray-200
        rounded
        py-3
        px-4
        leading-tight
        focus:outline-none focus:bg-white focus:border-gray-500
     "
    >
      <!-- <template v-for="(option, index) in options"> -->
        <option v-for="(option, index) in options" :value="option.value" :key="index">
          {{ option.label }}
        </option>
      <!-- </template> -->
    </select>
  </fieldset>
</template>

<script >
export default {
  name: "deliverySelect",
  props: {
    value: { type: String, require: true },
    options: { type: Array, require: true },
    name: { type: String, require: true }
  },
  methods: {
    updateValue (e){
      this.$emit("input", e.target.value);
    },
    mountedEmit() {
      this.$emit("input", this.options[0].value);
    }
  },
  mounted() {
    // this.$emit("input", this.options[0].value);
    this.mountedEmit()
  }
};
</script>