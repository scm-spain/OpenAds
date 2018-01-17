
import {expect} from 'chai'
import sinon from 'sinon'
import AppNexusAdRepository from '../../../../../openads/infrastructure/repository/appnexus/AppNexusAdRepository'

describe('AppNexus repository', function () {
  beforeEach(function () {
    this.appNexusConnectorMock = {
      activateDebugMode: () => this.appNexusConnectorMock,
      setPageOpts: ({data}) => this.appNexusConnectorMock,
      onEvent: ({event, targetId, callback}) => {
        if (event === 'adAvailable') callback()
        return this.appNexusConnectorMock
      },
      defineTag: ({data}) => this.appNexusConnectorMock,
      loadTags: () => this.appNexusConnectorMock,
      reset: () => null
    }
    this.appNexusResultMapperMock = {
      mapResponseToDomain: ({appNexusResponse}) => {}
    }
    this.requestMock = {
      member: {},
      targetId: {},
      invCode: {},
      sizes: {},
      keywords: {},
      native: {}
    }
    this.appNexusRequestMapperMock = {
      mapDomainToRequest: ({member, targetId, invCode, sizes, keywords, native}) => this.requestMock
    }
    this.onEventSpy = sinon.spy(this.appNexusConnectorMock, 'onEvent')
    this.defineTagSpy = sinon.spy(this.appNexusConnectorMock, 'defineTag')
    this.loadTagsSpy = sinon.spy(this.appNexusConnectorMock, 'loadTags')
    this.resetSpy = sinon.spy(this.appNexusConnectorMock, 'reset')
    this.mapResponseToDomainSpy = sinon.spy(this.appNexusResultMapperMock, 'mapResponseToDomain')
    this.mapDomainToRequestSpy = sinon.spy(this.appNexusRequestMapperMock, 'mapDomainToRequest')
  })
  describe('given a valid adRequest', function () {
    it('should return a Promise', function () {
      const givenAdRequest = {}

      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock,
        appNexusRequestMapper: this.appNexusRequestMapperMock
      })

      expect(appnexusRepository.findAd({
        adRequest: givenAdRequest
      })).to.be.a('promise')
    })
    it('should call to connector methods and return a resolved Promise', function (done) {
      const givenAdRequest = {}

      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock,
        appNexusRequestMapper: this.appNexusRequestMapperMock
      })

      appnexusRepository.findAd({
        adRequest: givenAdRequest
      })
        .then(ad => {
          expect(this.onEventSpy.callCount, 'onEvent has not registered all events').to.equal(3)
          expect(this.onEventSpy.args[0][0]['event'], 'adAvailable not registered').to.equal('adAvailable')
          expect(this.onEventSpy.args[1][0]['event'], 'adBadRequest not registered').to.equal('adBadRequest')
          expect(this.onEventSpy.args[2][0]['event'], 'adError not registered').to.equal('adError')
          expect(this.defineTagSpy.calledOnce, 'defineTag not called once').to.be.true
          expect(this.loadTagsSpy.calledOnce, 'loadTags not called once').to.be.true
          expect(this.mapResponseToDomainSpy.calledOnce, 'mapResponseToDomain not called once').to.be.true
          expect(this.mapDomainToRequestSpy.calledOnce, 'mapResponseToDomain not called once').to.be.true
          done()
        })
        .catch(error => done(error))
    })

    it('should return a rejected Promise when someone call to callback on adBadRequest event', function (done) {
      const givenAdRequest = {}

      this.appNexusConnectorMock = {
        activateDebugMode: () => this.appNexusConnectorMock,
        setPageOpts: ({data}) => this.appNexusConnectorMock,
        onEvent: ({event, targetId, callback}) => {
          if (event === 'adBadRequest') callback(new Error('error'))
          return this.appNexusConnectorMock
        },
        defineTag: ({data}) => this.appNexusConnectorMock,
        loadTags: () => this.appNexusConnectorMock
      }

      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock,
        appNexusRequestMapper: this.appNexusRequestMapperMock
      })

      appnexusRepository.findAd({
        adRequest: givenAdRequest
      })
        .then(ad => done(new Error('Promise should resolve as rejected')))
        .catch(() => done())
    })
  })

  describe('Calling the reset method', function () {
    it('Should return a promise', function () {
      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock,
        appNexusRequestMapper: this.appNexusRequestMapperMock
      })
      expect(appnexusRepository.reset()).to.be.a('promise')
    })
    it('Should reset the connector', function (done) {
      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock,
        appNexusRequestMapper: this.appNexusRequestMapperMock
      })
      appnexusRepository.reset()
        .then(() => {
          expect(this.resetSpy.calledOnce).to.be.true
          done()
        })
        .catch(e => done(e))
    })
  })
})
