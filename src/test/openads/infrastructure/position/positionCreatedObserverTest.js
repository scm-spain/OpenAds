import {expect} from 'chai'
import sinon from 'sinon'
import positionCreatedObserverFactory from '../../../../openads/infrastructure/position/positionCreatedObserver'

describe('Position Created Event', function () {
  describe('Given a PositionCreated event from Domain', function () {
    it('should use appnexus connector to defineTags, register events and loadTags', function () {
      const appNexusConsumersRepositoryMock = {}
      this.appnexusConnectorMock = {
        member: 42,
        defineTag: () => this.appnexusConnectorMock,
        onEvent: ({event, targetId, callback}) => this.appnexusConnectorMock,
        loadTags: () => this.appnexusConnectorMock
      }
      const appnexusConectorDefineTagSpy = sinon.spy(this.appnexusConnectorMock, 'defineTag')
      const appnexusConectorOnEventSpy = sinon.spy(this.appnexusConnectorMock, 'onEvent')
      const appnexusConectorLoadTagsSpy = sinon.spy(this.appnexusConnectorMock, 'loadTags')

      const positionCreatedObserver = positionCreatedObserverFactory(this.appnexusConnectorMock)(appNexusConsumersRepositoryMock)

      positionCreatedObserver({
        payload: {
          id: 'Thor',
          placement: 'Forlayo',
          sizes: [],
          keywords: 'iddqd&idkfa',
          native: {}
        }
      })

      expect(appnexusConectorDefineTagSpy.calledOnce, 'defineTag should be called once').to.be.true
      expect(appnexusConectorOnEventSpy.callCount, 'onEvent should be called five times').to.be.equal(5)
      expect(appnexusConectorLoadTagsSpy.calledOnce, 'loadTags should be called five times').to.be.true
    })
  })
})
