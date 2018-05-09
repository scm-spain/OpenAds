import AppNexusClient from '../../../../openads/infrastructure/connector/appnexus/AppNexusClient'

export default class AppNexusClientMock extends AppNexusClient {
  constructor ({loadTags, refresh} = {}) {
    super({})
    this._loadTags = loadTags
    this._refresh = refresh || loadTags
    this._callbackLoadTags = null
    this._callbackRefresh = null
    // this._debounce = undefined
    // this._buffer = undefined
    this.numberOfCallsDefineTag = 0
    this.numberOfCallsToLoadTags = 0
    this.numberOfCallsToShowTag = 0
    this.numberOfCallsToRefresh = 0
    this.numberOfCallsToOffEvent = 0
    this.numberOfCallsToSetPageOpts = 0
    this.numberOfCallsToClearReques = 0
    // this._bufferAccumulator = []
    this.debug = false
    this.anq = {
      push: () => { console.log('anq.push') }
    }
  }

  defineTag ({member, targetId, invCode, sizes, keywords, native}) {
    console.log('defineTags')
    this.numberOfCallsDefineTag++
    return this
  }

  loadTags () {
    console.log('loadTags')
    this.numberOfCallsToLoadTags++
    return this
  }

  showTag ({target}) {
    console.log('showtag')
    this.numberOfCallsToShowTag++
    return this
  }

  refresh (target) {
    console.log('refresh')
    this.numberOfCallsToRefresh++
    return this
  }

  offEvent (event, targetId) {
    console.log('offEvent')
    this.numberOfCallsToOffEvent++
    return this
  }

  setPageOpts ({member, keywords}) {
    console.log('setPageOpts')
    this.numberOfCallsToSetPageOpts++
    return this
  }

  clearRequest () {
    console.log('clearRequest')
    this.numberOfCallsToClearReques++
    return this
  }
}
