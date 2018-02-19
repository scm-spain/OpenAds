import {AD_AVAILABLE, AD_BAD_REQUEST, AD_ERROR, AD_NO_BID, AD_REQUEST_FAILURE} from '../connector/appnexus/event/events'

const positionCreatedObserverFactory = appnexusConnector => appNexusConsumersRepository => ({payload, dispatcher}) =>
  appnexusConnector
    .defineTag({
      member: appnexusConnector.member,
      targetId: payload.id,
      invCode: payload.placement,
      sizes: payload.sizes,
      keywords: payload.segmentation,
      native: payload.native && payload.native.fields
    })
    .onEvent({
      event: AD_AVAILABLE,
      targetId: payload.id,
      callback: consumer(appNexusConsumersRepository)(payload.id)(AD_AVAILABLE)
    })
    .onEvent({
      event: AD_BAD_REQUEST,
      targetId: payload.id,
      callback: consumer(appNexusConsumersRepository)(payload.id)(AD_BAD_REQUEST)
    })
    .onEvent({
      event: AD_ERROR,
      targetId: payload.id,
      callback: consumer(appNexusConsumersRepository)(payload.id)(AD_ERROR)
    })
    .onEvent({
      event: AD_NO_BID,
      targetId: payload.id,
      callback: consumer(appNexusConsumersRepository)(payload.id)(AD_NO_BID)
    })
    .onEvent({
      event: AD_REQUEST_FAILURE,
      targetId: payload.id,
      callback: consumer(appNexusConsumersRepository)(payload.id)(AD_REQUEST_FAILURE)
    })
    .loadTags()

const consumer = appnexusConsumersRepository => id => status => data =>
  appnexusConsumersRepository.save({id, adResponse: {data, status}})

export default positionCreatedObserverFactory
