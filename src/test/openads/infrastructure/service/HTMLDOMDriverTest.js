import {assert} from 'chai'
import HTMLDOMDriver from '../../../../openads/infrastructure/service/HTMLDOMDriver'
import {JSDOM} from 'jsdom'

describe('DOM Driver HTML simple implementation', function () {
  it('should find given element by id', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div id="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementById({id: 'forlayo'})

    assert.equal(result.nodeName.toLowerCase(), 'div')
    assert.equal(result.innerHTML, 'Hello world')
  })
  it('should NOT find given element by id', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div id="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementById({id: 'notFoundId'})

    assert.isNull(result)
  })
  it('should find given element by className', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div class="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementsByClassName({className: 'forlayo'})

    assert.equal(result.length, 1)
    assert.equal(result[0].nodeName.toLowerCase(), 'div')
    assert.equal(result[0].innerHTML, 'Hello world')
  })
  it('should find 3 elements by className', function () {
    const givenDocument = new JSDOM('' +
      '<!DOCTYPE html>' +
      '<div class="forlayo">Hello world 1</div>' +
      '<div class="forlayo">Hello world 2</div>' +
      '<div class="forlayo">Hello world 3</div>'
    ).window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementsByClassName({className: 'forlayo'})

    assert.equal(result.length, 3)
    assert.equal(result[0].nodeName.toLowerCase(), 'div')
    assert.equal(result[0].innerHTML, 'Hello world 1')

    assert.equal(result[1].nodeName.toLowerCase(), 'div')
    assert.equal(result[1].innerHTML, 'Hello world 2')

    assert.equal(result[2].nodeName.toLowerCase(), 'div')
    assert.equal(result[2].innerHTML, 'Hello world 3')
  })
  it('should NOT find any element by className', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div class="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementsByClassName({className: 'notFoundClassName'})
    assert.equal(result.length, 0)
  })
  it('should find given element by tagName', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div class="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementsByTagName({name: 'div'})

    assert.equal(result.length, 1)
    assert.equal(result[0].nodeName.toLowerCase(), 'div')
    assert.equal(result[0].innerHTML, 'Hello world')
  })
  it('should find 3 elements by tagName', function () {
    const givenDocument = new JSDOM('' +
      '<!DOCTYPE html>' +
      '<div class="forlayo">Hello world 1</div>' +
      '<div class="forlayo">Hello world 2</div>' +
      '<div class="forlayo">Hello world 3</div>'
    ).window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementsByTagName({name: 'div'})

    assert.equal(result.length, 3)
    assert.equal(result[0].nodeName.toLowerCase(), 'div')
    assert.equal(result[0].innerHTML, 'Hello world 1')

    assert.equal(result[1].nodeName.toLowerCase(), 'div')
    assert.equal(result[1].innerHTML, 'Hello world 2')

    assert.equal(result[2].nodeName.toLowerCase(), 'div')
    assert.equal(result[2].innerHTML, 'Hello world 3')
  })
  it('should NOT find any element by tagName', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div class="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const result = htmlDOMDriver.getElementsByTagName({name: 'notFoundClassName'})
    assert.equal(result.length, 0)
  })
  it('should write given value on element', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div id="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})

    const modifiedElement = htmlDOMDriver.writeElementById({
      id: 'forlayo',
      value: '42'
    })

    assert.equal(modifiedElement.innerHTML, '42')
  })
  it('should try to write a value on dom and generate an exception', function () {
    const givenDocument = new JSDOM('<!DOCTYPE html><div id="forlayo">Hello world</div>').window.document
    const htmlDOMDriver = new HTMLDOMDriver({dom: givenDocument})
    const givenId = 'notFoundId'

    const sideEffect = () => htmlDOMDriver.writeElementById({
      id: givenId,
      value: '42'
    })

    assert.throws(sideEffect, Error, `Element with ID ${givenId} not found!`)
  })
})
