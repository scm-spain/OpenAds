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
      let appNexusClientMock = {
        'debug': false
      }
      const appNexusConnector = new AppNexusConnectorImpl({source, connectorData, appNexusClient: appNexusClientMock})
      const mutatedAppNexusConnector = appNexusConnector.activateDebugMode()

      expect(appNexusClientMock.debug).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
    })

    it('should create a new instance of AppNexusConnectorImpl and push setPageOpts function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      let appNexusClientMock = {
        anq: appNexusQueue,
        setPageOpts: ({member, keywords}) => undefined
      }
      const appNexusConnector = new AppNexusConnectorImpl({source, connectorData, appNexusClient: appNexusClientMock})
      const mutatedAppNexusConnector = appNexusConnector.setPageOpts({
        member: 3296,
        keywords: 'forlayo&minglanillas'
      })

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
    })

    it('should create a new instance of AppNexusConnectorImpl and push onEvent function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      let appNexusClientMock = {
        anq: appNexusQueue,
        onEvent: ({event, targetId, callback}) => undefined
      }
      const appNexusConnector = new AppNexusConnectorImpl({source, connectorData, appNexusClient: appNexusClientMock})
      const mutatedAppNexusConnector = appNexusConnector.onEvent({
        callback: () => undefined,
        event: 'adAvailable',
        targetId: 'forlayoDiv'
      })

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
    })

    it('should create a new instance of AppNexusConnectorImpl and push defineTag function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      let appNexusClientMock = {
        anq: appNexusQueue,
        defineTag: ({invCode, sizes, targetId}) => undefined
      }
      const appNexusConnector = new AppNexusConnectorImpl({source, connectorData, appNexusClient: appNexusClientMock})
      const mutatedAppNexusConnector = appNexusConnector.defineTag({
        targetId: 'forlayoDiv',
        invCode: 'lalla',
        sizes: [728, 90]
      })

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
    })
    it('should create a new instance of AppNexusConnectorImpl and push loadTags function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      let appNexusClientMock = {
        anq: appNexusQueue,
        loadTags: () => undefined
      }
      const appNexusConnector = new AppNexusConnectorImpl({source, connectorData, appNexusClient: appNexusClientMock})
      const mutatedAppNexusConnector = appNexusConnector.loadTags()

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
    })
    it('should create a new instance of AppNexusConnectorImpl and push showTag function to the queue', function () {
      const source = 'AppNexus'
      const connectorData = { 'Member': 3296 }
      let appNexusQueue = []
      const qSpy = sinon.spy(appNexusQueue, 'push')
      let appNexusClientMock = {
        anq: appNexusQueue,
        showTag: ({target}) => undefined
      }
      const appNexusConnector = new AppNexusConnectorImpl({source, connectorData, appNexusClient: appNexusClientMock})
      const mutatedAppNexusConnector = appNexusConnector.showTag({target: 'Odin'})

      expect(appNexusClientMock.anq).to.have.lengthOf(1)
      expect(qSpy.called).to.be.true
      expect(mutatedAppNexusConnector).to.be.an.instanceof(AppNexusConnectorImpl)
    })
  })
  describe('Given two events registered for two different targets', () => {
    beforeEach('Define the events', () => {
      this.givenEvent11 = {event: 'event1', targetId: 'target1', callback: () => null}
      this.givenEvent12 = {event: 'event1', targetId: 'target2', callback: () => null}
      this.givenEvent21 = {event: 'event2', targetId: 'target1', callback: () => null}
      this.givenEvent22 = {event: 'event2', targetId: 'target2', callback: () => null}
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

        const appNexusConnector = new AppNexusConnectorImpl({appNexusClient: appNexusClientMock, source: {}, connectorData: {}})
        appNexusConnector.onEvent(this.givenEvent11)
        appNexusConnector.onEvent(this.givenEvent12)
        appNexusConnector.onEvent(this.givenEvent21)
        appNexusConnector.onEvent(this.givenEvent22)

        expect(onEventSpy.callCount).to.equal(4)
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

        const appNexusConnector = new AppNexusConnectorImpl({appNexusClient: appNexusClientMock, source: {}, connectorData: {}})
        appNexusConnector.onEvent(this.givenEvent11)
        appNexusConnector.onEvent(this.givenEvent12)
        appNexusConnector.onEvent(this.givenEvent21)
        appNexusConnector.onEvent(this.givenEvent22)

        appNexusConnector.reset()

        expect(offEventSpy.callCount).to.equal(4)
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

      const appNexusConnectorImpl = new AppNexusConnectorImpl({source: sourceMock, connectorData: connectorDataMock, appNexusClient: appNexusClientMock})

      appNexusConnectorImpl.setPageOpts({})
      appNexusConnectorImpl.defineTag({})
      appNexusConnectorImpl.loadTags({})
      appNexusConnectorImpl.showTag({})

      expect(setPageOptsSpy.called).to.be.true
      expect(defineTagSpy.called).to.be.true
      expect(loadTagsSpy.called).to.be.true
      expect(showTagSpy.called).to.be.true
    })
  })
})
