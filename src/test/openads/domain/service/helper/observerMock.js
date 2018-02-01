/* eslint-disable no-console */
const observer = ({payload, dispatcher}) => {
  console.log('observer called with payload:', payload)
  if (dispatcher) {
    console.log('   It has a defined dispatcher. Running...')
    dispatcher(payload)
  } else {
    console.log('   No dispatcher defined.')
  }
}

export default observer
