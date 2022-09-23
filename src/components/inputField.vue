<script setup>
const props = defineProps({
  field: String,
  form: Object,
  label: String
})
const blur = () => {
  props.form.touch(props.field)
  props.form.validate(props.field)
}
const validate = () => {
  if (props.form.touched[props.field]) {
    props.form.validate(props.field)
  }
}
</script>

<template>
  <label for="">{{ label ? label : form.labels[field] }}</label>
  <input type="text" v-model="form[field]" @blur="blur" @input="validate" />
  <div class="hint"></div>
  <div class="error">
    {{ form.errors[field] }}
  </div>
</template>
