import Page from './Page'

export default class PageFactory {
  create ({id, segmentation, positions}) {
    return new Page({id, segmentation, positions})
  }
}
