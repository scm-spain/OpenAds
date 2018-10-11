import {
  addPositionAndDisplay,
  addPosition,
  displayNonexistentPosition,
  refreshNonexistentPosition,
  addPositionAndDisplayAndRefresh
} from './performanceUseCases'

Promise.resolve()
  .then(() => addPosition())
  .then(() => displayNonexistentPosition())
  .then(() => refreshNonexistentPosition())
  .then(() => addPositionAndDisplay())
  .then(() => addPositionAndDisplayAndRefresh())
