
import {expect} from 'chai'
import sinon from 'sinon'
import ResetConnectorsUseCase from '../../../../openads/application/service/ResetConnectorsUseCase'

describe('Reset Connectors use case', function () {
  it('Should reset the repository', function () {
    const loggerSpy = sinon.spy()
    const adChainedRepositoryResetSpy = sinon.spy()
    const adChainedRepositoryMock = {
      reset: () => adChainedRepositoryResetSpy()
    }
    const loggerMock = {
      info: (title, log) => loggerSpy()
    }
    const useCase = new ResetConnectorsUseCase({
      adChainedRepository: adChainedRepositoryMock,
      logger: loggerMock
    })
    useCase.resetConnectors()
      .then(() => {
        expect(adChainedRepositoryResetSpy.calledOnce, 'reset method should be called once').to.be.true
        expect(loggerSpy.calledOnce, 'logger info should be called once').to.be.true
      })
  })
})
