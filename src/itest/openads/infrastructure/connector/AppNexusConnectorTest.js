export default class AppNexusConnectorTest {
  constructor ({loadTags, refresh} = {}) {
    this._loadTags = loadTags
    this._refresh = refresh || loadTags
    this._callbackLoadTags = null
    this._callbackRefresh = null
  }

  activateDebugMode () {
    return this
  }

  setPageOpts ({member, keywords}) {
    return this
  }

  onEvent ({event, targetId, callback}) {
    if (event === this._loadTags.event) {
      this._callbackLoadTags = callback
    }

    if (event === this._refresh.event) {
      this._callbackRefresh = callback
    }
    return this
  }

  defineTag ({member, targetId, invCode, sizes, keywords, native}) {
    return this
  }

  loadTags () {
    this._callbackLoadTags(this._loadTags.data)
    return this
  }

  showTag ({target}) {
    return this
  }

  reset () {
    return this
  }

  refresh (target) {
    this._callbackRefresh(this._refresh.data)
    return this
  }

  modifyTag ({targetId, data}) {
    return this
  }
}
