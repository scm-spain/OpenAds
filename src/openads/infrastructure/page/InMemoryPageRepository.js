import PageRepository from '../../domain/page/PageRepository'

export default class InMemoryPageRepository extends PageRepository {
  constructor () {
    super()
    this._pages = new Map()
  }

  save ({page}) {
    return Promise.resolve()
      .then(() => this._pages.set(page.id, page))
  }

  find ({id}) {
    return Promise.resolve()
      .then(() => this._pages.has(id))
      .then(exists => exists ? this._pages.get(id) : null)
  }

  update ({page}) {
    return Promise.resolve()
      .then(() => this._pages.set(page.id, page))
  }
}
