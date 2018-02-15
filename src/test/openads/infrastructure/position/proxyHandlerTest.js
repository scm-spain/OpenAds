import {expect} from 'chai'
import sinon from 'sinon'
import ProxyPositionFactory from '../../../../openads/infrastructure/position/ProxyPositionFactory'
import proxyHandlerFactory from '../../../../openads/infrastructure/position/proxyHandlerFactory'
import {POSITION_NOT_VISIBLE} from '../../../../openads/domain/position/positionStatus'
import {AD_AVAILABLE, AD_ERROR} from '../../../../openads/infrastructure/connector/appnexus/event/events'

describe('Position Proxy Handler', function () {
  describe('given a Domain Position wrapped in a Proxy', function () {
    it('should return a Promise for property ad', function () {
      const appNexusConsumersRepositoryMock = {
        find: ({id}) => ({
          'status': AD_AVAILABLE,
          'width': 200
        })
      }
      const proxyPositionFactory = new ProxyPositionFactory({
        proxyHandler: proxyHandlerFactory(appNexusConsumersRepositoryMock)()
      })
      const givenPosition = proxyPositionFactory.create({
        id: '42',
        name: 'Odin',
        placement: 'islandia',
        segmentation: 'godmode=true',
        sizes: [[300, 300], [300, 200]],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      expect(givenPosition.ad).to.be.a('promise')
    })

    it('shouldn\'t return a Promise for any property except ad', function () {
      const appNexusConsumersRepositoryMock = {
        find: ({id}) => ({
          'status': AD_AVAILABLE,
          'width': 200
        })
      }
      const proxyPositionFactory = new ProxyPositionFactory({
        proxyHandler: proxyHandlerFactory(appNexusConsumersRepositoryMock)()
      })
      const givenPosition = proxyPositionFactory.create({
        id: '42',
        name: 'Odin',
        placement: 'islandia',
        segmentation: 'godmode=true',
        sizes: [[300, 300], [300, 200]],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      expect(givenPosition.id).not.to.be.a('promise')
      expect(givenPosition.name).not.to.be.a('promise')
    })

    it('should return a Promise for property ad with a given object from consumers repository', function () {
      const appNexusConsumersRepositoryMock = {
        find: ({id}) => ({
          'status': AD_AVAILABLE,
          'width': 200
        })
      }
      const proxyPositionFactory = new ProxyPositionFactory({
        proxyHandler: proxyHandlerFactory(appNexusConsumersRepositoryMock)()
      })
      const givenPosition = proxyPositionFactory.create({
        id: '42',
        name: 'Odin',
        placement: 'islandia',
        segmentation: 'godmode=true',
        sizes: [[300, 300], [300, 200]],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      givenPosition.ad.then(adResponse => {
        expect(adResponse.width).to.be.equal(200)
        expect(adResponse.status).to.be.equal(AD_AVAILABLE)
      })
    })
    it('should reject a Promise due a timeout exception', function (done) {
      const appNexusConsumersRepositoryMock = {
        find: ({id}) => undefined
      }
      const proxyPositionFactory = new ProxyPositionFactory({
        proxyHandler: proxyHandlerFactory(appNexusConsumersRepositoryMock)({
          timeout: 60
        })
      })
      const givenPosition = proxyPositionFactory.create({
        id: '42',
        name: 'Odin',
        placement: 'islandia',
        segmentation: 'godmode=true',
        sizes: [[300, 300], [300, 200]],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      givenPosition.ad
        .then(adResponse => done(new Error('Must fail by TIMEOUT!')))
        .catch(error => {
          expect(error.message).to.be.equal('Something in appnexus consumer failed to set adResponse data')
          done()
        })
    })

    it('should reject a Promise due a status NOT equal to AD_AVAILABLE', function (done) {
      const appNexusConsumersRepositoryMock = {
        find: ({id}) => ({
          'status': AD_ERROR,
          'data': {
            'width': 200
          }
        })
      }
      const proxyPositionFactory = new ProxyPositionFactory({
        proxyHandler: proxyHandlerFactory(appNexusConsumersRepositoryMock)()
      })
      const givenPosition = proxyPositionFactory.create({
        id: '42',
        name: 'Odin',
        placement: 'islandia',
        segmentation: 'godmode=true',
        sizes: [[300, 300], [300, 200]],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      givenPosition.ad
        .then(adResponse => done(new Error('Must fail by appnexus status response!')))
        .catch(error => {
          expect(error.status).to.be.equal(AD_ERROR)
          expect(error.cause.data.width).to.be.equal(200)
          done()
        })
    })

    it('should return a Promise just before the timeout limit', function (done) {
      const appNexusConsumersRepositoryMock = {
        find: ({id}) => undefined
      }
      const findStub = sinon.stub(appNexusConsumersRepositoryMock, 'find')
      findStub.onCall(0).returns(undefined)
      findStub.onCall(1).returns(undefined)
      findStub.onCall(2).returns({
        'status': AD_AVAILABLE,
        'data': {
          'width': 200
        }
      })
      const proxyPositionFactory = new ProxyPositionFactory({
        proxyHandler: proxyHandlerFactory(appNexusConsumersRepositoryMock)({
          wait: 20,
          timeout: 60
        })
      })
      const givenPosition = proxyPositionFactory.create({
        id: '42',
        name: 'Odin',
        placement: 'islandia',
        segmentation: 'godmode=true',
        sizes: [[300, 300], [300, 200]],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      givenPosition.ad
        .then(adResponse => {
          expect(adResponse.data.width).to.be.equal(200)
          expect(adResponse.status).to.be.equal(AD_AVAILABLE)
          done()
        })
        .catch(error => done(error))
    })
  })
})
