export default class NativeRenderer {
  /**
   *
   * @param {DOMDriver} domDriver
   * @param clientRenderer
   */
  constructor ({domDriver, clientRenderer}) {
    if (typeof clientRenderer !== 'function') {
      throw new Error('Client Renderer must be a function')
    }
    this._domDriver = domDriver
    this._clientRenderer = clientRenderer
  }
  render ({containerId, json, impressionTrackers = [], clickTrackers = []} = {}) {
    const container = this._domDriver.getElementById({id: containerId})
    if (container === null) {
      throw new Error(`Ad Container with id ${containerId} does not exist`)
    }
    const writeClickTrackers = () => {
      this._writeTrackers({trackers: clickTrackers, container})
    }
    const html = this._clientRenderer({json, writeClickTrackers})
    container.innerHTML = html
    this._writeTrackers({trackers: impressionTrackers, container})
  }

  _writeTrackers ({trackers, container}) {
    trackers.forEach(url => container.appendChild(this._createPixel({url})))
  }

  _createPixel ({url}) {
    const img = this._domDriver.createElement({tagName: 'img'})
    img.src = url
    img.height = 0
    img.width = 0
    img.style = 'display:none;'
    return img
  }
}
