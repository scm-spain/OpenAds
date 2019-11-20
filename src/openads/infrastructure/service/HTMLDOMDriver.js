import DOMDriver from '../../domain/service/DOMDriver'

export default class HTMLDOMDriver extends DOMDriver {
  constructor({dom}) {
    super()
    this._dom = dom
  }

  getElementById({id}) {
    return this._dom.getElementById(id)
  }

  getElementsByClassName({className}) {
    return this._dom.getElementsByClassName(className)
  }

  getElementsByTagName({tagName}) {
    return this._dom.getElementsByTagName(tagName)
  }

  writeElementById({id, value}) {
    let domElement = this._dom.getElementById(id)
    if (domElement === null) throw new Error(`Element with ID ${id} not found!`)
    domElement.innerHTML = value
    return domElement
  }

  createElement({tagName}) {
    return this._dom.createElement(tagName)
  }

  getQueryString() {
    return this._dom.location.search.slice(1)
  }

  getLocalStorageValue({key}) {
    return this._dom.defaultView.localStorage.getItem(key)
  }
}
