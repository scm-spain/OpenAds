/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import Banner from '../../../../openads/domain/ad/banner/Banner'

describe('Banner', function () {
  describe('Given a banner instance', function () {
    it('Calling show method should dispatch the PRE_RENDER event before calling the renderer', function () {
      const givenContainerId = 'pos_1_id'
      const givenPosition = 'POS1'

      const givenCallback = ({eventName, position, payload}) => {
        expect(eventName).to.equal('PRE_RENDER')
        expect(position).to.equal(givenPosition)
        expect(payload.containerId).to.equal(givenContainerId)
        givenBanner.dispatched = true
      }
      const givenBanner = new Banner({
        containerId: 'pos_1_id',
        position: 'POS1',
        eventDispatcher: {
          dispatch: givenCallback
        },
        renderer: {
          render: () => {
            if (undefined === givenBanner.dispatched) {
              expect.fail('Event was not dispatched')
            }
          }
        }
      })

      givenBanner.show()
    })
  })
})
