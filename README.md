# OpenAds

Powerful advertising abstraction library to deliver ads in a web environment providing you a common connector for different sources.
It helps you to show ads in a easy way using simple use cases and work with sources like AppNexus or Google.



# Installation
OpenAds is available as the ```@schibstedspain/OpenAds``` package on [npm](https://www.npmjs.com/)
To install the stable version:
```
npm install --save @schibstedspain/OpenAds
```

# Usage
First of all you must include OpenAds and **initialize it** with your desired configuration using static **init** method:
Currently we only support AppNexus Source so you can only provide your **member** number

```ecmascript 6
import OpenAds from '@schibstedspain/OpenAds'
const openAds = OpenAds.init({config:{
  connectors: {
    AppNexus: {
      configuration: {
        member: 4242
      }
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

# Roadmap

* Add support for hooks in PRE rendering Ad
* Add support for Native Ads
* Add support to Google AdSense
* Add support for passback sources 


# License
OpenAds is [MIT licensed](./LICENSE).