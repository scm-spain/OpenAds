/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import sinon from 'sinon'
import AppNexusConnectorImpl from '../../../../../openads/infrastructure/connector/appnexus/AppNexusConnectorImpl'

describe('AppNexusConnectorImpl implementation', function () {
  describe('given valid constructor parameters', function () {
    it('should create a new instance of AppNexusConnectorImpl according to parameters', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusClientMock = {}

      const appNexusConnector = new AppNexusConnectorImpl({source, connectorData, appNexusClientMock})
      let member = appNexusConnector.member
      expect(member).to.equal(3296)
    })

    it('should create a new instance of AppNexusConnectorImpl and set debug mode to true', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      const loggerSpy = sinon.spy()
      let appNexusClientMock = {
        'debug': false
      }
      const loggerMock = {
        debug: (title, log) => loggerSpy()
      }
      const appNexusConnector = new AppNexusConnectorImpl({
        source,
        connectorData,
        appNexusClient: appNexusClientMock,
        logger: loggerMock
      })
      const mutatedAppNexusConnector = appNexusConnector.activateDebugMode()

      expect(appNexusClientMock.debug).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
      expect(loggerSpy.calledOnce, 'logger debug method should be called twice, one for addPositionRenderer ').to.be.true
    })

    it('should create a new instance of AppNexusConnectorImpl and push setPageOpts function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      const loggerSpy = sinon.spy()
      let appNexusClientMock = {
        anq: appNexusQueue,
        setPageOpts: ({member, keywords}) => undefined
      }
      const loggerMock = {
        debug: (title, log) => loggerSpy()
      }
      const appNexusConnector = new AppNexusConnectorImpl({
        source,
        connectorData,
        appNexusClient: appNexusClientMock,
        logger: loggerMock
      })
      const mutatedAppNexusConnector = appNexusConnector.setPageOpts({
        member: 3296,
        keywords: 'forlayo&minglanillas'
      })

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
      expect(loggerSpy.calledOnce, 'logger debug method should be called twice, one for addPositionRenderer ').to.be.true
    })

    it('should create a new instance of AppNexusConnectorImpl and push onEvent function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      const loggerSpy = sinon.spy()
      let appNexusClientMock = {
        anq: appNexusQueue,
        onEvent: ({event, targetId, callback}) => undefined
      }
      const loggerMock = {
        debug: (title, log) => loggerSpy()
      }
      const appNexusConnector = new AppNexusConnectorImpl({
        source,
        connectorData,
        appNexusClient: appNexusClientMock,
        logger: loggerMock
      })
      const mutatedAppNexusConnector = appNexusConnector.onEvent({
        callback: () => undefined,
        event: 'adAvailable',
        targetId: 'forlayoDiv'
      })

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
      expect(loggerSpy.calledOnce, 'logger debug method should be called twice, one for addPositionRenderer ').to.be.true
    })

    it('should create a new instance of AppNexusConnectorImpl and push defineTag function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      const loggerSpy = sinon.spy()
      let appNexusClientMock = {
        anq: appNexusQueue,
        defineTag: ({invCode, sizes, targetId}) => undefined
      }
      const loggerMock = {
        debug: (title, log) => loggerSpy()
      }
      const appNexusConnector = new AppNexusConnectorImpl({
        source,
        connectorData,
        appNexusClient: appNexusClientMock,
        logger: loggerMock
      })
      const mutatedAppNexusConnector = appNexusConnector.defineTag({
        targetId: 'forlayoDiv',
        invCode: 'lalla',
        sizes: [728, 90]
      })

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
      expect(loggerSpy.calledOnce, 'logger debug method should be called twice, one for addPositionRenderer ').to.be.true
    })
    it('should create a new instance of AppNexusConnectorImpl and push loadTags function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      const loggerSpy = sinon.spy()
      let appNexusClientMock = {
        anq: appNexusQueue,
        loadTags: () => undefined
      }
      const loggerMock = {
        debug: (title, log) => loggerSpy()
      }
      const appNexusConnector = new AppNexusConnectorImpl({
        source,
        connectorData,
        appNexusClient: appNexusClientMock,
        logger: loggerMock
      })
      const mutatedAppNexusConnector = appNexusConnector.loadTags()

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
      expect(loggerSpy.calledOnce, 'logger debug method should be called twice, one for addPositionRenderer ').to.be.true
    })
    it('should create a new instance of AppNexusConnectorImpl and push showTag function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      const loggerSpy = sinon.spy()
      let appNexusClientMock = {
        anq: appNexusQueue,
        showTag: ({target}) => undefined
      }
      const loggerMock = {
        debug: (title, log) => loggerSpy()
      }
      const appNexusConnector = new AppNexusConnectorImpl({
        source,
        connectorData,
        appNexusClient: appNexusClientMock,
        logger: loggerMock
      })
      const mutatedAppNexusConnector = appNexusConnector.showTag({target: 'Odin'})

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
      expect(loggerSpy.calledOnce, 'logger debug method should be called twice, one for addPositionRenderer ').to.be.true
    })
  })
  describe('Given two events registered for two different targets', () => {
    beforeEach('Define the events', () => {
      this.givenEvent11 = {event: 'event1', targetId: 'target1', callback: () => null}
      this.givenEvent12 = {event: 'event1', targetId: 'target2', callback: () => null}
      this.givenEvent21 = {event: 'event2', targetId: 'target1', callback: () => null}
      this.givenEvent22 = {event: 'event2', targetId: 'target2', callback: () => null}
      this.loggerMock = {
        debug: (title, log) => null
      }
    })
    describe('Registering the events', () => {
      it('Should register the events to the appnexus client', () => {
        const appNexusQueue = {
          push: (f) => f()
        }
        const appNexusClientMock = {
          anq: appNexusQueue,
          clearRequest: () => null,
          offEvent: () => null,
          onEvent: () => null
        }
        const onEventSpy = sinon.spy(appNexusClientMock, 'onEvent')
        const loggerSpy = sinon.spy(this.loggerMock, 'debug')

        const appNexusConnector = new AppNexusConnectorImpl({
          appNexusClient: appNexusClientMock,
          source: {},
          connectorData: {},
          logger: this.loggerMock
        })
        appNexusConnector
          .onEvent(this.givenEvent11)
          .onEvent(this.givenEvent12)
          .onEvent(this.givenEvent21)
          .onEvent(this.givenEvent22)

        expect(onEventSpy.callCount).to.equal(4)
        expect(loggerSpy.callCount, 'logger debug method should be called four times').to.equal(4)
      })
    })
    describe('Calling the reset method', () => {
      it('Should clear the requests and the registered events', () => {
        const appNexusQueue = {
          push: (f) => f()
        }
        const appNexusClientMock = {
          anq: appNexusQueue,
          clearRequest: () => null,
          offEvent: () => null,
          onEvent: () => null
        }
        const offEventSpy = sinon.spy(appNexusClientMock, 'offEvent')
        const loggerSpy = sinon.spy(this.loggerMock, 'debug')

        const appNexusConnector = new AppNexusConnectorImpl({
          appNexusClient: appNexusClientMock,
          source: {},
          connectorData: {},
          logger: this.loggerMock
        })
        appNexusConnector
          .onEvent(this.givenEvent11)
          .onEvent(this.givenEvent12)
          .onEvent(this.givenEvent21)
          .onEvent(this.givenEvent22)
          .reset()

        expect(offEventSpy.callCount).to.equal(4)
        expect(loggerSpy.callCount, 'logger debug method should be called four times for onEvent and one more for reset method').to.equal(5)
      })
    })
  })
  describe('Given an AppNexusConnector with an AppNexusClient', () => {
    it('Should call client methods', () => {
      const sourceMock = {}
      const connectorDataMock = {}
      const appNexusQueue = {
        push: (f) => f()
      }
      const appNexusClientMock = {
        anq: appNexusQueue,
        setPageOpts: () => null,
        defineTag: () => null,
        loadTags: () => null,
        showTag: () => null
      }
      const setPageOptsSpy = sinon.spy(appNexusClientMock, 'setPageOpts')
      const defineTagSpy = sinon.spy(appNexusClientMock, 'defineTag')
      const loadTagsSpy = sinon.spy(appNexusClientMock, 'loadTags')
      const showTagSpy = sinon.spy(appNexusClientMock, 'showTag')
      const loggerSpy = sinon.spy()

      const loggerMock = {
        debug: (title, log) => loggerSpy()
      }

      const appNexusConnectorImpl = new AppNexusConnectorImpl({
        source: sourceMock,
        connectorData: connectorDataMock,
        appNexusClient: appNexusClientMock,
        logger: loggerMock
      })

      appNexusConnectorImpl
        .setPageOpts({})
        .defineTag({})
        .loadTags({})
        .showTag({})

      expect(setPageOptsSpy.called).to.be.true
      expect(defineTagSpy.called).to.be.true
      expect(loadTagsSpy.called).to.be.true
      expect(showTagSpy.called).to.be.true
      expect(loggerSpy.callCount, 'logger debug method should be called four times').to.equal(4)
    })
  })
})
