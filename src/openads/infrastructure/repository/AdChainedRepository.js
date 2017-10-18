import AdRepository from '../../domain/ad/AdRepository'

export default class AdChainedRepository extends AdRepository {
  constructor ({appnexusRepository, googleRepository, configuration}) {
    super()
    this._appnexusRepository = appnexusRepository
    this._googleRepository = googleRepository
    this._configuration = configuration
  }

  findAd ({adRequest}) {
    return this._appnexusRepository.findAd({adRequest})
  }
}
