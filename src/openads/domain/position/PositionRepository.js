/**
 * @interface
 */
export default class PositionRepository {
  save ({page}) {
    throw new Error('PositionRepository#save must be implemented')
  }
  find ({id}) {
    throw new Error('PositionRepository#find must be implemented')
  }
}
