export default class CreatePageUseCase {
  constructor ({pageRepository, pageFactory}) {
    this._pageRepository = pageRepository
    this._pageFactory = pageFactory
  }

  createPage ({id, segmentation, positions}) {
    return Promise.resolve()
      .then(() => this._pageFactory.create({id, segmentation, positions}))
      .then(page => this._pageRepository.save({page}))
  }
}
