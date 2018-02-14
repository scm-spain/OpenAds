
import {expect} from 'chai'
import sinon from 'sinon'
import DisplayAdsUseCase from '../../../../openads/application/service/DisplayAdsUseCase'

describe('Display ads use case', function () {
  describe('given a valid adRequest', function () {
    it('should return a Promise', function () {
      const givenAdRequest = {}
      const adChainedRepositoryMock = {
        findAd: ({adRequest}) => Promise.resolve({
          show: () => null
        })
      }
      const loggerMock = {
        info: (title, log) => null
      }

      const displayAdsUseCase = new DisplayAdsUseCase({
        adChainedRepository: adChainedRepositoryMock,
        logger: loggerMock
      })
      expect(displayAdsUseCase.display({
        adRequest: givenAdRequest
      })).to.be.a('promise')
    })

    it('should call to findAd repository and also call to method show from Ad domain', function (done) {
      const givenAdRequest = {
        position: 'Top1',
        containerId: 'top1_dom_element_id',
        segmentation: 'forlayo&thor',
        placement: 'es-sch-top1-cn-lalala',
        sizes: [[980, 90], [970, 90]]
      }
      const showAdSpy = sinon.spy()
      const loggerSpy = sinon.spy()
      const adChainedRepositoryMock = {
        findAd: ({adRequest}) => Promise.resolve({
          show: () => showAdSpy()
        })
      }
      const findAdSpy = sinon.spy(adChainedRepositoryMock, 'findAd')

      const loggerMock = {
        info: (title, log) => loggerSpy()
      }
      const displayAdsUseCase = new DisplayAdsUseCase({
        adChainedRepository: adChainedRepositoryMock,
        logger: loggerMock
      })
      displayAdsUseCase.display({
        adRequest: givenAdRequest
      })
        .then(() => {
          expect(findAdSpy.calledOnce, 'findAd should be called once').to.be.true
          expect(showAdSpy.calledOnce, 'show should be called once').to.be.true
          expect(loggerSpy.calledOnce, 'logger info should be called once').to.be.true
          done()
        })
        .catch(error => done(error))
    })
  })
})