import {expect} from 'chai'
import sinon from 'sinon'
import AddPositionUseCase from '../../../../openads/application/service/AddPositionUseCase'
import DefaultPositionFactory from '../../../../openads/infrastructure/position/DefaultPositionFactory'
import {AD_AVAILABLE, AD_ERROR, AD_NO_BID} from '../../../../openads/infrastructure/connector/appnexus/event/events'
import {POSITION_NOT_VISIBLE} from '../../../../openads/domain/position/positionStatus'

describe('Add Position use case', function () {
  describe('given an non existent Position', function () {
    it('should return a Promise', function () {
      const givenPositionDTO = {}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve({}),
        saveOrUpdate: ({position}) => Promise.resolve(position)
      }
      const adRepositoryMock = {
        find: ({id}) => Promise.resolve({})
      }
      const positionFactory = new DefaultPositionFactory()

      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory,
        adRepository: adRepositoryMock
      })
      expect(addPositionUseCase.addPosition(givenPositionDTO)).to.be.a('promise')
    })

    it('should call to position factory and position repository once', function (done) {
      const givenPositionRequest = {}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(false),
        saveOrUpdate: ({position}) => Promise.resolve(position)
      }
      const adRepositoryMock = {
        find: ({id}) => Promise.resolve({data: {}, status: AD_AVAILABLE})
      }
      const positionRepositoryFindSpy = sinon.spy(positionRepositoryMock, 'find')
      const positionRepositorySaveOrUpdateSpy = sinon.spy(positionRepositoryMock, 'saveOrUpdate')
      const adRepositorySpy = sinon.spy(adRepositoryMock, 'find')

      const positionFactory = new DefaultPositionFactory()
      const positionFactorySpy = sinon.spy(positionFactory, 'create')
      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory,
        adRepository: adRepositoryMock
      })
      addPositionUseCase.addPosition(givenPositionRequest)
        .then(() => {
          expect(positionRepositoryFindSpy.calledOnce, 'repository find should be called once').to.be.true
          expect(positionRepositorySaveOrUpdateSpy.calledOnce, 'repository saveOrUpdate should be called once').to.be.true
          expect(positionFactorySpy.calledOnce, 'factory should be called once').to.be.true
          expect(adRepositorySpy.calledOnce, 'adRepositorySpy should be called once').to.be.true
          done()
        })
        .catch(error => done(error))
    })
    it('should return the position with the Ad inside if all goes fine', function (done) {
      const givenAd = {data: '<html>inside</html>', status: AD_AVAILABLE}
      const givenPositionRequest = {id: 'aId'}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(false),
        saveOrUpdate: ({position}) => Promise.resolve(position)
      }
      const adRepositoryMock = {
        find: ({id}) => Promise.resolve(givenAd)
      }

      const positionFactory = new DefaultPositionFactory()
      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory,
        adRepository: adRepositoryMock
      })

      addPositionUseCase.addPosition(givenPositionRequest)
        .then((position) => {
          expect([position.id, position.status, position.ad]).to.deep.equal([
            givenPositionRequest.id,
            POSITION_NOT_VISIBLE,
            givenAd
          ])
          done()
        })
        .catch(error => done(error))
    })
    it('should return the position with an unresolved Ad with AD_ERROR status if ad server fetch fails for non domain errors', function (done) {
      const givenPositionRequest = {id: 'aId'}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(false),
        saveOrUpdate: ({position}) => Promise.resolve(position)
      }
      const adRepositoryMock = {
        find: ({id}) => Promise.reject(new Error('A timeout error for example'))
      }

      const positionFactory = new DefaultPositionFactory()
      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory,
        adRepository: adRepositoryMock
      })

      addPositionUseCase.addPosition(givenPositionRequest)
        .then(() => {
          done(new Error('Should fail with position not available error'))
        })
        .catch(error => {
          expect(error.name).to.equal('PositionAdNotAvailableError')
          expect(error.position.ad.status).to.equal(AD_ERROR)
          done()
        })
    })
    it('should return the position with an unresolved Ad with AD_NO_BID status ad server returns a adNoBid response', function (done) {
      const givenAd = {data: 'ad no bid', status: AD_NO_BID}
      const givenPositionRequest = {id: 'aId'}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(false),
        saveOrUpdate: ({position}) => Promise.resolve(position)
      }
      const adRepositoryMock = {
        find: ({id}) => Promise.resolve(givenAd)
      }

      const positionFactory = new DefaultPositionFactory()
      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory,
        adRepository: adRepositoryMock
      })

      addPositionUseCase.addPosition(givenPositionRequest)
        .then(() => {
          done(new Error('Should fail with position not available error'))
        })
        .catch(error => {
          expect(error.name).to.equal('PositionAdNotAvailableError')
          expect(error.position.ad.status).to.equal(AD_NO_BID)
          done()
        })
    })
  })
  describe('given an existing position', function () {
    it('should return a PositionAlreadyExists error', function (done) {
      const givenPositionRequest = {id: 'aId'}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(givenPositionRequest)
      }
      const adRepositoryMock = {}
      const positionFactory = new DefaultPositionFactory()

      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory,
        adRepository: adRepositoryMock
      })

      addPositionUseCase.addPosition(givenPositionRequest)
        .then(() => {
          done(new Error('Should reject with a position already exists error'))
        })
        .catch(error => {
          expect(error.name).to.equal('PositionAlreadyExists')
          expect(error.position).to.not.undefined
          done()
        })
    })
  })
})
