const QueryStringParsed = () => {
  const queryString = {}
  const query = window.location.search.substring(1)
  if (!query) {
    return queryString
  }
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    // If first entry with this name
    if (typeof queryString[pair[0]] === 'undefined') {
      queryString[pair[0]] = decodeURIComponent(pair[1])
      // If second entry with this name
    } else if (typeof queryString[pair[0]] === 'string') {
      let arr = [queryString[pair[0]], decodeURIComponent(pair[1])]
      queryString[pair[0]] = arr
      // If third or later entry with this name
    } else {
      queryString[pair[0]].push(decodeURIComponent(pair[1]))
    }
  }
  return queryString
}
const CreateUtagData = ({utagData = '', defaultUtagData = {}} = {}) => {
  let parsedUtagData = (utagData) ? JSON.parse(utagData.replace(/'/g, '"')) : defaultUtagData
  window.utag_data = parsedUtagData
}
const QueryString = QueryStringParsed()
CreateUtagData({
  utagData: QueryString.utag_data,
  defaultUtagData: {'ads_name_page': 'cochesnet/ocasion/listado', 'is_msite': false, 'event_name': 'list'}
})
