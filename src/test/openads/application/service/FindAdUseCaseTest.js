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
      const findAdsUseCase = new FindAdUseCase({
        adChainedRepository: adChainedRepositoryMock
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
      const findAdsUseCase = new FindAdUseCase({
        adChainedRepository: adChainedRepositoryMock
      })
      findAdsUseCase.find({
        adRequest: givenAdRequest
      })
        .then(ad => {
          expect(ad).to.be.an('object')
          expect(findAdSpy.calledOnce, 'findAd should be called once').to.be.true
          done()
        })
        .catch(error => done(error))
    })
  })
})
