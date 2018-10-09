export const errorObserverFactory = logger => ({payload, dispatcher}) =>
  logger.error('ERROR | ', payload)
