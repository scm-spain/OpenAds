import {expect} from 'chai'
import sinon from 'sinon'
import AdChainedRepository from '../../../../openads/infrastructure/repository/AdChainedRepository'

describe('Ad Chained repository', function () {
  describe('given a valid adRequest', function () {
    it('should return a Promise', function () {
      const givenAdRequest = {}
      const appNexusRepositoryMock = {
        findAd: ({adRequest}) => Promise.resolve({})
      }
      const adChainedRepository = new AdChainedRepository({
        appnexusRepository: appNexusRepositoryMock,
        googleRepository: {},
        configuration: {}
      })

      expect(adChainedRepository.findAd({
        adRequest: givenAdRequest
      })).to.be.a('promise')
    })

    it('should call to appnexus findAd method', function (done) {
      const givenAdRequest = {}
      const appNexusRepositoryMock = {
        findAd: ({adRequest}) => Promise.resolve({})
      }
      const findAdSpy = sinon.spy(appNexusRepositoryMock, 'findAd')
      const adChainedRepository = new AdChainedRepository({
        appnexusRepository: appNexusRepositoryMock,
        googleRepository: {},
        configuration: {}
      })

      adChainedRepository.findAd({
        adRequest: givenAdRequest
      })
        .then(ad => {
          expect(findAdSpy.calledOnce, 'findAd should be called once').to.be.true
          done()
        })
        .catch(error => done(error))
    })
  })
})
