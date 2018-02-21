const positionSegmentationChangedObserverFactory = appnexusConnector => ({payload, dispatcher}) =>
  appnexusConnector
    .modifyTag(payload.id, {
      invCode: payload.placement,
      sizes: payload.sizes,
      keywords: payload.segmentation
    })
    .refresh([payload.id])

export default positionSegmentationChangedObserverFactory
