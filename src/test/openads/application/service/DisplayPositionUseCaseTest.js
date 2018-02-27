import {expect} from 'chai'
import DisplayPositionUseCase from '../../../../openads/application/service/DisplayPositionUseCase'
import {POSITION_NOT_VISIBLE, POSITION_VISIBLE} from '../../../../openads/domain/position/positionStatus'
import Position from '../../../../openads/domain/position/Position'
import {AD_AVAILABLE, AD_NO_BID} from '../../../../openads/infrastructure/connector/appnexus/event/events'

describe('DisplayPositionUseCase test', () => {
  describe('display method test', () => {
    describe('Given a non existing position', () => {
      it('Should return a rejected promise with an appropriate error', (done) => {
        const positionRepositoryMock = {
          find: () => Promise.resolve(false)
        }
        const displayPositionUseCase = new DisplayPositionUseCase({positionRepository: positionRepositoryMock})
        displayPositionUseCase.displayPosition({id: 1})
          .then(() => done(new Error('Should be failing')))
          .catch((err) => {
            expect(err.message).equal('Position 1 not found.')
            done()
          })
      })
    })
    describe('Given an existing position', () => {
      it('Should save the position with the new state when AD has AD_AVAILABLE status', (done) => {
        const givenIdPosition = 1
        const givenAd = {
          status: AD_AVAILABLE,
          data: {
            adType: 'banner'
          }
        }
        const givenPosition = new Position({
          id: givenIdPosition,
          status: POSITION_NOT_VISIBLE,
          ad: givenAd
        })
        const positionRepositoryMock = {
          find: () => Promise.resolve(givenPosition),
          saveOrUpdate: ({position}) => Promise.resolve(position)
        }
        const displayPositionUseCase = new DisplayPositionUseCase({positionRepository: positionRepositoryMock})
        displayPositionUseCase.displayPosition({id: givenIdPosition})
          .then((position) => {
            expect(position.status).equal(POSITION_VISIBLE)
            done()
          }).catch(e => done(e))
      })
      it('Should reject when the position has an AD with status not equal to AD_AVAILABLE', (done) => {
        const givenIdPosition = 1
        const givenAd = {
          status: AD_NO_BID
        }
        const givenPosition = new Position({
          id: givenIdPosition,
          status: POSITION_NOT_VISIBLE,
          ad: givenAd
        })
        const positionRepositoryMock = {
          find: () => Promise.resolve(givenPosition),
          saveOrUpdate: ({position}) => Promise.resolve(position)
        }
        const displayPositionUseCase = new DisplayPositionUseCase({positionRepository: positionRepositoryMock})
        displayPositionUseCase.displayPosition({id: givenIdPosition})
          .then(() => {
            done(new Error('Should be failing'))
          })
          .catch(err => {
            expect(err.name).equal('PositionAdNotAvailableError')
            done()
          })
      })
      it('Should reject when the position has an AD with status not equal to AD_AVAILABLE', (done) => {
        const givenIdPosition = 1
        const givenAd = {
          status: AD_AVAILABLE,
          data: {
            adType: 'native'
          }
        }
        const givenPosition = new Position({
          id: givenIdPosition,
          status: POSITION_NOT_VISIBLE,
          ad: givenAd
        })
        const positionRepositoryMock = {
          find: () => Promise.resolve(givenPosition),
          saveOrUpdate: ({position}) => Promise.resolve(position)
        }
        const displayPositionUseCase = new DisplayPositionUseCase({positionRepository: positionRepositoryMock})
        displayPositionUseCase.displayPosition({id: givenIdPosition})
          .then(() => {
            done(new Error('Should be failing'))
          })
          .catch(err => {
            expect(err.name).equal('PositionAdIsNativeError')
            done()
          })
      })
    })
  })
})
