/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import sinon from 'sinon'
import AppNexusConnectorImpl from '../../../../openads/infrastructure/connector/appnexus/AppNexusConnectorImpl'

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
})
