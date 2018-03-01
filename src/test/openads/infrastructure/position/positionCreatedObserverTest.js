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
          keywords: 'iddqd&idkfa'
        }
      })

      expect(appnexusConectorDefineTagSpy.calledOnce, 'defineTag should be called once').to.be.true
      expect(appnexusConectorOnEventSpy.callCount, 'onEvent should be called five times').to.be.equal(5)
      expect(appnexusConectorLoadTagsSpy.calledOnce, 'loadTags should be called five times').to.be.true
    })
    it('should send the native data as appnexus native tag data in defineTags', function () {
      const appNexusConsumersRepositoryMock = {}
      this.appnexusConnectorMock = {
        member: 42,
        defineTag: () => this.appnexusConnectorMock,
        onEvent: ({event, targetId, callback}) => this.appnexusConnectorMock,
        loadTags: () => this.appnexusConnectorMock
      }
      const appnexusConectorDefineTagSpy = sinon.spy(this.appnexusConnectorMock, 'defineTag')

      const positionCreatedObserver = positionCreatedObserverFactory(this.appnexusConnectorMock)(appNexusConsumersRepositoryMock)

      const payload = {
        id: 'Thor',
        placement: 'Forlayo',
        sizes: [],
        keywords: 'iddqd&idkfa',
        native: {
          title: {
            required: true,
            max_length: 1000
          }
        }
      }
      positionCreatedObserver({payload})

      expect(appnexusConectorDefineTagSpy.calledOnce, 'defineTag should be called once').to.be.true
      expect(appnexusConectorDefineTagSpy.args[0][0].native, 'defineTag be called with filled native data').to.deep.equal(payload.native)
    })
  })
})
