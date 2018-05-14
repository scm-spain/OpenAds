export default class InterfaceChecker {
  static implements ({instance, iface}) {
    return Object.getOwnPropertyNames(iface.prototype).every(name => {
      return name === 'constructor' || typeof instance[name] === 'function'
    })
  }
}
