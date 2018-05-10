import AppNexusClient from '../../../../openads/infrastructure/connector/appnexus/AppNexusClient'

export default class AppNexusClientMock extends AppNexusClient {
  constructor ({loadTags, refresh} = {}) {
    super({})
    this._loadTags = loadTags
    this._refresh = refresh || loadTags
    this._callbackLoadTags = null
    this._callbackRefresh = null
    this._numberOfCallsDefineTag = 0
    this._numberOfCallsToLoadTags = 0
    this._numberOfCallsToShowTag = 0
    this._numberOfCallsToRefresh = 0
    this._numberOfCallsToOffEvent = 0
    this._numberOfCallsToSetPageOpts = 0
    this._numberOfCallsToClearReques = 0
    this._numberOfCallsToOnEvent = 0
    this._numberOfCallsToModifyTag = 0
    this.debug = false
    this.anq = {
      push: (param) => {
        param()
      }
    }
  }

  defineTag ({member, targetId, invCode, sizes, keywords, native}) {
    this._numberOfCallsDefineTag++
    return this
  }

  onEvent (event, targetId, callback) {
    this._numberOfCallsToOnEvent++
    if (event === this._loadTags.event) {
      this._callbackLoadTags = callback
    }
    if (event === this._refresh.event) {
      this._callbackRefresh = callback
    }
    return this
  }

  loadTags () {
    this._numberOfCallsToLoadTags++
    this._callbackLoadTags(this._loadTags.data)
    return this
  }

  showTag ({target}) {
    this._numberOfCallsToShowTag++
    return this
  }

  refresh (target) {
    this._numberOfCallsToRefresh++
    this._callbackRefresh(this._refresh.data)
    return this
  }

  offEvent (event, targetId) {
    this._numberOfCallsToOffEvent++
    return this
  }

  setPageOpts ({member, keywords}) {
    this._numberOfCallsToSetPageOpts++
    return this
  }

  clearRequest () {
    this._numberOfCallsToClearReques++
    return this
  }

  modifyTag ({targetId, data}) {
    this._numberOfCallsToModifyTag++
    return this
  }
}
