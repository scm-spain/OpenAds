/**
 * @interface
 */
export default class DOMDriver {
  getElementById ({id}) {
    throw new Error('DOMDriver#must be implemented')
  }

  getElementsByClassName ({className}) {
    throw new Error('DOMDriver#must be implemented')
  }

  getElementsByTagName ({name}) {
    throw new Error('DOMDriver#must be implemented')
  }

  writeElementById ({id, value}) {
    throw new Error('DOMDriver#must be implemented')
  }
}
