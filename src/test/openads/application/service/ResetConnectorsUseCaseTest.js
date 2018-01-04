
import {expect} from 'chai'
import sinon from 'sinon'
import ResetConnectorsUseCase from '../../../../openads/application/service/ResetConnectorsUseCase'

describe('Reset Connectors use case', function () {
  it('Should reset the repository', function () {
    const adChainedRepository = {
      reset: () => null
    }
    const adChainedRepositoryResetSpy = sinon.spy(adChainedRepository, 'reset')

    const useCase = new ResetConnectorsUseCase({adChainedRepository})
    useCase.resetConnectors()
    expect(adChainedRepositoryResetSpy.calledOnce).to.be.true
  })
})
