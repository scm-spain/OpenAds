# OpenAds 

[![Build status](https://travis-ci.org/scm-spain/OpenAds.svg?branch=master)](https://travis-ci.org/scm-spain/OpenAds) [![codecov](https://codecov.io/gh/scm-spain/OpenAds/branch/master/graph/badge.svg)](https://codecov.io/gh/scm-spain/OpenAds)

Powerful advertising abstraction library to deliver ads in a web environment providing you a common connector for different sources.
It helps you to show ads in a easy way using simple use cases and work with sources like AppNexus or Google.

# Installation
OpenAds is available as the ```@schibstedspain/OpenAds``` package on [npm](https://www.npmjs.com/)
To install the stable version:
```
npm install --save @schibstedspain/openads
```

# Usage
First of all you must include OpenAds and **initialize it** with your desired configuration using static **init** method:
Currently we only support AppNexus Source so you can only provide your **member** number

```ecmascript 6
import OpenAds from '@schibstedspain/openads'
const openAds = OpenAds.init({config:{
  Sources: {
    AppNexus: {
      Member: 4242
    }
  }
}})
```

After having OpenAds initialized, all use cases are **async** so you always have a **Promise** as response.
To find an Ad and display it into a target position of your page you just only need to call display method:
```ecmascript 6
openAds.display({
      adRequest: {
          position: 'TOP_1',
          containerId: 'div_id_42',
          segmentation: {
            city : 'Barcelona',
            city_id : 42,            
            country_code : 'es',
          },
          placement: 'es_bn_top1_forlayo',
          sizes: [[980,90],[970,90]]
        }
      })
      .then(() => console.log("AD DISPLAYED"))      
```
The Promise response resolves with an empty value meaning that the job is done.

If you are interested in not showing the Ad directly to do something before, you can use the method find first.
It will give you a Promise that resolves with a Banner from our domain (constructor code omitted intentionally):
```ecmascript 6
import Ad from '../Ad'

export default class Banner extends Ad {   

  show () {
    return this._renderer.render({
      containerId: this._containerId
    })
  }

  get containerId () {
    return this._containerId
  }

  get source () {
    return this._source
  }

  get content () {
    return this._content
  }

  get size () {
    return this._size
  }
}
```
Example of use:
```ecmascript 6
openAds.find({
      adRequest: {
          position: 'TOP_1',
          containerId: 'div_id_42',
          segmentation: {
            city : 'Barcelona',
            city_id : 42,            
            country_code : 'es',
          },
          placement: 'es_bn_top1_forlayo',
          sizes: [[980,90],[970,90]]
        }
      })
      .then(ad => console.log('Html content of the creativity:',ad.content))      
```
After finding the Ad if you want to show it, you just only need to call method ```ad.show()```
```ecmascript 6
openAds.find({
      adRequest: {
          position: 'TOP_1',
          containerId: 'div_id_42',
          segmentation: {
            city : 'Barcelona',
            city_id : 42,            
            country_code : 'es',
          },
          placement: 'es_bn_top1_forlayo',
          sizes: [[980,90],[970,90]]
        }
      })
      .then(ad => ad.show())      
```

## Native support

OpenAds supports rendering Native Ads, only delegating to the OpenAds client the HTML generation from a JSON response.

### Register a Native Renderer binded to a Position

You can bind a Native Renderer to a specific Ad Position, so depending on you page Ad Positions to render, you're able
to show a Native Ad in a way or another.

To do so, you only need to register to OpenAds a renderer function that:
* accepts and is enabled to process a 'json' parameter containing the Native Ad data (the data contents depend on what 
is requested to the Ad Server, so it will contain open fields)
* has to return an Object containing
    * 'html' field (mandatory): The rendered HTML (for example, a HTML string template aplying the JSON object into it)
    * 'clickableElementId' field (optional, but nice to have): The clickable DOM element id of the generated HTML that is expected to
    throw the redirect (usually will be the entire HTML content, but it can be a nested button also)

With that, OpenAds will ensure that:
* the returned HTML will be written into the request's 'containerId', replacing any old content.
* the impression trackers (if any) will be nested to the 'containerId' after rendering the HTML (so you don't need to print them manually)
* the click trackers (if any) will be nested to the 'containerId' after an user clicks to the 'clickableElementId' (so you don't 
need to print them manually)

Example:

```ecmascript 6
// renderer for a link like Ad
const nativeTextRenderer = ({json}) => {
    const aId = 'ad-list-text-1'
    const html = `<a id='${aId}' href='${json.clickUrl}'>${json.title}</a>`
    return {
        html: html,
        clickElementId: aId
    }
}
// registering the link like Ad renderer for all requests where adRequest.position = 'list-text'
openAds.registerNativeRenderer({
  position: 'list-text',
  renderer: nativeTextRenderer
})
```

### Request a Native Ad

```ecmascript 6
// display ads
// this diplay will look up the registered nativeTextRenderer
openAds.display({
  adRequest: {
    containerId: 'my-native-text-container',
    position: 'list-text',
    //... segmentation, placement, ...
    native: {
        // fields requested for the response JSON
        // these fields are open (but not all would be accepted by the requested Ad Server)
        // you can define 'text', 'image', or 'url' data types
        title: {type: 'text', required: true, max: 50}, // required text of max 50 characters
        image: {type: 'image', required: false}, // optional image
        clickUrl: {type: 'url', required: true} // required url
    }
  }
})
```

In the sample, when a 'list-text' position is requested with a Native specification allowed by the used 
connector (p.ex. AppNexus) and it's response is a Native Ad, when calling the OpenAds#display method
or finding and Ad with OpenAds#find and calling the Ad#show method, the Ad render will look up the
registered Native Renderer for the specified position (nativeTextRenderer) and request the html to 
write it to the DOM.

After it, it will write the impression trackers also, and register an onclick function to the 
clickElementId (wrapping any previous onclick function) to write click trackers when the user
interacts with the Ad.  

## Hooks support

OpenAds supports registering a hook for processing a synchronous function callback when:

* **PRE_RENDER**: 
    * When an Banner#show method is called, before calling the banner renderer that will write the Ad content into the DOM, 
    a 'PRE_RENDER' Event will be dispatched to the registered Position in which de Banner must be rendered.
    
You can register hooks to multiple positions for the same event, and also, N hooks can be registered for the same event 
and position (they'll be executed in the registered order)
    
Registering the hook in the OpenAds client layer:
```ecmascript 6
// creating the hook specification
const sampleHook = {
   eventName: 'PRE_RENDER', 
   position: 'TOP_1', 
   callback: ({payload}) => console.log('The payload is the retrieved Ad', payload)
}

// registering the hook
openAds.registerHook(sampleHook)

// unregisitering the hook
openAds.registerHook(sampleHook)
```

## Single Page Application Support

OpenAds supports reloading Ads after page fragments refresh, commonly used in SPA websites.
In order to do that, just call:
```ecmascript 6
// will clean any internal state of supported source connectors
openAds.resetConnectors()
```

## Logging

In order to debug what is happening with Ads Loading, OpenAds uses [LogLevel](https://github.com/pimterry/loglevel) as its logging framework.
Also, it is using the [LogLevel Plugin Prefix](https://github.com/kutuluk/loglevel-plugin-prefix) to configure how log messages will be displayed.

In order to set the Logger up, add 'LogLevel' node entry into the **config** object when calling OpenAds 'init' method as follows:

```ecmascript 6
const openAds = OpenAds.init({config: {
  // LogLevel configuration
  LogLevel: {
    Level: 'debug' // defaults to 'error'
  },
  // LogLevel Plugin Prefix configuration
  LogLevelPrefix: {
    // check options in https://github.com/kutuluk/loglevel-plugin-prefix
    template: '[%t] %l | %n:', // defaults to '[%t] %l | %n:'
    timestampFormatter: (date) => ... // defaults to return a formatted date as 'YYYY-MM-DD HH:mm:ss.zzz'
  }
  //, Sources: ...
}})
```

While navigating in a browser, adding openads_debug keyword to the URL query string will enable the debug mode automatically.

For example:
```
http://your.web.app/page?price=5000&openads_debug
```

# Roadmap

* Add support to Google AdSense
* Add support for passback sources 
* Add support for single Ad position refresh 


# License
OpenAds is [MIT licensed](./LICENSE).