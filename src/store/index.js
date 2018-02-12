export default (state, emitter) => {
  state.name = 'aswin'
  state.chatInitialized = false
  state.message = []
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

  emitter.on('message', (message) => {
    state.socket.emit('message', message)
  })

  emitter.on('error:main', (error) => {
    state.mainComponentError = error
    emitter.emit('render')
  })
}