import {expect} from 'chai'
import Position from '../../../../openads/domain/position/Position'
import DomainEventBus from '../../../../openads/domain/service/DomainEventBus'
import {POSITION_CREATED} from '../../../../openads/domain/position/positionCreated'

describe('Ad', () => {
  it('Should return an error calling to Ad#show instead of a extending class implementation', () => {
    DomainEventBus.register({
      eventName: POSITION_CREATED,
      observer: ({payload, dispatcher}) => expect(payload.id).to.be.equal('top1')
    })
    const givenPosition = new Position({
      id: 'top1',
      name: 'forlayo',
      source: 'appnexus',
      placement: 'lalala',
      segmentation: 'idkfa&iddqd',
      sizes: [],
      native: {}
    })
    expect(givenPosition.segmentation, 'Tricks for DOOM!!').to.be.equal('idkfa&iddqd')
  })
})
