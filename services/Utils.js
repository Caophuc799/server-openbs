import moment from 'moment'

export const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const arrayToString = (arr) => {
  let result = ''
  arr.forEach(element => {
    result += `${element}, `
  })
  result = result.slice(0, result.length - 2)
  return result
}

export const stringToArray = (Str) => {
  return Str.split(', ')
}

export const formatDate = (date, formatType) => {
  formatType = formatType || 'DD/MM/YYYY'
  if (moment(date, formatType).isValid()) return moment(date, formatType).format(formatType)
  return moment(date).format(formatType)
}

export const formatObject = (obj) => {
  for (let key in obj) {
    if (obj[key] === null) delete obj[key]
  }
}

export const splitDate = (dateString) => {
  dateString = dateString || ''
  const components = dateString.split('/')

  return {
    'DD': components[0] || '',
    'MM': components[1] || '',
    'YYYY': components[2] || ''
  }
}

export const mergeDateToString = (DD, MM, YYYY) => {
  return `${DD}/${MM}/${YYYY}`
}

export const momentToFormat24 = (momentTime) => {
  const minute = momentTime.format('mm')
  const hour = momentTime.format('H')
  if (hour === '23' && minute === '59') {
    return '24:00'
  }
  return hour + ':' + minute
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getRandomInt = (max = 1000000000) => {
  return Math.floor(Math.random() * Math.floor(max))
}
