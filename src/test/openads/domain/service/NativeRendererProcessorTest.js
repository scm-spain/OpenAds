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

      expect(createSpy.calledOnce).to.be.true
      expect(nativeRendererProcessor.hasRenderer({position: givenPosition})).to.be.true
      expect(() => {
        nativeRendererProcessor.getRenderer({position: givenPosition})
      }).to.not.throw()

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
    it('Should return false in hasRenderer if the position is not registered', () => {
      const givenPosition = 'TEST'

      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: {}
      })

      const hasRenderer = nativeRendererProcessor.hasRenderer({
        position: givenPosition
      })
      expect(hasRenderer).to.be.false
    })
    it('Should return throw an Error in getRenderer if the position is not registered', () => {
      const givenPosition = 'TEST'

      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: {}
      })

      expect(() => {
        nativeRendererProcessor.getRenderer({position: givenPosition})
      }).to.throw()
    })
  })
  describe('Given no position when adding a position renderer', () => {
    it('Should throw an error', () => {
      const givenRenderer = () => null
      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: {}
      })
      expect(() => {
        nativeRendererProcessor.addPositionRenderer({
          renderer: givenRenderer
        })
      }).to.throw()
    })
    describe('Given no renderer function when adding a position renderer', () => {
      it('Should throw an error if no renderer is specified', () => {
        const givenPosition = 'test'
        const nativeRendererProcessor = new NativeRendererProcessor({
          nativeRendererFactory: {}
        })
        expect(() => {
          nativeRendererProcessor.addPositionRenderer({
            position: givenPosition
          })
        }).to.throw()
      })
      it('Should throw an error if renderer is specified but not a function', () => {
        const givenPosition = 'test'
        const givenRenderer = 'not a function'
        const nativeRendererProcessor = new NativeRendererProcessor({
          nativeRendererFactory: {}
        })
        expect(() => {
          nativeRendererProcessor.addPositionRenderer({
            position: givenPosition,
            renderer: givenRenderer
          })
        }).to.throw()
      })
    })
  })
})
