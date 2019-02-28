import {expect} from 'chai'
import sinon from 'sinon'
import HasPositionUseCase from '../../../../openads/application/service/HasPositionUseCase'

describe('HasPositionUseCase test', () => {
  describe('hasPosition method', () => {
    it('should call the position repository to check the position existence', done => {
      const positionRepositoryMock = {
        has: () => Promise.resolve(true)
      }
      const hasSpy = sinon.spy(positionRepositoryMock, 'has')
      const useCase = new HasPositionUseCase({
        positionRepository: positionRepositoryMock
      })
      useCase
        .hasPosition({id: 1})
        .then(result => {
          expect(hasSpy.calledOnce).to.be.true
          expect(result).to.be.true
        })
        .then(() => done())
        .catch(err => {
          expect(err.message).equal('Position 1 not found.')
          done()
        })
    })
  })
})
