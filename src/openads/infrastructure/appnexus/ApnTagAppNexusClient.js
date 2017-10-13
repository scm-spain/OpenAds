import AppNexusClient from './AppNexusClient'

require('@schibstedspain/ast')

export default class ApnTagAppNexusClient extends AppNexusClient {
  constructor () {
    super()
    this._apnTag = apntag
  }

  activateDebugMode () {
    this._apnTag.debug = true
  }

  setPageOpts ({member, keywords}) {
    this._apnTag.setPageOpts({member, keywords})
  }

  onEvent ({event, targetId, callback}) {
    this._apnTag.onEvent(event, targetId, callback)
  }

  defineTag ({invCode, sizes, targetId}) {
    this._apnTag.defineTag({
      invCode,
      sizes,
      targetId
    }
    )
  }

  loadTags () {
    this._apnTag.loadTags()
  }

  showTag ({target}) {
    this._apnTag.showTag(target)
  }
}
