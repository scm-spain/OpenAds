import {expect} from 'chai'
import DisplayPositionUseCase from '../../../../openads/application/service/DisplayPositionUseCase'
import {POSITION_NOT_VISIBLE, POSITION_VISIBLE} from '../../../../openads/domain/position/positionStatus'
import Position from '../../../../openads/domain/position/Position'

describe('DisplayPositionUseCase test', () => {
  describe('display method test', () => {
    it('Should return a promise', (done) => {
      const positionRepositoryMock = {}
      const displayPositionUseCase = new DisplayPositionUseCase({positionRepository: positionRepositoryMock})
      expect(displayPositionUseCase.displayPosition({id: 1})).to.be.a('promise')
      done()
    })
    describe('Given a non existing position', () => {
      it('Should return a rejected promise with an appropriate error', (done) => {
        const positionRepositoryMock = {
          find: () => Promise.resolve(null)
        }
        const displayPositionUseCase = new DisplayPositionUseCase({positionRepository: positionRepositoryMock})
        displayPositionUseCase.displayPosition({id: 1})
          .then(() => done(new Error('Should be failing')))
          .catch((err) => {
            expect(err.message).equal('Position not found.')
            done()
          })
      })
    })
    describe('Given an existing position', () => {
      it('Should save the position with the new state', (done) => {
        const givenIdPosition = 1
        const givenPosition = new Position({
          id: givenIdPosition,
          status: POSITION_NOT_VISIBLE
        })
        const positionRepositoryMock = {
          find: () => Promise.resolve(givenPosition),
          save: ({position}) => Promise.resolve(position)
        }
        const displayPositionUseCase = new DisplayPositionUseCase({positionRepository: positionRepositoryMock})
        displayPositionUseCase.displayPosition({id: givenIdPosition})
          .then((position) => {
            expect(position.status).equal(POSITION_VISIBLE)
            done()
          })
      })
    })
  })
})
