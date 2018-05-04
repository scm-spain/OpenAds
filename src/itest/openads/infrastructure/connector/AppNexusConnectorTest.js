import AppNexusConnector from '../../../../openads/infrastructure/connector/appnexus/AppNexusConnector'

export default class AppNexusConnectorTest extends AppNexusConnector {
  constructor ({loadTags, refresh} = {}) {
    super({})
    this._loadTags = loadTags
    this._refresh = refresh || loadTags
    this._callbackLoadTags = null
    this._callbackRefresh = null
    // this._debounce = undefined
    // this._buffer = undefined
    this.numberOfCallsToLoadTags = 0
    this.numberOfCallsToRefresh = 0
    this._bufferAccumulator = []
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
    if (this._debounce !== undefined) clearTimeout(this._debounce)
    this._loadTagsDebounceOperator()
    return this
  }

  _loadTagsDebounceOperator () {
    this._debounce = setTimeout(() => {
      this._callbackLoadTags(this._loadTags.data)
      this.numberOfCallsToLoadTags++
      this._debounce = undefined
    }, 10)
  }

  showTag ({target}) {
    return this
  }

  reset () {
    return this
  }

  refresh (target) {
    if (this._buffer !== undefined) clearTimeout(this._buffer)
    // this._bufferAccumulator = this._bufferAccumulator.concat(target)
    this._refreshBufferOperator()
    return this
  }

  _refreshBufferOperator () {
    this._buffer = setTimeout(() => {
      this._callbackRefresh(this._refresh.data)
      this.numberOfCallsToRefresh++
      this._buffer = undefined
      // this._bufferAccumulator = []
    }, 10)
  }

  modifyTag ({targetId, data}) {
    return this
  }
}


// refresh (target) {
//   this._logger.debug('Refresh has been requested')
//   if (this._buffer !== undefined) clearTimeout(this._buffer)
//   this._bufferAccumulator = this._bufferAccumulator.concat(target)
//   this._refreshBufferOperator()
//   return this
// }
//
// _refreshBufferOperator () {
//   this._buffer = setTimeout(() => {
//     this._logger.debug('Refresh is called')
//     this._appNexusClient.anq.push(() => this._appNexusClient.refresh(this._bufferAccumulator))
//     this._buffer = undefined
//     this._bufferAccumulator = []
//   }, this._bufferTimeOut)
// }
