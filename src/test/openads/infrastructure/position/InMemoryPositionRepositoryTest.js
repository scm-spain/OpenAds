import {expect} from 'chai'
import InMemoryPositionRepository from '../../../../openads/infrastructure/position/InMemoryPositionRepository'
import ProxyPositionFactory from '../../../../openads/infrastructure/position/ProxyPositionFactory'
import {POSITION_NOT_VISIBLE} from '../../../../openads/domain/position/positionStatus'

describe('InMemory Position Repository', function () {
  describe('Given a Domain position', function () {
    it('should return a Promise', function () {
      const positionFactory = new ProxyPositionFactory({proxyHandler: {}})
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'lala',
        source: 'appnexus',
        placement: 'blabla',
        segmentation: 'adsasd',
        sizes: [],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      const inMemoryPositionRepository = new InMemoryPositionRepository()
      expect(inMemoryPositionRepository.save({position: givenPosition})).to.be.a('promise')
    })

    it('should save it and return a Promise', function () {
      const positionFactory = new ProxyPositionFactory({proxyHandler: {}})
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'lala',
        source: 'appnexus',
        placement: 'blabla',
        segmentation: 'adsasd',
        sizes: [],
        native: {},
        status: POSITION_NOT_VISIBLE
      })
      const inMemoryPositionRepository = new InMemoryPositionRepository()
      inMemoryPositionRepository.save({position: givenPosition})
        .then(position => expect(position.id, 'position not saved').to.equal(givenPosition.id))
    })
  })
  describe('Given two positions already saved in memory', function () {
    it('should find them and return Promise', function (done) {
      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          ['42', {
            id: '42',
            name: 'lala',
            source: 'appnexus',
            placement: 'blabla',
            segmentation: 'adsasd',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }],
          ['43', {
            id: '43',
            name: 'lala43',
            source: 'google',
            placement: 'jarjar',
            segmentation: 'lala=true',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }]
        ]
      })
      Promise.all([
        inMemoryPositionRepository.find({id: '42'}),
        inMemoryPositionRepository.find({id: '43'})
      ])
        .then(([exists1, exists2]) => {
          expect(exists1.id, 'position not saved').to.equal('42')
          expect(exists2.id, 'position not saved').to.equal('43')
          done()
        })
        .catch(error => done(error))
    })

    it('should not find position and return Promise with false value', function (done) {
      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          ['42', {
            id: '42',
            name: 'lala',
            source: 'appnexus',
            placement: 'blabla',
            segmentation: 'adsasd',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }],
          ['43', {
            id: '43',
            name: 'lala43',
            source: 'google',
            placement: 'jarjar',
            segmentation: 'lala=true',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }]
        ]
      })

      inMemoryPositionRepository.find({id: '4242'})
        .then((exists) => {
          expect(exists, 'position not saved').to.be.false
          done()
        })
        .catch(error => done(error))
    })

    it('should return a PositionAlreadyExists error', function (done) {
      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          ['42', {
            id: '42',
            name: 'lala',
            source: 'appnexus',
            placement: 'blabla',
            segmentation: 'adsasd',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }],
          ['43', {
            id: '43',
            name: 'lala43',
            source: 'google',
            placement: 'jarjar',
            segmentation: 'lala=true',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }]
        ]
      })

      const positionFactory = new ProxyPositionFactory({proxyHandler: {}})
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'lala',
        source: 'appnexus',
        placement: 'blabla',
        segmentation: 'adsasd',
        sizes: [],
        native: {},
        status: POSITION_NOT_VISIBLE
      })

      inMemoryPositionRepository.save({position: givenPosition})
        .then(position => done(new Error('should throw an error')))
        .catch(error => {
          expect(error.name, 'Error type is not PositionAlreadyExists').to.equal('PositionAlreadyExists')
          done()
        })
    })

    it('should update one Position and return Promise', function (done) {
      const positionFactory = new ProxyPositionFactory({proxyHandler: {}})
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'updatedName',
        source: 'appnexus',
        placement: 'updatedPlacement',
        segmentation: 'updatedSegmentation',
        sizes: [],
        native: {},
        status: POSITION_NOT_VISIBLE
      })

      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          ['42', {
            id: '42',
            name: 'lala',
            source: 'appnexus',
            placement: 'blabla',
            segmentation: 'adsasd',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }],
          ['43', {
            id: '43',
            name: 'lala43',
            source: 'google',
            placement: 'jarjar',
            segmentation: 'lala=true',
            sizes: [],
            native: {},
            status: POSITION_NOT_VISIBLE
          }]
        ]
      })

      inMemoryPositionRepository.update({position: givenPosition})
        .then(positionUpdated => {
          expect(positionUpdated.id, 'position not updated').to.equal(givenPosition.id)
          expect(positionUpdated.name, 'position name not updated').to.equal(givenPosition.name)
          expect(positionUpdated.placement, 'position placement not updated').to.equal(givenPosition.placement)
          expect(positionUpdated.segmentation, 'position segmentation not updated').to.equal(givenPosition.segmentation)
          done()
        })
        .catch(error => done(error))
    })
  })
})
