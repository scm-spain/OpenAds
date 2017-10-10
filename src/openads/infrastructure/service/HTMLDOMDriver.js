import DOMDriver from '../../domain/service/DOMDriver'

export default class HTMLDOMDriver extends DOMDriver {
  constructor ({dom}) {
    super()
    this._dom = dom
  }

  getElementById ({id}) {
    return this._dom.getElementById(id)
  }

  getElementsByClassName ({className}) {
    return this._dom.getElementsByClassName(className)
  }

  getElementsByTagName ({name}) {
    return this._dom.getElementsByTagName(name)
  }

  writeElementById ({id, value}) {
    let domElement = this._dom.getElementById(id)
    if (domElement === null) throw new Error(`Element with ID ${id} not found!`)
    domElement.innerHTML = value
    return domElement
  }
}