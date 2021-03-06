# OpenAds

![npm](https://img.shields.io/npm/v/@adv-ui/openads)
[![Build status](https://travis-ci.org/scm-spain/OpenAds.svg?branch=master)](https://travis-ci.org/scm-spain/OpenAds) [![codecov](https://codecov.io/gh/scm-spain/OpenAds/branch/master/graph/badge.svg)](https://codecov.io/gh/scm-spain/OpenAds)

:rocket: Powerful advertising abstraction library to deliver ads in a web environment providing you a common domain for different sources.

OpenAds introduce a domain about Positions where ads are loaded inside so you don't have to worry about what connector
are you using to show ads you just only need to know a simple use cases and initial configurations.

# Features

* :dolls: Abstraction of different ad sources like AppNexus, Google, adhoc adServer.
* :gift: Friendly configuration and simple use cases
* :incoming_envelope: Promise based
* :mag_right: Written using best practises and new technologies to achieve performance and maintainability
* :money_with_wings: Increase your revenues


# Installation
OpenAds is available as the ```@adv-ui/OpenAds``` package on [npm](https://www.npmjs.com/)
To install the stable version:
```
npm install --save @adv-ui/openads
```

# Usage
First of all you must include OpenAds and **initialize it** with your desired configuration using static **init** method,
which has to receive the **connectors** you want to use:

## List of Known Connectors:

* [AppNexus Connector](https://github.com/scm-spain/OpenAds-appnexus)
* [Google AdSense Connector](https://github.com/scm-spain/OpenAds-google-adsense)

## OpenAds initialization

```ecmascript 6
import OpenAds from '@adv-ui/openads'
import AppNexusConnector from '@adv-ui/openads-appnexus'

// connectors initalization - sample with AppNexusConnector
const appNexusConnector = WhateverConnector.init({config: {
  pageOpts:{
    member: 4242
  }
}})

// openads initialization
const openAds = OpenAds.init({config:{
  Sources: {
    AppNexus: appNexusConnector
  }
}})
```

After having OpenAds initialized, the first and simplest step is to start adding a **Position** and displaying it:
```ecmascript 6
openAds.addPosition({
  id: 'ad1',
  name: 'ad number one',
  specification: {
    source: 'AppNexus',
    appnexus: {
        targetId: 'ad1',
        invCode: 'es-cn-wph-ocasion-list-x_65',
        keywords: {
          'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
          'es-sch-event_name': 'list',
          'aa-sch-country_code': 'es',
          'aa-sch-supply_type': 'wph',
          'es-sch-section': 'ocasion',
          'aa-sch-page_type': 'list',
          'es-sch-adformat': 'x65'
        },
        sizes: [[300, 250], [320, 250]]
    }
  }
})
  .then(position => openAds.displayPosition({id: position.id}))
  .catch(error => console.log('Do some interesting stuff if there is an error',error))
```
The Promise response for addPosition is a Position with all data loaded.
If some error occurred with the connector trying to load the ad inside the position you can deal with it
using ```catch``` operator from Promise

# Refresh a position

If you want to update some kind of data segmentation for a Position or you just want to refresh the ad associated
to the position, you can use the refreshPosition use case:

```ecmascript 6
const positionUpdated = openAds.refreshPosition({
  id: 'ad1',
  specification: {
    source: 'AppNexus',
    appnexus: {
      targetId: 'ad1',
      invCode: 'new-placement-to-update',
      sizes: [[300, 600]]
    }
  }
})
  .catch(error => console.log('Maybe new segmentation have generated some kind of error',error))
```
Keep in mind this two scenarios when you refresh an existent position:

* If the Position exists but never were displayed, being refreshed doesn't imply that will be displayed,
 you should do it by yourself using displayPosition use case
* If the Position exists and were displayed previously, refresh will update the segmentation and display it
 with the new Ad data at least the Ad were a Native, in that case you are the owner of the HTML presentation of the Ad


# Native support

OpenAds supports Native Ads, but delegates the presentation to the client so when you add a Position you will
receive a Position as usual but the ad inside will be of type Native.

If you try to do a display of a position that have a Native ad you will get an error of type **PositionAdIsNativeError**.

To request what **fields** you want to receive with the Native ad you can provide that configuration when you add the Position through the native field
```ecmascript 6
openAds.addPosition({
  id: 'ad1',
  name: 'ad number one',
  specification: {
    source: 'AppNexus',
    appnexus: {
        targetId: 'ad1',
        invCode: 'es-cn-wph-ocasion-list-x_65',
        keywords: {
          'es-sch-ads_name_page': 'cochesnet/ocasion/listado',
          'es-sch-event_name': 'list',
          'aa-sch-country_code': 'es',
          'aa-sch-supply_type': 'wph',
          'es-sch-section': 'ocasion',
          'aa-sch-page_type': 'list',
          'es-sch-adformat': 'x65'
        },
        sizes: [[300, 250], [320, 250]],
        native: {
            "title": {
              "required": true,
              "max_length": 35
            },
            "body": {
              "required": true,
              "max_length": 1000
            },
            "image": {
              "required": false
            },
            "icon": {
              "required": false
            },
            "clickUrl": {
              "required": true
            }
          }
    }
  }
})
  .then(position => openAds.displayPosition({id: position.id}))
  .catch(error => console.log('Do some interesting stuff',error))
```

# Error handling

If the ad server generates some error when you are trying to add a Position, refreshing it or displaying it,
OpenAds will throw a rejected Promise with an Error of type PositionAdNotAvailableError with the detailed error.

```ecmascript 6
class PositionAdNotAvailableError extends Error {
  constructor ({position}) {
    super()
    this.name = 'PositionAdNotAvailableError'
    this.message = `Position ${position && position.id} AD not available.`
    this.stack = (new Error()).stack
    this.position = position
  }
}
```
So for example if you add a Position and there is no bid for that segmentation you can easily catch the error
and chain it with a refresh with new segmentation data.

```ecmascript 6
openAds.addPosition({
  id: 'ad1_with_error',
  name: 'ad_error',
  specification: {}
})
  .then(position => openAds.displayPosition({id: position.id}))
  .catch(error =>
      openAds.refreshPosition({
        id: error.position.id,
        specification: {}
      })
      .then(position => openAds.displayPosition({id: position.id}))
  )
```

Anyway, you can test for the position to exist to avoid the PositionAlreadyExists error when adding positions:

```ecmascript 6
openAds.hasPosition({id: 'the_ad'})
.then(has => has ?
    openAds.refreshPosition({
       id: error.position.id,
       specification: {}
    })
    : openAds.addPosition({
        id: 'the_ad',
        name: 'some ad',
        specification: {}
      })
      .openAds.displayPosition({id: position.id}))
```

# Logging

While navigating in a browser, adding **openads_debug** keyword to the URL query string will enable the debug mode automatically.

For example:
```
http://your.web.app/page?price=5000&openads_debug
```

Also, to enable debugger in persistent mode, you can add the option in your browser's local storage from the browser's console:
```
window.localStorage.setItem('openads_debug', 'true') // removing it or setting it to false, disables the debugger 
```


Currently, OpenAds uses [LogLevel](https://github.com/pimterry/loglevel) as its logging framework.


# Performance

We care about performance, we know that showing ads in your page can penalize your user experience so we tried to do our best to not have bottle necks in our code.
You can take a look at the time line of all use cases using the performance task.

```bash
npm run performance
```

![Timeline performance](./resources/timeline.png)


# Roadmap

* Add support to Google AdSense
* Add support for passback sources


# License
OpenAds is [MIT licensed](./LICENSE).
