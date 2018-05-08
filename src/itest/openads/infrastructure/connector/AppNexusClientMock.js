import AppNexusClient from '../../../../openads/infrastructure/connector/appnexus/AppNexusClient'

export default class AppNexusClientMock extends AppNexusClient {
  constructor ({loadTags, refresh} = {}) {
    super({})
    this._loadTags = loadTags
    this._refresh = refresh || loadTags
    this._callbackLoadTags = null
    this._callbackRefresh = null
    this._debounce = undefined
    this._buffer = undefined
    this.numberOfCallsToLoadTags = 0
    this.numberOfCallsToRefresh = 0
    this._bufferAccumulator = []
    this.debug = false
    this.anq = {
      push: () => { console.log('anq.push') }
    }
  }

  defineTag ({member, targetId, invCode, sizes, keywords, native}) {
    console.log('defineTags')
    return this
  }

  loadTags () {
    console.log('loadTags')
    return this
  }

  showTag ({target}) {
    console.log('showtag')
    return this
  }

  refresh (target) {
    console.log('refresh')
    return this
  }

  offEvent (event, targetId) {
    console.log('offEvent')
    return this
  }

  setPageOpts ({member, keywords}) {
    console.log('setPageOpts')
    return this
  }

  clearRequest () {
    console.log('clearRequest')
    return this
  }
}
