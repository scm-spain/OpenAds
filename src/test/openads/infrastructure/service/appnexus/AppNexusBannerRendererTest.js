/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import AppNexusBannerRenderer from '../../../../../openads/infrastructure/service/appnexus/AppNexusBannerRenderer'

describe('AppNexus Banner Renderer', function () {
  describe('given a DOM id node', function () {
    it('should return a promise', function () {
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

      const appNexusBannerRenderer = new AppNexusBannerRenderer({
        appNexusConnector: appNexusConnectorMock
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

      const appNexusBannerRenderer = new AppNexusBannerRenderer({
        appNexusConnector: appNexusConnectorMock
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
  })
})
