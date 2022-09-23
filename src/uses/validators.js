export const validators = {
  messages: {
    required: 'This field is required',
    notzero: 'Incorrect value',
    integer: 'Incorrect integer value',
    float: 'Incorrect float',
    min: 'Enter more',
    max: 'Enter less',
    between: 'Enter the between {0}-{1}',
    name: 'Incorrect name',
    lastname: 'Incorrect lastname',
    phone: 'Incorrect phone number',
    email: 'Incorrect email address',
    length: 'Incorrect. Enter a minimum of {0} characters and a maximum of {1}',
    minlength: 'You have entered less than {0} characters',
    maxlength: 'You have entered more than {0} characters',
    maxfilesize: 'The size of one or more selected files larger than {0} {1}',
    fileextension: 'One or more files have an invalid type',
    same: '',
    equal: ''
  },

  // rules
  rules: {
    required: function (value) {
      return '' !== value
    },
    notzero: function (value) {
      return parseInt(value, 10) > 0
    },
    integer: function (value) {
      return new RegExp(/^[0-9]+$/gi).test(value)
    },
    float: function (value) {
      value = value.toString().replace(/\,/, '.')
      return (
        this.integer(value) ||
        new RegExp(/^([0-9])+(\.)([0-9]+$)/gi).test(value)
      )
    },
    min: function (value, params) {
      if (this.float(value)) {
        return parseFloat(value) >= parseFloat(params[0])
      }
      return parseInt(value, 10) >= parseInt(params[0], 10)
    },
    max: function (value, params) {
      if (this.float(value)) {
        return parseFloat(value) <= parseFloat(params[0])
      }
      return parseInt(value, 10) <= parseInt(params[0], 10)
    },
    between: function (value, params) {
      params[1] = params[1] || 999999

      if (this.float(value)) {
        return (
          parseFloat(value) >= parseFloat(params[0]) &&
          parseFloat(value) <= parseFloat(params[1])
        )
      }
      if (this.integer(value)) {
        return (
          parseInt(value, 10) >= parseInt(params[0], 10) &&
          parseInt(value, 10) <= parseInt(params[1], 10)
        )
      }
      return false
    },
    name: function (value) {
      if (value.length > 0 && value.length < 2) {
        return false
      }
      return new RegExp(/^[a-zA-Z\sа-яА-ЯёЁ\-]+$/g).test(value)
    },
    lastname: function (value) {
      return this.name(value)
    },
    phone: function (value) {
      if (
        value.replace(/[^0-9]+/gi, '').match(/[0-9]+/gi) &&
        value.replace(/[^0-9]+/gi, '').match(/[0-9]+/gi)[0].length < 6
      ) {
        return false
      }
      return new RegExp(
        /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/g
      ).test(value)
    },
    email: function (value) {
      return new RegExp(
        /^(("[\w-\s]+")|([\w\-]+(?:\.[\w\-]+)*)|("[\w-\s]+")([\w\-]+(?:\.[\w\-]+)*))(@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      ).test(value)
    },
    length: function (value, params) {
      return this.between(value.replace(/\s{2,}/g, ' ').length, params)
    },
    maxlength: function (value, params) {
      return this.max(value.replace(/\s{2,}/g, ' ').length, params)
    },
    minlength: function (value, params) {
      return this.min(value.replace(/\s{2,}/g, ' ').length, params)
    },
    maxfilesize: function (value, params) {
      var i,
        l = value.length,
        unitsOffset = 1

      switch (params[1].toLowerCase()) {
        case 'b':
          unitsOffset = 1
          break

        case 'kb':
          unitsOffset = 1024
          break

        case 'mb':
          unitsOffset = 1048576
          break

        case 'gb':
          unitsOffset = 1073741824
          break

        case 'tb':
          unitsOffset = 1099511627776
          break
      }

      for (i = 0; i < l; i += 1) {
        if (parseFloat(value[i]) > parseFloat(params[0]) * unitsOffset) {
          return false
        }
      }

      return true
    },
    fileextension: function (value, params) {
      var i,
        a,
        l = params.length,
        b = value.length,
        cmpResC = 0

      for (i = 0; i < l; i += 1) {
        for (a = 0; a < b; a += 1) {
          if (params[i] === value[a].split('.').pop()) {
            cmpResC += 1
          }
        }
      }

      return value.length === cmpResC ? true : false
    }
  },
  formatString: function (string, field, params) {
    return string
      .replace('{field}', field)
      .replace(/\{(\d+)\}/gi, function (match, number) {
        return match && params[number] ? params[number] : ''
      })
  }
}
