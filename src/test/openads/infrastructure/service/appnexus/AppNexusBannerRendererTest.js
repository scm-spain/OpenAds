
import {expect} from 'chai'
import AppNexusBannerRenderer from '../../../../../openads/infrastructure/service/appnexus/AppNexusBannerRenderer'

describe('AppNexus Banner Renderer', () => {
  describe('given a DOM id node', () => {
    it('should return a promise', () => {
      const givenContainerId = 'div_id_target'
      const appNexusConnectorMock = {
        onEvent: ({
          event,
          targetId,
          callback
        }) => {
          return appNexusConnectorMock
        },
        showTag: ({target}) => appNexusConnectorMock
      }
      const domDriverMock = {
        getElementById: () => null
      }

      const appNexusBannerRenderer = new AppNexusBannerRenderer({
        appNexusConnector: appNexusConnectorMock,
        domDriver: domDriverMock
      })

      expect(appNexusBannerRenderer.render({
        containerId: givenContainerId
      })).to.be.a('promise')
    })
    it('should call Appnexus connector methods and return a resolved promise', function (done) {
      const givenContainerId = 'div_id_target'
      const appNexusConnectorMock = {
        onEvent: ({
          event,
          targetId,
          callback
        }) => {
          callback()
          return appNexusConnectorMock
        },
        showTag: ({target}) => appNexusConnectorMock
      }
      const domDriverMock = {
        getElementById: () => null
      }

      const appNexusBannerRenderer = new AppNexusBannerRenderer({
        appNexusConnector: appNexusConnectorMock,
        domDriver: domDriverMock
      })

      appNexusBannerRenderer.render({
        containerId: givenContainerId
      })
        .then(result => {
          expect(result, 'Promise should return true').to.be.true
          done()
        })
        .catch(error => done(error))
    })
    it('should clean the container inner html', function (done) {
      const givenContainerId = 'div_id_target'
      const appNexusConnectorMock = {
        onEvent: ({event, targetId, callback}) => {
          callback()
          return appNexusConnectorMock
        },
        showTag: ({target}) => appNexusConnectorMock
      }
      const containerMock = {innerHTML: 'this is the previous inner html'}
      const domDriverMock = {
        getElementById: () => containerMock
      }

      const appNexusBannerRenderer = new AppNexusBannerRenderer({
        appNexusConnector: appNexusConnectorMock,
        domDriver: domDriverMock
      })

      appNexusBannerRenderer.render({
        containerId: givenContainerId
      }).then(() => {
        expect(containerMock.innerHTML).to.equal('')
        done()
      }).catch(error => done(error))
    })
  })
})
