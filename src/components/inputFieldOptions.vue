<script>
export default {
  props: {
    field: {},
    modelValue: {},
    label: {}
  },
  computed: {
    theModel(){
      return this.modelValue
    }
  },
  methods: {
    blur() {
      this.modelValue.touch(this.field)
      this.modelValue.validate(this.field)
    },
    validate() {
      if (this.modelValue.touched[this.field]) {
        this.modelValue.validate(this.field)
      }
    }
  }
}
</script>

<template>
  <label for="">{{ label ? label : modelValue.labels[field] }}</label>
  <input type="text" v-model="theModel[field]" @blur="blur" @input="validate" />
  <div class="hint"></div>
  <div class="error">
    {{ modelValue.errors[field] }}
  </div>
</template>
