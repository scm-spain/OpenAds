import QS from 'querystring'
import ContextParametersService from '../../domain/service/ContextParametersService'

export default class QueryStringContextParametersService extends ContextParametersService {
  constructor ({domDriver}) {
    super()
    this._domDriver = domDriver
  }
  getContextParameters () {
    const queryStringStr = this._domDriver.getQueryString()
    return QS.parse(queryStringStr)
  }
}
