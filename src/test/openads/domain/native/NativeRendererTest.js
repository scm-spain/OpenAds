/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import sinon from 'sinon'
import NativeRenderer from '../../../../openads/domain/ad/native/NativeRenderer'

describe('Native Renderer', () => {
  describe('Given valid containerId, json, impressionTrackings and clickTrackings', () => {
    it('Should call to the client render method and print the impression trackings', () => {
      const givenContainerId = 'test'
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
      const domDriverMock = {
        getElementById: ({id}) => {
          return id === givenContainerId ? container : null
        },
        createElement: (e) => createElementMock(e)
      }

      const clientRendererSpy = sinon.spy()
      const nativeRenderer = new NativeRenderer({
        clientRenderer: clientRendererSpy,
        domDriver: domDriverMock
      })

      nativeRenderer.render({
        containerId: givenContainerId,
        json: givenJson,
        impressionTrackers: givenImpressionTrackers,
        clickTrackers: givenClickTrackers
      })

      expect(clientRendererSpy.calledOnce).to.be.true
      expect(clientRendererSpy.getCall(0).args[0].json).to.deep.equal(givenJson)
      expect(clientRendererSpy.getCall(0).args[0].writeClickTrackers).to.be.a('function')

      expect(container._appendedChildren.length).to.equal(givenImpressionTrackers.length)
    })
  })
})
