import {expect} from 'chai'
import InMemoryPositionRepository from '../../../../openads/infrastructure/position/InMemoryPositionRepository'
import {POSITION_NOT_VISIBLE} from '../../../../openads/domain/position/positionStatus'
import DefaultPositionFactory from '../../../../openads/infrastructure/position/DefaultPositionFactory'

describe('InMemory Position Repository', function() {
  describe('Given a Domain position', function() {
    it('should return a Promise', function() {
      const positionFactory = new DefaultPositionFactory()
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'lala',
        specification: {
          source: 'appnexus',
          appnexus: {
            placement: 'blabla',
            segmentation: 'adsasd',
            sizes: [],
            native: {}
          }
        },
        status: POSITION_NOT_VISIBLE
      })
      const inMemoryPositionRepository = new InMemoryPositionRepository()
      expect(
        inMemoryPositionRepository.saveOrUpdate({position: givenPosition})
      ).to.be.a('promise')
    })

    it('should save it and return a Promise', function() {
      const positionFactory = new DefaultPositionFactory()
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'lala',
        specification: {
          source: 'appnexus',
          appnexus: {
            placement: 'blabla',
            segmentation: 'adsasd',
            sizes: [],
            native: {}
          }
        },
        status: POSITION_NOT_VISIBLE
      })
      const inMemoryPositionRepository = new InMemoryPositionRepository()
      inMemoryPositionRepository
        .saveOrUpdate({position: givenPosition})
        .then(position =>
          expect(position.id, 'position not saved').to.equal(givenPosition.id)
        )
    })
  })
  describe('Given two positions already saved in memory', function() {
    it('should find them and return Promise', function(done) {
      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          [
            '42',
            {
              id: '42',
              name: 'lala',
              specification: {
                source: 'appnexus',
                appnexus: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ],
          [
            '43',
            {
              id: '43',
              name: 'lala43',
              specification: {
                source: 'google',
                google: {
                  placement: 'jarjar',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ]
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

    it('should not find position and return Promise with false value', function(done) {
      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          [
            '42',
            {
              id: '42',
              name: 'lala',
              specification: {
                source: 'appnexus',
                appnexus: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ],
          [
            '43',
            {
              id: '43',
              name: 'lala43',
              specification: {
                source: 'google',
                google: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ]
        ]
      })

      inMemoryPositionRepository
        .find({id: '4242'})
        .then(exists => {
          expect(exists, 'position not saved').to.be.false
          done()
        })
        .catch(error => done(error))
    })
    it('should update one Position and return Promise', function(done) {
      const positionFactory = new DefaultPositionFactory()
      const givenPosition = positionFactory.create({
        id: '42',
        name: 'updatedName',
        specification: {
          source: 'appnexus',
          appnexus: {
            placement: 'xxxx',
            segmentation: 'yyyy',
            sizes: [],
            native: {}
          }
        },
        status: POSITION_NOT_VISIBLE
      })

      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          [
            '42',
            {
              id: '42',
              name: 'lala',
              specification: {
                source: 'appnexus',
                appnexus: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ],
          [
            '43',
            {
              id: '43',
              name: 'lala43',
              specification: {
                source: 'google',
                google: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ]
        ]
      })

      inMemoryPositionRepository
        .saveOrUpdate({position: givenPosition})
        .then(positionUpdated => {
          expect(positionUpdated.id, 'position not updated').to.equal(
            givenPosition.id
          )
          expect(positionUpdated.name, 'position name not updated').to.equal(
            givenPosition.name
          )
          expect(
            positionUpdated.specification,
            'position specification not updated'
          ).to.deep.equal(givenPosition.specification)
          done()
        })
        .catch(error => done(error))
    })
    it('should say that a position already exists', done => {
      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          [
            '42',
            {
              id: '42',
              name: 'lala',
              specification: {
                source: 'appnexus',
                appnexus: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ],
          [
            '43',
            {
              id: '43',
              name: 'lala43',
              specification: {
                source: 'google',
                google: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ]
        ]
      })

      inMemoryPositionRepository
        .has({id: '43'})
        .then(exists => {
          expect(exists, 'position does not exist').to.be.true
        })
        .then(() => done())
        .catch(error => done(error))
    })
    it('should say that a position does not exit', done => {
      const inMemoryPositionRepository = new InMemoryPositionRepository({
        positions: [
          [
            '42',
            {
              id: '42',
              name: 'lala',
              specification: {
                source: 'appnexus',
                appnexus: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ],
          [
            '43',
            {
              id: '43',
              name: 'lala43',
              specification: {
                source: 'google',
                google: {
                  placement: 'blabla',
                  segmentation: 'adsasd',
                  sizes: [],
                  native: {}
                }
              },
              status: POSITION_NOT_VISIBLE
            }
          ]
        ]
      })

      inMemoryPositionRepository
        .has({id: '55'})
        .then(exists => {
          expect(exists, 'position should not exist').to.be.false
        })
        .then(() => done())
        .catch(error => done(error))
    })
  })
})
