import {assert} from 'chai'
import ConnectorServiceImpl from '../../../../openads/infrastructure/service/ConnectorServiceImpl'
import FakeAppNexusClient from "./FakeAppNexusClient";


describe('Connector Resolver implementation', function () {
    describe('given a single connector for AppNexus', function () {
        it('should instantiate the AppNexusConnector', function () {

            const givenConnectors =
                {
                    "AppNexus": {
                        "configuration": {
                            "member": 3296
                        }
                    }
                }


            const fakeAppNexusClient = new FakeAppNexusClient();
            const connectorServiceImpl = new ConnectorServiceImpl({
                connectors: givenConnectors,
                appNexusClient: fakeAppNexusClient
            })
            const connector = connectorServiceImpl.connector({source: 'AppNexus'})
            assert.equal(connector.member, 3296)
        })
    })
})
