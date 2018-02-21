import {expect} from 'chai'
import sinon from 'sinon'
import AddPositionUseCase from '../../../../openads/application/service/AddPositionUseCase'
import ProxyPositionFactory from '../../../../openads/infrastructure/position/ProxyPositionFactory'

describe('Add Position use case', function () {
  describe('given an non existent Position', function () {
    it('should return a Promise', function () {
      const givenPositionDTO = {}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve({}),
        saveOrUpdate: ({position}) => Promise.resolve()
      }
      const positionFactory = new ProxyPositionFactory({proxyHandler: {}})

      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory
      })
      expect(addPositionUseCase.addPosition(givenPositionDTO)).to.be.a('promise')
    })

    it('should call to position factory and position repository once', function (done) {
      const givenPositionRequest = {}
      const positionRepositoryMock = {
        find: ({id}) => Promise.resolve(false),
        saveOrUpdate: ({position}) => Promise.resolve({
          show: () => null
        })
      }
      const positionRepositoryFindSpy = sinon.spy(positionRepositoryMock, 'find')
      const positionRepositorySaveOrUpdateSpy = sinon.spy(positionRepositoryMock, 'saveOrUpdate')

      const positionFactory = new ProxyPositionFactory({proxyHandler: {}})
      const positionFactorySpy = sinon.spy(positionFactory, 'create')
      const addPositionUseCase = new AddPositionUseCase({
        positionRepository: positionRepositoryMock,
        positionFactory: positionFactory
      })
      addPositionUseCase.addPosition(givenPositionRequest)
        .then(() => {
          expect(positionRepositoryFindSpy.calledOnce, 'repository find should be called once').to.be.true
          expect(positionRepositorySaveOrUpdateSpy.calledOnce, 'repository saveOrUpdate should be called once').to.be.true
          expect(positionFactorySpy.calledOnce, 'factory should be called once').to.be.true
          done()
        })
        .catch(error => done(error))
    })
  })
})
