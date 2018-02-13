export default class AppNexusConsumersRepository {
  constructor () {
    this._positions = new Map()
  }

  find ({id}) {
    return this._positions.get(id)
  }

  save ({id, adResponse}) {
    this._positions.set(id, adResponse)
  }
}