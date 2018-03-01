import {expect} from 'chai'
import PullingAdRepository from '../../../../openads/infrastructure/repository/PullingAdRepository'

describe('Pulling Ad Repository', () => {
  describe('find method', () => {
    it('should return a Promise', () => {
      const repository = new PullingAdRepository({})
      expect(repository.find({id: 'whatever'})).to.be.a('promise')
    })
    it('should reject by timeout exception is data is not available at timeout time', (done) => {
      const givenTimeout = 50
      const repository = new PullingAdRepository({timeout: givenTimeout})
      repository.find({id: 'whatever'}).then(() => {
        done(new Error('Should not end properly'))
      }).catch(e => {
        expect(e.message, 'Should be a timeout error').to.include('Timeout')
        done()
      })
    })
    it('should resolve properly when data is available', (done) => {
      const givenPositions = [['key1', 'value1']]
      const repository = new PullingAdRepository({positions: givenPositions})
      repository.find({id: 'key1'}).then(data => {
        expect(data).to.equal('value1')
        done()
      }).catch(e => done(e))
    })
    it('should wait for data to be available', (done) => {
      const repository = new PullingAdRepository({timeout: 1000})
      repository.find({id: 'key2'}).then(data => {
        expect(data).to.equal('value2')
        done()
      }).catch(e => done(e))
      const storeValue = setTimeout(() => {
        repository.save({id: 'key2', adResponse: 'value2'})
        clearTimeout(storeValue)
      }, 50)
    })
  })
  describe('save method', () => {
    it('should store the given data', () => {
      const givenId = 'id1'
      const givenValue = 'value1'
      const repository = new PullingAdRepository()

      expect(repository.has({id: givenId})).to.be.false
      repository.save({id: givenId, adResponse: givenValue})
      expect(repository.has({id: givenId})).to.be.true
    })
  })
  describe('remove method', () => {
    it('should remove the given id entry', () => {
      const givenId = 'id1'
      const givenValue = 'value1'
      const repository = new PullingAdRepository({positions: [[givenId, givenValue]]})

      expect(repository.has({id: givenId})).to.be.true
      repository.remove({id: givenId})
      expect(repository.has({id: givenId})).to.be.false
    })
  })
})
