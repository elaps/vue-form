import { ref, reactive, watch } from 'vue'
import { validators } from '@/uses/validators'
export function useForm(conf = {}) {
  const form = reactive({})
  form.errors = reactive({})
  form.touched = reactive({})
  form.labels = {}
  for (let [field, label] of Object.entries(conf.fields)) {
    const value = ref('')
    form[field] = value
    form.labels[field] = label
  }

  form.validate = (fieldName = false) => {
    form.errors = {}
    for (const rule of conf.rules) {
      if (!rule.when || (rule.when && rule.when())) {
        for (const field of rule.fields) {
          if ((form.touched[field] || fieldName === false) && !form.errors[field]  ) {
            let res = true
            if (validators.rules[rule.validator]) {
              res = validators.rules[rule.validator](form[field], rule.params)
            }else{
              if(rule.validator.call){
                res = rule.validator(form[field], rule.params)
              }
            }

            if (!res) {
              form.errors[field] = rule.message
                ? rule.message.replace('{field}', form.labels[field])
                : validators.formatString(
                    validators.messages[rule.validator],
                    form.labels[field],
                    rule.params
                  )
            }
          }
        }
      }
    }
  }
  form.touch = (field) => {
    form.touched[field] = true
  }
  form.load = (data) => {
    for (const key of Object.keys(data)) {
      if (form[key] !== undefined) {
        form[key] = data[key]
      }
    }
  }
  return form
}
