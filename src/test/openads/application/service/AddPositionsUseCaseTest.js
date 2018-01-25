import {expect} from 'chai'
import sinon from 'sinon'
import AddPositionsUseCase from '../../../../openads/application/service/AddPositionsUseCase'

describe('Add Positions Use Case', () => {
  const createLoggerMock = () => ({
    debug: (...params) => null,
    info: (...params) => null,
    warn: (...params) => null,
    error: (...params) => null
  })
  const createEventDispatcherMock = () => ({
    dispatch: (input) => null
  })
  const createPositionFactoryMock = ({create}) => ({
    create: (input) => create(input)
  })
  const createPositionRepositoryMock = ({create, exists}) => ({
    create: (input) => create(input),
    exists: (input) => exists(input)
  })
  describe('Create positions', () => {
    it('Should return a promise', () => {
      const addPositionsUseCase = new AddPositionsUseCase({})
      expect(addPositionsUseCase.addPositions()).to.be.a('promise')
    })
  })
  describe('Given two valid positions', () => {
    const givenPosition1 = {
      containerId: 'id1',
      name: 'name1',
      source: 'source1',
      placement: 'placement1',
      segmentation: {
        sample: 1
      }
    }
    const givenPosition2 = {
      containerId: 'id2',
      name: 'name2',
      source: 'source2',
      placement: 'placement2',
      segmentation: {
        sample: 2
      }
    }
    it('Should call to create the positions with both domain positions if it is the first time they are added', (done) => {
      const loggerMock = createLoggerMock()
      const eventDispatcherMock = createEventDispatcherMock()
      const positionFactoryMock = createPositionFactoryMock({
        create: (input) => input
      })
      const positionRepositoryMock = createPositionRepositoryMock({
        create: (input) => null,
        exists: (input) => false
      })

      const spyCreate = sinon.spy(positionRepositoryMock, 'create')
      const spyWarn = sinon.spy(loggerMock, 'warn')
      const spyDispatcher = sinon.spy(eventDispatcherMock, 'dispatch')

      const useCase = new AddPositionsUseCase({
        logger: loggerMock,
        eventDispatcher: eventDispatcherMock,
        positionFactory: positionFactoryMock,
        positionRepository: positionRepositoryMock
      })

      useCase.addPositions(givenPosition1, givenPosition2)
        .then(() => {
          expect(spyCreate.callCount).to.equal(2)
          expect(spyCreate.args[0][0]['containerId']).to.equal(givenPosition1.containerId)
          expect(spyCreate.args[1][0]['containerId']).to.equal(givenPosition2.containerId)
          expect(spyWarn.called).to.be.false
          expect(spyDispatcher.args[0][0]['eventName']).to.equal('START_ADD_POSITIONS')
          expect(spyDispatcher.args[1][0]['eventName']).to.equal('END_ADD_POSITIONS')
          done()
        })
        .catch(e => done(e))
    })
    it('Should call to create only with the non existing positions and warn about the existing ones', (done) => {
      const loggerMock = createLoggerMock()
      const eventDispatcherMock = createEventDispatcherMock()
      const positionFactoryMock = createPositionFactoryMock({
        create: (input) => input
      })
      const positionRepositoryMock = createPositionRepositoryMock({
        create: (input) => null,
        exists: (input) => input.containerId !== givenPosition2.containerId
      })

      const spyCreate = sinon.spy(positionRepositoryMock, 'create')
      const spyWarn = sinon.spy(loggerMock, 'warn')
      const spyDispatcher = sinon.spy(eventDispatcherMock, 'dispatch')

      const useCase = new AddPositionsUseCase({
        logger: loggerMock,
        eventDispatcher: eventDispatcherMock,
        positionFactory: positionFactoryMock,
        positionRepository: positionRepositoryMock
      })

      useCase.addPositions(givenPosition1, givenPosition2)
        .then(() => {
          expect(spyCreate.calledOnce).to.be.true
          expect(spyCreate.args[0][0]['containerId']).to.equal(givenPosition2.containerId)
          expect(spyWarn.calledOnce).to.be.true
          expect(spyDispatcher.calledTwice).to.be.true
          expect(spyDispatcher.args[0][0]['eventName']).to.equal('START_ADD_POSITIONS')
          expect(spyDispatcher.args[1][0]['eventName']).to.equal('END_ADD_POSITIONS')
          done()
        })
        .catch(e => done(e))
    })
  })
})
