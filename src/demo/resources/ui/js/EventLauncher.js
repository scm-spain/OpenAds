export default class EventLauncher {
  constructor ({window}) {
    this._window = window
  }

  launchFilterChanged () {
    this._launchEvent({
      type: 'MOTOR_FILTER_CHANGED',
      payload: {
        'url': '/',
        'title': 'Coches Demo',
        'page_name': this._window.utag_data.ads_name_page,
        segmentation: this._window.utag_data
      }
    })
  }

  launchUserContacted () {
    this._launchEvent({
      type: 'MOTOR_USER_CONTACTED',
      payload: {
        'url': '/',
        'title': 'Coches Demo',
        'page_name': this._window.utag_data.ads_name_page,
        segmentation: this._window.utag_data
      }
    })
  }

  _launchEvent ({type, payload}) {
    const event = new this._window.CustomEvent(type, {detail: payload})
    this._window.document.dispatchEvent(event)
  }
}

const eventLauncher = new EventLauncher({window: window})

window.document.querySelector('#ad-Event-FilterChanged').onclick = () => eventLauncher.launchFilterChanged()
window.document.querySelector('#ad-Event-UserContacted').onclick = () => eventLauncher.launchUserContacted()
