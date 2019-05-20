export const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}

export const isArray = arr => {
  return Array.isArray(arr)
}

export const debounce = (fn, interval = 400) => {
  let timeout = null
  let is_first = true
  return function() {
    if (is_first) {
      fn.apply(this, arguments)
      is_first = false
      return
    }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}
