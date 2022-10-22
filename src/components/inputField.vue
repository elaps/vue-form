<script setup>
import { computed } from 'vue'
const props = defineProps({
  field: String,
  modelValue: Object,
  label: String
})
const theModel = computed(() => props.modelValue)

const blur = () => {
  props.modelValue.touch(props.field)
  props.modelValue.validate(props.field)
}

const validate = () => {
  if (props.modelValue.touched[props.field]) {
    props.modelValue.validate(props.field)
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
