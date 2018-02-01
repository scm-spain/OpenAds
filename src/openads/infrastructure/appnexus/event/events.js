export const AD_AVAILABLE = 'adAvailable'
export const AD_BAD_REQUEST = 'adBadRequest'
export const AD_ERROR = 'adError'
export const AD_NO_BID = 'adNoBid'
export const AD_REQUEST_FAILURE = 'adRequestFailure'

export const appnexusAdAvailable = payload => ({type: AD_AVAILABLE, payload})
export const appnexusAdBadRequest = payload => ({type: AD_BAD_REQUEST, payload})
export const appnexusAdError = payload => ({type: AD_ERROR, payload})
export const appnexusAdNoBID = payload => ({type: AD_NO_BID, payload})
export const appnexusAdRequestFailure = payload => ({type: AD_REQUEST_FAILURE, payload})
