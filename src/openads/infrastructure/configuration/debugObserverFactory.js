export const debugObserverFactory = logger => ({event, payload, dispatcher}) =>
  logger.debug('DEBUG | event:', event, payload)
