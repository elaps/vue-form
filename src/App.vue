<script setup>
import { useForm } from '@/uses/form'
import inputField from '@/components/inputFieldOPtions.vue'

const form = useForm({
  fields: { email: 'Почта', password: 'Пароль', bug: 'test' },
  rules: [
    {
      fields: ['email'],
      validator: 'required',
      when: () => !!form.password,
      message: `Поле {field} не заполнено`
    },
    {
      fields: ['password'],
      validator: 'required',
      message: `Поле {field} не заполнено`
    },
    {
      fields: ['bug'],
      validator: (val) => val == '111',
      message: `Поле {field} должно быть 111`
    },
    { fields: ['password'], validator: 'minlength', params: [8] }
  ]
})

form.load({ email: 'sssss', gg: 'aaa', password: '14' })
const submit = () => {
  form.validate()
}
</script>

<template>
  {{ form }}
  <form action="" @submit.prevent="submit">
    <inputField label="email" v-model="form" field="email" />
    <inputField v-model="form" field="password" />
    <inputField v-model="form" field="bug" />
    <input type="submit" />
  </form>
</template>

<style scoped></style>
