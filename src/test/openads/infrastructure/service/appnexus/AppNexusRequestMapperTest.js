import {expect} from 'chai'
import AppNexusRequestMapper from '../../../../../openads/infrastructure/service/appnexus/AppNexusRequestMapper'

describe('AppNexusRequestMapper test', () => {
  describe('mapDomainToRequest method', () => {
    it('Should return the same request if this request does not include native', () => {
      const appNexusRequestMapper = new AppNexusRequestMapper()
      const givenRequest = {
        member: 'member',
        targetId: 'targetId',
        invCode: 'invCode',
        sizes: 'sizes',
        keywords: 'keywords'
      }
      const result = appNexusRequestMapper.mapDomainToRequest({
        member: givenRequest.member,
        targetId: givenRequest.targetId,
        invCode: givenRequest.invCode,
        sizes: givenRequest.sizes,
        keywords: givenRequest.keywords
      })
      expect(result).deep.equal(givenRequest)
    })
    it('Should return a request with native if this request includes native', () => {
      const appNexusRequestMapper = new AppNexusRequestMapper()
      const givenRequest = {
        member: 'member',
        targetId: 'targetId',
        invCode: 'invCode',
        sizes: 'sizes',
        keywords: 'keywords',
        native: {
          'title': {
            'type': 'text',
            'required': true,
            'max': 35
          },
          'body': {
            'type': 'text',
            'required': true,
            'max': 1000
          },
          'image': {
            'type': 'image',
            'required': true
          },
          'icon': {
            'type': 'image'
          },
          'clickUrl': {
            'type': 'url',
            'required': true
          }
        }
      }

      const expectedResult = {
        member: 'member',
        targetId: 'targetId',
        invCode: 'invCode',
        sizes: 'sizes',
        keywords: 'keywords',
        native: {
          'title': {
            'required': true,
            'max_length': 35
          },
          'body': {
            'max_length': 1000,
            'required': true
          },
          'clickUrl': {
            'required': true
          },
          'icon': {
            'required': false
          },
          'image': {
            'required': true
          }
        }
      }

      const result = appNexusRequestMapper.mapDomainToRequest({
        member: givenRequest.member,
        targetId: givenRequest.targetId,
        invCode: givenRequest.invCode,
        sizes: givenRequest.sizes,
        keywords: givenRequest.keywords,
        native: givenRequest.native
      })

      expect(expectedResult).deep.equal(result)
    })
  })
})
