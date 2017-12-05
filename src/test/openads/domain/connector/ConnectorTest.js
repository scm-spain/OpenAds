import {expect} from 'chai'
import Connector from '../../../../openads/domain/connector/Connector'

describe('Connector test', () => {
  it('Should return the source set when creation', () => {
    const givenSource = 'MySource'
    const connector = new Connector({source: givenSource})
    expect(givenSource).deep.equal(connector.source)
  })
  it('Should return the configuration set when creation', () => {
    const givenConfiguration = 'MyConfiguration'
    const connector = new Connector({configuration: givenConfiguration})
    expect(givenConfiguration).deep.equal(connector.configuration)
  })
})
