export default class PositionAlreadyExists extends Error {
  constructor ({id}) {
    super(`Position ${id} already exists`)
  }
}
