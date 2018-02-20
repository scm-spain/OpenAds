import {expect} from 'chai'
import sinon from 'sinon'
import positionSegmentationChangedObserverFactory from '../../../../openads/infrastructure/position/positionSegmentationChangedObserver'

describe('Position Segmentation Changed Event', function () {
  describe('Given a PositionSegmentationChanged event from Domain', function () {
    it('should use appnexus connector to modifyTags and refresh', function () {
      this.appnexusConnectorMock = {
        member: 42,
        modifyTag: (id, data) => this.appnexusConnectorMock,
        refresh: (...data) => this.appnexusConnectorMock
      }
      const appnexusConectorModifyTagSpy = sinon.spy(this.appnexusConnectorMock, 'modifyTag')
      const appnexusConectorRefreshSpy = sinon.spy(this.appnexusConnectorMock, 'refresh')

      const positionSegmentationChangedObserver = positionSegmentationChangedObserverFactory(this.appnexusConnectorMock)

      positionSegmentationChangedObserver({
        payload: {
          id: 'Thor',
          placement: 'Forlayo',
          sizes: [],
          segmentation: 'iddqd&idkfa'
        }
      })

      expect(appnexusConectorModifyTagSpy.calledOnce, 'modifyTag should be called once').to.be.true
      expect(appnexusConectorRefreshSpy.calledOnce, 'refresh should be called once').to.be.true
    })
  })
})
