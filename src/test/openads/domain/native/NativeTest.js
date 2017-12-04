/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import Native from '../../../../openads/domain/ad/native/Native'

describe('Native', () => {
  describe('Given a native instance', () => {
    it('Calling show method should dispatch the PRE_RENDER event before calling the renderer', () => {
      const givenContainerId = 'pos_1_id'
      const givenPosition = 'POS1'

      const givenCallback = ({eventName, position, payload}) => {
        expect(eventName).to.equal('PRE_RENDER')
        expect(position).to.equal(givenPosition)
        expect(payload.containerId).to.equal(givenContainerId)
        givenNative._dispatched = true
      }
      const givenNative = new Native({
        containerId: 'pos_1_id',
        position: 'POS1',
        eventDispatcher: {
          dispatch: givenCallback
        },
        renderer: {
          render: () => {
            if (undefined === givenNative._dispatched) {
              expect.fail('Event was not dispatched')
            }
            givenNative._rendered = true
          }
        }
      })

      givenNative.show()
      expect(givenNative._dispatched).to.be.true
      expect(givenNative._rendered).to.be.true
    })
  })
})
