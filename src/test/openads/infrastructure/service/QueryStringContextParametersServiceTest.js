import {expect} from 'chai'
import QueryStringContextParametersService from '../../../../openads/infrastructure/service/QueryStringContextParametersService'

describe('QueryString ContextParametersService', function () {
  describe('Given a valid query string', function () {
    it('Return an object containing the parsed key/value pairs', function () {
      const givenQueryString = 'a=b&c=d&e'
      const domDriverMock = {
        getQueryString: () => givenQueryString
      }
      const contextParametersService = new QueryStringContextParametersService({domDriver: domDriverMock})
      const contextParameters = contextParametersService.getContextParameters()

      expect(contextParameters).to.deep.equal({
        'a': 'b',
        'c': 'd',
        'e': ''
      })
    })
  })
})
