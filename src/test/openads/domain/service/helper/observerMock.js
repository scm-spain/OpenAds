const observer = ({payload, dispatcher}) => {
  console.log('payload:', payload)
  dispatcher(payload)
}

export default observer
