/**
 *
 * @param {PageRepository} pageRepository
 * @param {AppNexusResultMapper} appnexusResultMapper
 * @returns {function(*=): function({payload: *, dispatcher: *}): PromiseLike<T>}
 */
const adAvailableSubscriberFactory = pageRepository => appnexusResultMapper => ({payload, dispatcher}) =>
  pageRepository.find({id: payload.pageId})
    .then(page => page.addAd({
      positionId: payload.positionId,
      ad: appnexusResultMapper.mapResponseToDomain({
        position: payload.positionId,
        appNexusResponse: payload.adResponse
      })
    }))
    .then(page => pageRepository.save({page}))

export default adAvailableSubscriberFactory
