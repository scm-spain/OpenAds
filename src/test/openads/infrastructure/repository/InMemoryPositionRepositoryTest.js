import {expect} from 'chai'
import sinon from 'sinon'
import InMemoryPositionRepository from '../../../../openads/infrastructure/repository/InMemoryPositionRepository'

describe('In Memory Position Repository', () => {
  const createLoggerMock = () => ({
    debug: (...params) => null,
    info: (...params) => null,
    warn: (...params) => null,
    error: (...params) => null
  })
  describe('Create position', () => {
    it('Should return a promise', () => {
      const repository = new InMemoryPositionRepository({})
      expect(repository.create({})).to.be.a('promise')
    })
  })
  describe('Exist position', () => {
    it('Should return a promise', () => {
      const repository = new InMemoryPositionRepository({})
      expect(repository.exists({})).to.be.a('promise')
    })
  })
  describe('Creating and looking for existance of a position', () => {
    const givenContainerId = 'id1'

    it('Should exist after creation without failure with unexisting containerId', (done) => {
      const loggerMock = createLoggerMock()
      const repository = new InMemoryPositionRepository({logger: loggerMock})
      repository.create({containerId: givenContainerId})
        .then(() => {
          repository.exists({containerId: givenContainerId})
            .then(exist => {
              expect(exist).to.be.true
              done()
            })
            .catch(e => done(e))
        })
        .catch(e => done(e))
    })
    it('Should fail attempting to create two times a position with same containerId', (done) => {
      const loggerMock = createLoggerMock()
      const repository = new InMemoryPositionRepository({logger: loggerMock})
      repository.create({containerId: givenContainerId})
        .then(() => {
          repository.create({containerId: givenContainerId})
            .then(() => done(new Error('Should fail')))
            .catch(e => done())
        })
        .catch(e => done(e))
    })
    it('Should tell that a position does not exist if it has not been created previously', (done) => {
      const loggerMock = createLoggerMock()
      const repository = new InMemoryPositionRepository({logger: loggerMock})
      repository.exists({containerId: givenContainerId})
        .then((result) => {
          if (result) {
            done(new Error('Exist should be false'))
          } else {
            done()
          }
        })
    })
  })
})
