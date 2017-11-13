import AdRepository from '../../domain/ad/AdRepository'

export default class AdChainedRepository extends AdRepository {
  constructor ({appnexusRepository, configuration}) {
    super()
    this._appnexusRepository = appnexusRepository
    this._configuration = configuration
  }

    /**
     *
     * @param adRequest
     * @return {*|Promise.<Banner>}
     */
  findAd ({adRequest}) {
    return this._appnexusRepository.findAd({adRequest})
  }

  reset () {
    this._appnexusRepository.reset()
  }
}
