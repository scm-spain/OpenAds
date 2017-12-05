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
    return new Promise((resolve, reject) => {
      const container = this._domDriver.getElementById({id: containerId})
      if (container === null) {
        reject(new Error(`Ad Container with id ${containerId} does not exist`))
      }
      const renderedData = this._clientRenderer({json})
      if (!renderedData || !renderedData.html) {
        reject(new Error(`Native renderer for ${containerId} did not generate html content`))
      }
      container.innerHTML = renderedData.html

      if (clickTrackers.length > 0 && renderedData.clickElementId) {
        const clickElement = this._domDriver.getElementById({id: renderedData.clickElementId})
        if (clickElement !== null) {
          const oldClick = clickElement.onclick
          clickElement.onclick = () => {
            this._writeTrackers({trackers: clickTrackers, container})
            if (typeof oldClick === 'function') {
              oldClick()
            }
          }
        }
      }

      this._writeTrackers({trackers: impressionTrackers, container})

      resolve(true)
    })
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
