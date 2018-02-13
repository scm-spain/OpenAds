const PROXY_PROPERTY = 'ad'
const TIMEOUT = 60
const WAIT = 20
const TIMEOUT_EXCEPTION = 'Something in appnexus consumer failed to set adResponse data'
const proxyHandlerFactory = repository => ({
  get: (target, name) => {
    if (name !== PROXY_PROPERTY) {
      return target[name]
    } else {
      return Promise.race([
        new Promise((resolve, reject) => {
          if (target[name] !== undefined) {
            resolve(target[name])
          } else {
            target[name] = repository.find({id: target['id']})
            if (target[name] === undefined) {
              const stopper = setInterval(() => {
                target[name] = repository.find({id: target['id']})
                if (target[name] !== undefined) {
                  clearInterval(stopper)
                  resolve(target[name])
                }
              }, WAIT)
            } else {
              resolve(target[name])
            }
          }
        }),
        new Promise((resolve, reject) => {
          let wait = setTimeout(() => {
            clearTimeout(wait)
            reject(new Error(TIMEOUT_EXCEPTION))
          }, TIMEOUT)
        })
      ])
    }
  }
})
export default proxyHandlerFactory
