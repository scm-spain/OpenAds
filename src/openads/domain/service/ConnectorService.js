/**
 * @interface
 */
export default class ConnectorService {
  connector ({source}) {
    throw new Error('ConnectorService#connector must be implemented')
  }
}
