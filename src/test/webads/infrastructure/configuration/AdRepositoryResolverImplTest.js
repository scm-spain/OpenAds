import {assert} from 'chai'
import AdRepositoryResolverImpl from '../../../../openads/infrastructure/configuration/AdRepositoryResolverImpl'

describe('Connector Resolver implementation', function () {
  describe('given an array containing AppNexus', function () {
    it('should instantiate the AppNexusAdRepository', function () {
      const givenConnectors = [
              {driver: 'unknown1'},
              {driver: 'AppNexus', member: 1234},
              {driver: 'unknown2'}
      ]
      const adRepositoryResolverImpl = new AdRepositoryResolverImpl(givenConnectors)

      const adRepository = adRepositoryResolverImpl.adRepository({source: 'AppNexus'})

      assert.equal(adRepository.member(), 1234)
    })
  })
})
