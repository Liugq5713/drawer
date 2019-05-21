export const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}

export const isArray = arr => {
  return Array.isArray(arr)
}

export const debounce = (fn, interval = 400) => {
  let timeout = null
  return function() {
    const context = this;
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(context, arguments)
    }, interval)
  }
}


