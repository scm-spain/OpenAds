export const performanceHandler = performance => ({
  get: (target, propKey) => {
    const propertyType = typeof target[propKey]
    switch (propertyType) {
      case 'function':
        return (...args) => {
          return performance.measure(propKey)(() => target[propKey].apply(target, args))
        }
    }
    return target[propKey]
  }
})
