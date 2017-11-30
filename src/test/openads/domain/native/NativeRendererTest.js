/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import sinon from 'sinon'
import NativeRenderer from '../../../../openads/domain/ad/native/NativeRenderer'

describe('Native Renderer', () => {
  describe('Given valid containerId, json and impressionTrackings', () => {
    it('Should call to the client render method and print the impression trackings', () => {
      const givenContainerId = 'test'
      const givenJson = {a: 'json'}
      const givenImpressionTrackers = ['url_i1', 'url_i2']

      const createElementMock = (e) => {
        let element = {
          _appendedChildren: []
        }
        element.appendChild = (c) => element._appendedChildren.push(c)
        return element
      }
      const container = createElementMock()
      const domDriverMock = {
        getElementById: ({id}) => {
          return id === givenContainerId ? container : null
        },
        createElement: (e) => createElementMock(e)
      }

      const rendererMock = {
        rendererFunction: ({json}) => {
          return {
            html: 'hello',
            clickElementId: 'id'
          }
        }
      }
      const clientRendererFunctionSpy = sinon.spy(rendererMock, 'rendererFunction')

      const nativeRenderer = new NativeRenderer({
        clientRenderer: rendererMock.rendererFunction,
        domDriver: domDriverMock
      })

      nativeRenderer.render({
        containerId: givenContainerId,
        json: givenJson,
        impressionTrackers: givenImpressionTrackers
      })

      expect(clientRendererFunctionSpy.calledOnce).to.be.true
      expect(clientRendererFunctionSpy.getCall(0).args[0].json).to.deep.equal(givenJson)

      expect(container._appendedChildren.length).to.equal(givenImpressionTrackers.length)
    })
  })
  describe('Given valid containerId, json and impressionTrackings and providing clickTrackers', () => {
    it('Should register a method to the returned clickElementId that write clickTrackers to container if previous onclick was not defined on it', () => {
      const givenContainerId = 'test'
      const givenClickElementId = 'clickable'
      const givenJson = {a: 'json'}
      const givenImpressionTrackers = ['url_i1', 'url_i2']
      const givenClickTrackers = ['url_t1', 'url_t2']

      const createElementMock = (e) => {
        let element = {
          _appendedChildren: []
        }
        element.appendChild = (c) => element._appendedChildren.push(c)
        return element
      }
      const container = createElementMock()
      const clickable = createElementMock()
      const domDriverMock = {
        getElementById: ({id}) => {
          return id === givenContainerId ? container : id === givenClickElementId ? clickable : null
        },
        createElement: (e) => createElementMock(e)
      }

      const rendererMock = {
        rendererFunction: ({json}) => {
          return {
            html: 'hello',
            clickElementId: givenClickElementId
          }
        }
      }

      const nativeRenderer = new NativeRenderer({
        clientRenderer: rendererMock.rendererFunction,
        domDriver: domDriverMock
      })

      nativeRenderer.render({
        containerId: givenContainerId,
        json: givenJson,
        impressionTrackers: givenImpressionTrackers,
        clickTrackers: givenClickTrackers
      })

      expect(clickable.onclick).not.undefined

      clickable.onclick()

      expect(container._appendedChildren.length).to.equal(givenImpressionTrackers.length + givenClickTrackers.length)
    })
    it('Should register a method to the returned clickElementId that write clickTrackers to container and call previous element onclickif previous onclick was defined on it', () => {
      const givenContainerId = 'test'
      const givenClickElementId = 'clickable'
      const givenJson = {a: 'json'}
      const givenImpressionTrackers = ['url_i1', 'url_i2']
      const givenClickTrackers = ['url_t1', 'url_t2']

      const createElementMock = (e) => {
        let element = {
          _appendedChildren: []
        }
        element.appendChild = (c) => element._appendedChildren.push(c)
        return element
      }
      const container = createElementMock()
      const clickable = createElementMock()
      clickable.onclick = () => null

      const clickableClickSpy = sinon.spy(clickable, 'onclick')

      const domDriverMock = {
        getElementById: ({id}) => {
          return id === givenContainerId ? container : id === givenClickElementId ? clickable : null
        },
        createElement: (e) => createElementMock(e)
      }

      const rendererMock = {
        rendererFunction: ({json}) => {
          return {
            html: 'hello',
            clickElementId: givenClickElementId
          }
        }
      }

      const nativeRenderer = new NativeRenderer({
        clientRenderer: rendererMock.rendererFunction,
        domDriver: domDriverMock
      })

      nativeRenderer.render({
        containerId: givenContainerId,
        json: givenJson,
        impressionTrackers: givenImpressionTrackers,
        clickTrackers: givenClickTrackers
      })

      expect(clickable.onclick).not.undefined

      clickable.onclick()

      expect(container._appendedChildren.length).to.equal(givenImpressionTrackers.length + givenClickTrackers.length)
      expect(clickableClickSpy.calledOnce).to.be.true
    })
  })
})
