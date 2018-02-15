import {POSITION_VISIBLE} from '../../domain/position/positionStatus'

export default class DisplayPositionUseCase {
  /**
   * @constructor
   * @param {PositionRepository} positionRepository
   */
  constructor ({positionRepository}) {
    this._positionRepository = positionRepository
  }

  /**
   * Displays a position in the page
   * @param {string} position id
   * @return {Promise<Position>}
   */
  displayPosition ({id} = {}) {
    return new Promise((resolve, reject) => {
      this._positionRepository.find({id})
        .then((foundPosition) => {
          if (foundPosition) {
            foundPosition.changeStatus({newStatus: POSITION_VISIBLE})
              .then((modifiedPosition) => resolve(this._positionRepository.save({position: modifiedPosition})))
          } else {
            reject(new Error('Position not found.'))
          }
        })
    })
  }
}
