import {AD_AVAILABLE} from '../connector/appnexus/event/events'
import AppNexusErrorException from '../connector/appnexus/AppNexusErrorException'

const PROXY_PROPERTY = 'ad'
const TIMEOUT_EXCEPTION = 'Something in appnexus consumer failed to set adResponse data'
const DEFAULT_TIMEOUT = 20000
const DEFAULT_WAIT = 50

const proxyHandlerFactory = repository => ({wait = DEFAULT_WAIT, timeout = DEFAULT_TIMEOUT} = {}) => ({
  get: (target, name) => {
    if (name !== PROXY_PROPERTY) {
      return target[name]
    } else {
      return Promise.race([
        resolveAdData(repository)(target)(name)(wait),
        timeoutPromise(timeout)
      ])
    }
  }
})
let resolveAdData = repository => target => name => wait => new Promise((resolve, reject) => {
  if (target[name] !== undefined) {
    resolve(target[name])
  } else {
    target[name] = repository.find({id: target['id']})
    if (target[name] === undefined) {
      const stopper = setInterval(() => {
        target[name] = repository.find({id: target['id']})
        if (target[name] !== undefined) {
          clearInterval(stopper)
          resolveOrRejectByStatus(target)(name)(resolve)(reject)
        }
      }, wait)
    } else {
      resolveOrRejectByStatus(target)(name)(resolve)(reject)
    }
  }
})
const resolveOrRejectByStatus = target => name => resolve => reject => {
  switch (target[name].status) {
    case AD_AVAILABLE :
      resolve(target[name])
      break
    default:
      reject(new AppNexusErrorException({
        position: target['id'],
        cause: target[name],
        status: target[name].status
      }))
      break
  }
}
let timeoutPromise = (timeout) => new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
    clearTimeout(wait)
    reject(new Error(TIMEOUT_EXCEPTION))
  }, timeout)
})

export default proxyHandlerFactory
