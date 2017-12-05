export default class AppNexusRequestMapper {
  mapDomainToRequest ({member, targetId, invCode, sizes, keywords, native}) {
    let request = {
      member: member,
      targetId: targetId,
      invCode: invCode,
      sizes: sizes,
      keywords: keywords
    }

    if (native) {
      request.native = {}
      Object.entries(native).forEach(([key, value]) => {
        if (value) {
          switch (value.type) {
            case 'text': {
              request.native[key] = this._mapNativeText({value})
              break
            }
            case 'image': {
              request.native[key] = this._mapNativeImage({value})
              break
            }
            case 'url': {
              request.native[key] = this._mapNativeUrl({value})
              break
            }
            default:
              throw new Error(`Unsupported native value type ${value.type}`)
          }
        } else {
          request.native[key] = {}
        }
      })
    }
    return request
  }

  _mapNativeText ({value}) {
    let result = {required: false}
    if (value.required) {
      result.required = true
    }
    if (value.max) {
      result.max_length = value.max
    }
    return result
  }

  _mapNativeImage ({value}) {
    let result = {required: false}
    if (value.required) {
      result.required = true
    }
    return result
  }

  _mapNativeUrl ({value}) {
    let result = {required: false}
    if (value.required) {
      result.required = true
    }
    return result
  }
}
