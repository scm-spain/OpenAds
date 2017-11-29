/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import sinon from 'sinon'
import NativeRendererProcessor from '../../../../openads/domain/service/NativeRendererProcessor'

describe('Native Renderer Processor', () => {
  describe('Given a valid position and function', () => {
    it('Should be able to register a position renderer', () => {
      const givenPosition = 'TEST'
      const givenRenderer = () => null

      const nativeRendererFactoryMock = {
        create: () => { return {} }
      }
      const createSpy = sinon.spy(nativeRendererFactoryMock, 'create')

      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: nativeRendererFactoryMock
      })

      nativeRendererProcessor.addPositionRenderer({
        position: givenPosition,
        renderer: givenRenderer
      })

      expect(nativeRendererProcessor.hasRenderer({position: givenPosition})).to.be.true
      expect(createSpy.calledOnce).to.be.true

      nativeRendererProcessor.removePositionRenderer({position: givenPosition})

      expect(nativeRendererProcessor.hasRenderer({position: givenPosition})).to.be.false
    })
    it('Should be able to unregister a position renderer', () => {
      const givenPosition = 'TEST'
      const givenRenderer = () => null

      const nativeRendererFactoryMock = {
        create: () => { return {} }
      }

      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: nativeRendererFactoryMock
      })

      nativeRendererProcessor.addPositionRenderer({
        position: givenPosition,
        renderer: givenRenderer
      })
      nativeRendererProcessor.removePositionRenderer({position: givenPosition})

      expect(nativeRendererProcessor.hasRenderer({position: givenPosition})).to.be.false
    })
  })
})
