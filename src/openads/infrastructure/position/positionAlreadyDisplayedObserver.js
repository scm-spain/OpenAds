const positionAlreadyDisplayedObserver = appNexusConnector => ({payload, dispatcher}) =>
  appNexusConnector.refresh(payload.id)

export default positionAlreadyDisplayedObserver
