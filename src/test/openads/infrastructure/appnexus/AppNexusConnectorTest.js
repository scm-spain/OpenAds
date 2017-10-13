import {assert} from 'chai'
import AppNexusConnector from '../../../../openads/infrastructure/appnexus/AppNexusConnector'
import FakeAppNexusClient from './FakeAppNexusClient'

describe('AppNexusConnector implementation', function () {
  describe('given valid constructor parameters', function () {
    it('should create a new instance of AppNexusConnector according to parameters', function () {
      const source = 'AppNexus'
      const connectorData =
        {
          'configuration': {
            'member': 3296
          }
        }
      var appNexusClient = new FakeAppNexusClient()

      const appNexusConnector = new AppNexusConnector({source, connectorData, appNexusClient})
      var member = appNexusConnector.member
      assert.equal(member, 3296)
    })
  })
})
