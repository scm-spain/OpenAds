export default class PositionRepository {
  /**
   * @param {Position} position
   * @return {Promise.<TResult>}
   */
  create ({position}) {
    throw new Error('PositionRepository#create must be implemented')
  }

  /**
   * @param {string} containerId
   * @return {Promise.<TResult>}
   */
  exists ({containerId}) {
    throw new Error('PositionRepository#exists must be implemented')
  }
}
