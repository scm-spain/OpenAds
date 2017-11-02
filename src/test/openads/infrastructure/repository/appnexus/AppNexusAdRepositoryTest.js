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
      loadTags: () => this.appNexusConnectorMock
    }
    this.appNexusResultMapperMock = {
      mapResponseToDomain: ({appNexusResponse}) => {}
    }
    this.activateDebugModeSpy = sinon.spy(this.appNexusConnectorMock, 'activateDebugMode')
    this.setPageOptsSpy = sinon.spy(this.appNexusConnectorMock, 'setPageOpts')
    this.onEventSpy = sinon.spy(this.appNexusConnectorMock, 'onEvent')
    this.defineTagSpy = sinon.spy(this.appNexusConnectorMock, 'defineTag')
    this.loadTagsSpy = sinon.spy(this.appNexusConnectorMock, 'loadTags')
    this.mapResponseToDomainSpy = sinon.spy(this.appNexusResultMapperMock, 'mapResponseToDomain')
  })
  describe('given a valid adRequest', function () {
    it('should return a Promise', function () {
      const givenAdRequest = {}

      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock
      })

      expect(appnexusRepository.findAd({
        adRequest: givenAdRequest
      })).to.be.a('promise')
    })
    it('should call to connector methods and return a resolved Promise', function (done) {
      const givenAdRequest = {}

      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock
      })

      appnexusRepository.findAd({
        adRequest: givenAdRequest
      })
        .then(ad => {
          expect(this.activateDebugModeSpy.calledOnce, 'activateDebugMode not called once').to.be.true
          expect(this.setPageOptsSpy.calledOnce, 'setPageOpts not called once').to.be.true
          expect(this.onEventSpy.calledTwice, 'onEvent not called twice').to.be.true
          expect(this.defineTagSpy.calledOnce, 'defineTag not called once').to.be.true
          expect(this.loadTagsSpy.calledOnce, 'loadTags not called once').to.be.true
          expect(this.mapResponseToDomainSpy.calledOnce, 'mapResponseToDomain not called once').to.be.true
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
          if (event === 'adBadRequest') callback('error')
          return this.appNexusConnectorMock
        },
        defineTag: ({data}) => this.appNexusConnectorMock,
        loadTags: () => this.appNexusConnectorMock
      }

      const appnexusRepository = new AppNexusAdRepository({
        appNexusConnector: this.appNexusConnectorMock,
        appNexusResultMapper: this.appNexusResultMapperMock
      })

      appnexusRepository.findAd({
        adRequest: givenAdRequest
      })
        .then(ad => done(new Error('Promise should resolve as rejected')))
        .catch(error => {
          done()
        })
    })
  })
})
