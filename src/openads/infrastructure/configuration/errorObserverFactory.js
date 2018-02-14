export const errorObserverFactory = logger => ({payload, dispatcher}) => logger.error('ERROR_EVENT', payload)
