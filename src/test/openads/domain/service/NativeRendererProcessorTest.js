
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
      const loggerSpy = sinon.spy()

      const loggerMock = {
        info: (title, log) => loggerSpy(),
        debug: (...params) => null
      }
      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: nativeRendererFactoryMock,
        logger: loggerMock
      })

      nativeRendererProcessor.addPositionRenderer({
        position: givenPosition,
        renderer: givenRenderer
      })

      expect(createSpy.calledOnce, 'create method from renderer factory should be called once').to.be.true
      expect(loggerSpy.calledOnce, 'logger info method should be called once').to.be.true
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
      const loggerSpy = sinon.spy()

      const loggerMock = {
        info: (title, log) => loggerSpy()
      }
      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: nativeRendererFactoryMock,
        logger: loggerMock
      })

      nativeRendererProcessor.addPositionRenderer({
        position: givenPosition,
        renderer: givenRenderer
      })
      nativeRendererProcessor.removePositionRenderer({position: givenPosition})

      expect(nativeRendererProcessor.hasRenderer({position: givenPosition})).to.be.false
      expect(loggerSpy.calledTwice, 'logger info method should be called twice, one for addPositionRenderer ').to.be.true
    })
    it('Should return false in hasRenderer if the position is not registered', () => {
      const givenPosition = 'TEST'
      const loggerMock = sinon.stub()

      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: {},
        logger: loggerMock
      })

      const hasRenderer = nativeRendererProcessor.hasRenderer({
        position: givenPosition
      })
      expect(hasRenderer).to.be.false
    })
    it('Should return throw an Error in getRenderer if the position is not registered', () => {
      const givenPosition = 'TEST'
      const loggerMock = sinon.stub()

      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: {},
        logger: loggerMock
      })

      expect(() => {
        nativeRendererProcessor.getRenderer({position: givenPosition})
      }).to.throw()
    })
  })
  describe('Given no position when adding a position renderer', () => {
    it('Should throw an error', () => {
      const givenRenderer = () => null
      const loggerMock = { info: () => null }

      const nativeRendererProcessor = new NativeRendererProcessor({
        nativeRendererFactory: {},
        logger: loggerMock
      })
      expect(() => {
        nativeRendererProcessor.addPositionRenderer({
          renderer: givenRenderer
        })
      }).to.throw('Position is required')
    })
    describe('Given no renderer function when adding a position renderer', () => {
      it('Should throw an error if no renderer is specified', () => {
        const givenPosition = 'test'
        const loggerMock = { info: () => null }

        const nativeRendererProcessor = new NativeRendererProcessor({
          nativeRendererFactory: {},
          logger: loggerMock
        })
        expect(() => {
          nativeRendererProcessor.addPositionRenderer({
            position: givenPosition
          })
        }).to.throw('Renderer must be a function')
      })
      it('Should throw an error if renderer is specified but not a function', () => {
        const givenPosition = 'test'
        const givenRenderer = 'not a function'
        const loggerMock = { info: () => null }

        const nativeRendererProcessor = new NativeRendererProcessor({
          nativeRendererFactory: {},
          logger: loggerMock
        })
        expect(() => {
          nativeRendererProcessor.addPositionRenderer({
            position: givenPosition,
            renderer: givenRenderer
          })
        }).to.throw('Renderer must be a function')
      })
    })
  })
})
