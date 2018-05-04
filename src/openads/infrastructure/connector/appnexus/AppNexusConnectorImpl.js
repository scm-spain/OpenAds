import AppNexusConnector from './AppNexusConnector'

export default class AppNexusConnectorImpl extends AppNexusConnector {
  constructor ({source, connectorData, appNexusClient, logger, debounceTimeOut, bufferTimeOut}) {
    super({
      source: source,
      configuration: connectorData
    })
    this._member = this.configuration.Member
    this._debounceTimeOut = debounceTimeOut
    this._bufferTimeOut = bufferTimeOut
    this._appNexusClient = appNexusClient
    this._registeredEvents = new Map()
    this._logger = logger
    this._bufferAccumulator = []
  }

  get member () {
    return this._member
  }

  activateDebugMode () {
    this._logger.debug('Activating AppNexus Debug Mode')
    this._appNexusClient.debug = true
    return this
  }

  setPageOpts ({member, keywords}) {
    this._logger.debug('Setting AppNexus Page Opts', '| member:', member, '| keywords:', keywords)
    this._appNexusClient.anq.push(() => this._appNexusClient.setPageOpts({member, keywords}))
    return this
  }

  onEvent ({event, targetId, callback}) {
    this._logger.debug('Activating AppNexus Listener', '| event:', event, '|targetId:', targetId)
    this._appNexusClient.anq.push(() => {
      this._appNexusClient.onEvent(event, targetId, callback)
      if (!this._registeredEvents.has(targetId)) {
        this._registeredEvents.set(targetId, [])
      }
      this._registeredEvents.get(targetId).push(event)
    })
    return this
  }

  defineTag ({member, targetId, invCode, sizes, keywords, native}) {
    this._logger.debug('Defining AppNexus Tag', '| member:', member, '| targetId:', targetId, '| invCode:', invCode, '| sizes:', sizes, '| keywords:', keywords, '| native:', native)
    this._appNexusClient.anq.push(() => this._appNexusClient.defineTag({member, targetId, invCode, sizes, keywords, native}))
    return this
  }

  loadTags () {
    this._logger.debug('loadTags has been requested')
    if (this._debounce !== undefined) clearTimeout(this._debounce)
    this._loadTagsDebounceOperator()
    return this
  }

  _loadTagsDebounceOperator () {
    this._debounce = setTimeout(() => {
      this._logger.debug('loadTags is called')
      this._appNexusClient.anq.push(() => this._appNexusClient.loadTags())
      this._debounce = undefined
    }, this._debounceTimeOut)
  }

  showTag ({target}) {
    this._logger.debug('Showing AppNexus Tag', '| target:', target)
    this._appNexusClient.anq.push(() => this._appNexusClient.showTag(target))
    return this
  }

  reset () {
    this._logger.debug('Reset AppNexus connector')
    this._appNexusClient.anq.push(() => {
      this._appNexusClient.clearRequest()
      this._registeredEvents.forEach((eventArray, targetId) => {
        eventArray.forEach(event => this._appNexusClient.offEvent(event, targetId))
      })
      this._registeredEvents = new Map()
    })
    return this
  }

  refresh (target) {
    this._logger.debug('Refresh has been requested')
    if (this._buffer !== undefined) clearTimeout(this._buffer)
    this._bufferAccumulator = this._bufferAccumulator.concat(target)
    this._refreshBufferOperator()
    return this
  }

  _refreshBufferOperator () {
    this._buffer = setTimeout(() => {
      this._logger.debug('Refresh is called')
      this._appNexusClient.anq.push(() => this._appNexusClient.refresh(this._bufferAccumulator))
      this._buffer = undefined
      this._bufferAccumulator = []
    }, this._bufferTimeOut)
  }

  modifyTag ({targetId, data}) {
    this._logger.debug('Modify AppNexus Tag', '| targetId:', targetId, '| data:', data)
    this._appNexusClient.anq.push(() => this._appNexusClient.modifyTag(targetId, data))
    return this
  }
}
