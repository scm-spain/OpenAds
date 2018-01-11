/**
 * @interface
 */
export default class DOMDriver {
  getElementById ({id}) {
    throw new Error('DOMDriver#getElementById must be implemented')
  }

  getElementsByClassName ({className}) {
    throw new Error('DOMDriver#getElementsByClassName must be implemented')
  }

  getElementsByTagName ({tagName}) {
    throw new Error('DOMDriver#getElementsByTagName must be implemented')
  }

  writeElementById ({id, value}) {
    throw new Error('DOMDriver#writeElementById must be implemented')
  }

  createElement ({tagName}) {
    throw new Error('DOMDriver#createElement must be implemented')
  }

  getQueryString () {
    throw new Error('DOMDriver#getQueryString must be implemented')
  }
}
