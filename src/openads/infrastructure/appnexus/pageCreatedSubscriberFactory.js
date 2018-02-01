import {
  AD_AVAILABLE, AD_BAD_REQUEST, AD_ERROR, AD_NO_BID, AD_REQUEST_FAILURE,
  appnexusAdAvailable, appnexusAdBadRequest, appnexusAdError, appnexusAdNoBID, appnexusAdRequestFailure
} from './event/events'

/**
 *
 * @param {AppNexusConnector} appnexusConnector
 * @returns {function({payload?: *, dispatcher?: *})}
 */
const pageCreatedSubscriberFactory = appnexusConnector => ({payload, dispatcher}) => {
  payload.positions.forEach(position => appnexusConnector
    .defineTag({
      member: appnexusConnector.member,
      targetId: position.domId,
      invCode: position.placement,
      sizes: position.sizes,
      keywords: position.segmentation,
      native: position.native
    })
    .onEvent({
      event: AD_AVAILABLE,
      targetId: position.domId,
      callback: (adResponse) => dispatcher(appnexusAdAvailable({pageId: payload.id, positionId: position.id, adResponse}))
    })
    .onEvent({
      event: AD_BAD_REQUEST,
      targetId: position.domId,
      callback: (data) => dispatcher(appnexusAdBadRequest(data))
    })
    .onEvent({
      event: AD_ERROR,
      targetId: position.domId,
      callback: (data) => dispatcher(appnexusAdError(data))
    })
    .onEvent({
      event: AD_NO_BID,
      targetId: position.domId,
      callback: (data) => dispatcher(appnexusAdNoBID(data))
    })
    .onEvent({
      event: AD_REQUEST_FAILURE,
      targetId: position.domId,
      callback: (data) => dispatcher(appnexusAdRequestFailure(data))
    })
  )
  appnexusConnector.loadTags()
}

export default pageCreatedSubscriberFactory
