/**
 * @interface
 */
export default class PageRepository {
  save ({page}) {
    throw new Error('PageRepository#save must be implemented')
  }
  find ({id}) {
    throw new Error('PageRepository#find must be implemented')
  }

  update ({page}) {
    throw new Error('PageRepository#update must be implemented')
  }
}
