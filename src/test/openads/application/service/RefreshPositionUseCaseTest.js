import {expect} from 'chai'
import {POSITION_VISIBLE} from '../../../../openads/domain/position/positionStatus'
import RefreshPositionUseCase from '../../../../openads/application/service/RefreshPositionUseCase'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import sinon from 'sinon'
import DefaultPositionFactory from '../../../../openads/infrastructure/position/DefaultPositionFactory'
import {AD_AVAILABLE} from '../../../../openads/domain/ad/adStatus'
import {POSITION_UPDATED} from '../../../../openads/domain/position/positionUpdated'

describe('Refresh Position use case', function() {
  describe('given a Position DTO of changes', function() {
    beforeEach(() => {
      DomainEventBus.clearAllObservers()
    })
    it('should return an updated position', function(done) {
      const givenPositionChanges = {
        source: 'appnexus',
        appnexus: {
          placement: 'blabla',
          segmentation: 'newSegmentation',
          sizes: [],
          native: {}
        }
      }
      const givenAd = {
        status: AD_AVAILABLE,
        data: {
          adType: 'banner'
        }
      }
      const positionFactory = new DefaultPositionFactory()
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'Name',
        specification: {
          source: 'appnexus',
          appnexus: {
            placement: 'blabla',
            segmentation: 'adsasd',
            sizes: [],
            native: {}
          }
        },
        status: POSITION_VISIBLE
      })
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(givenPosition),
        saveOrUpdate: ({position}) => Promise.resolve(position)
      }
      const adConnectorManagerMock = {
        getConnector: ({source}) =>
          Promise.resolve({
            refresh: ({id}) => givenAd
          })
      }
      const refreshPositionUseCase = new RefreshPositionUseCase({
        positionRepository: positionRepositoryMock,
        adConnectorManager: adConnectorManagerMock
      })
      const observerSpy = sinon.spy()
      DomainEventBus.register({
        eventName: POSITION_UPDATED,
        observer: ({payload, dispatcher}) => {
          expect(payload.id).to.be.equal(givenPosition.id)
          expect(
            payload.specification,
            'position specification not updated'
          ).to.be.equal(givenPositionChanges)
          observerSpy()
        }
      })
      refreshPositionUseCase
        .refreshPosition({id: '42', specification: givenPositionChanges})
        .then(positionUpdated => {
          expect(positionUpdated.id, 'position not updated').to.equal(
            givenPosition.id
          )
          expect(
            positionUpdated.specification,
            'position specification not updated'
          ).to.deep.equal(givenPositionChanges)
          expect(observerSpy.calledOnce, 'observer should be called once').to.be
            .true
          done()
        })
        .catch(error => done(error))
    })

    it('should return a PositionNotFoundException', function(done) {
      const givenPositionChanges = {
        source: 'appnexus',
        appnexus: {
          placement: 'blabla',
          segmentation: 'adsasd',
          sizes: [],
          native: {}
        }
      }
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(false)
      }
      const refreshPositionUseCase = new RefreshPositionUseCase({
        positionRepository: positionRepositoryMock
      })
      DomainEventBus.register({
        eventName: POSITION_UPDATED,
        observer: ({payload, dispatcher}) =>
          done(new Error('Observer shouldnt be called'))
      })
      refreshPositionUseCase
        .refreshPosition({id: 'notfound', position: givenPositionChanges})
        .then(positionUpdated => done(new Error('Shouldnt find the position')))
        .catch(error => {
          expect(error.name, 'error type wrong').to.equal(
            'PositionNotFoundException'
          )
          done()
        })
    })
  })
})
