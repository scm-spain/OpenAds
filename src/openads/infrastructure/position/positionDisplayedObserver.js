const positionDisplayedObserver = appNexusConnector => ({payload, dispatcher}) =>
  appNexusConnector.showTag({target: payload.id})

export default positionDisplayedObserver
