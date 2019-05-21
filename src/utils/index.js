export const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}

export const isArray = arr => {
  return Array.isArray(arr)
}

export function throttle(func, wait = 1000) {
  let timeout
  return function(evt) {
    const context = this
    let args = evt
    console.log('throttle', this, evt)
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}
