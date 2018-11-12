/**
 * @Interface
 */
export default class PositionFactory {
  create({id, name, specification, ad, status}) {
    throw new Error('PositionFactory#create must be implemented')
  }
}
