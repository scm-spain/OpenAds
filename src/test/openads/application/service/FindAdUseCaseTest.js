/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import sinon from 'sinon'
import FindAdUseCase from '../../../../openads/application/service/FindAdUseCase'

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
      const findAdsUseCase = new FindAdUseCase({
        adChainedRepository: adChainedRepositoryMock,
        logger: loggerMock
      })
      expect(findAdsUseCase.find({
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
      const adChainedRepositoryMock = {
        findAd: ({adRequest}) => Promise.resolve({
          show: () => null
        })
      }
      const findAdSpy = sinon.spy(adChainedRepositoryMock, 'findAd')
      const loggerSpy = sinon.spy()
      const loggerMock = {
        info: (title, log) => loggerSpy()
      }
      const findAdsUseCase = new FindAdUseCase({
        adChainedRepository: adChainedRepositoryMock,
        logger: loggerMock
      })
      findAdsUseCase.find({
        adRequest: givenAdRequest
      })
        .then(ad => {
          expect(ad).to.be.an('object')
          expect(findAdSpy.calledOnce, 'findAd should be called once').to.be.true
          expect(loggerSpy.calledOnce, 'logger info should be called once').to.be.true
          done()
        })
        .catch(error => done(error))
    })
  })
})
