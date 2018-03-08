const positionSegmentationChangedObserverFactory = appnexusConnector => ({payload, dispatcher}) =>
  appnexusConnector
    .modifyTag({
      targetId: payload.id,
      data: {
        invCode: payload.placement,
        sizes: payload.sizes,
        keywords: payload.segmentation
      }
    })
    .refresh([payload.id])

export default positionSegmentationChangedObserverFactory
