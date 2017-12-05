/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import Banner from '../../../../openads/domain/ad/banner/Banner'

describe('Banner', () => {
  describe('Given valid data to constructor', () => {
    it('Should create a Banner which getters give the given data', () => {
      const givenContainerId = '1'
      const givenPosition = '2'
      const givenSource = '3'
      const givenContent = '4'
      const givenSize = [1, 1]

      const banner = new Banner({
        containerId: givenContainerId,
        position: givenPosition,
        source: givenSource,
        content: givenContent,
        size: givenSize
      })

      expect(banner.containerId).to.equal(givenContainerId)
      expect(banner.position).to.equal(givenPosition)
      expect(banner.source).to.equal(givenSource)
      expect(banner.content).to.equal(givenContent)
      expect(banner.size).to.deep.equal(givenSize)
    })
  })
  describe('Given a banner instance', () => {
    it('Calling show method should dispatch the PRE_RENDER event before calling the renderer', () => {
      const givenContainerId = 'pos_1_id'
      const givenPosition = 'POS1'

      const givenCallback = ({eventName, position, payload}) => {
        expect(eventName).to.equal('PRE_RENDER')
        expect(position).to.equal(givenPosition)
        expect(payload.containerId).to.equal(givenContainerId)
        givenBanner._dispatched = true
      }
      const givenBanner = new Banner({
        containerId: 'pos_1_id',
        position: 'POS1',
        eventDispatcher: {
          dispatch: givenCallback
        },
        renderer: {
          render: () => {
            if (undefined === givenBanner._dispatched) {
              expect.fail('Event was not dispatched')
            }
            givenBanner._rendered = true
          }
        }
      })

      givenBanner.show()
      expect(givenBanner._dispatched).to.be.true
      expect(givenBanner._rendered).to.be.true
    })
  })
})
