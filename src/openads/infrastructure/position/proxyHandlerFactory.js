import {AD_AVAILABLE} from '../connector/appnexus/event/events'
import AppNexusErrorException from '../connector/appnexus/AppNexusErrorException'

const PROXY_PROPERTY = 'ad'
const TIMEOUT = 200
const WAIT = 50
const TIMEOUT_EXCEPTION = 'Something in appnexus consumer failed to set adResponse data'
const APPNEXUS_ERROR = 'Appnexus error'

const proxyHandlerFactory = repository => ({
  get: (target, name) => {
    if (name !== PROXY_PROPERTY) {
      return target[name]
    } else {
      return Promise.race([
        resolveAdData(repository)(target)(name),
        timeout()
      ])
    }
  }
})
let resolveAdData = repository => target => name => new Promise((resolve, reject) => {
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
      }, WAIT)
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
        cause: target[name],
        message: APPNEXUS_ERROR,
        status: target[name].status
      }))
      break
  }
}
let timeout = () => new Promise((resolve, reject) => {
  let wait = setTimeout(() => {
    clearTimeout(wait)
    reject(new Error(TIMEOUT_EXCEPTION))
  }, TIMEOUT)
})

export default proxyHandlerFactory
