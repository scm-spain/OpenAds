import {pagePositionAdded} from '../../domain/page/pagePositionAdded'

const pageCreatedSubscriberFactory = appnexusConnector => (payload, dispatcher) => {
  payload.positions.forEach(position => appnexusConnector
    .defineTag({
      targetId: position.domId,
      invCode: position.placement,
      sizes: position.sizes,
      keywords: position.segmentation,
      native: position.native
    })
    .onEvent({
      event: 'adAvailable',
      targetId: position.domId,
      callback: () => dispatcher(pagePositionAdded({lala: 'caca'})) // NON SENSE ONLY EXAMPLE
    })
  )
  appnexusConnector.loadTags()
}
export default pageCreatedSubscriberFactory
