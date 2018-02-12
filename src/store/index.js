export default (state, emitter) => {
  state.name = 'aswin'

  if(!("geolocation" in navigator)) {
    state.geolocation = false
  }else {
    navigator.geolocation.getCurrentPosition(pos => {
      emitter.emit('position', pos.coords)
    })
  }
  
  emitter.on('authToken', (token) => {
    state.token = token
  })
  
  emitter.on('position', (coords) => {
    state.pos = [coords.latitude, coords.longitude]
  })

  emitter.on('error:main', (error) => {
    state.mainComponentError = error
    emitter.emit('render')
  })
}