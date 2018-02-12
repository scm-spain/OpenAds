export const errorObserverFactory = logger => payload => logger.error('ERROR_EVENT', payload)
