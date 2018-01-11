import {expect} from 'chai'
import ContextParametersService from '../../../../openads/domain/service/ContextParametersService'

describe('ContextParametersService', () => {
  it('Should return an error calling a non extended method #getContextParameters', function () {
    const contextParametersService = new ContextParametersService()
    expect(() => {
      contextParametersService.getContextParameters()
    }).to.throw()
  })
})
