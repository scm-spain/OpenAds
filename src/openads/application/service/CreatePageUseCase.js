export default class CreatePageUseCase {
  constructor ({pageRepository, pageFactory}) {
    this._pageRepository = pageRepository
    this._pageFactory = pageFactory
  }

  createPage ({id, segmentation, position}) {
    return Promise.resolve()
      .then(() => this._pageFactory.create({id, segmentation, position}))
      .then(page => this._pageRepository.save({page}))
  }
}
