import io from 'socket.io-client'

export default (state, emitter) => {
  state.name = 'aswin'
  state.chatInitialized = false
  state.messages = []

  if(!("geolocation" in navigator)) {
    state.geolocation = false
  }else {
    navigator.geolocation.getCurrentPosition(pos => {
      emitter.emit('position', pos.coords)
    })
  }
  
  emitter.on('authToken', (token) => {
    state.token = token
    sessionStorage['auth_token'] = token
    emitter.emit('pushState', 'chat')
    emitter.emit('render')
  })

  emitter.on('connectSocket', createSocketConnection(state, emitter))
  emitter.on('position', (coords) => {
    state.pos = [coords.latitude, coords.longitude]
  })

  emitter.on('message', (message) => {
    console.log('message is going to be emitted on socket')
    state.socket.emit('message', message)
  })

  emitter.on('error:main', (error) => {
    state.mainComponentError = error
    emitter.emit('render')
  })
}

const createSocketConnection = (state,emitter) => () => {
  const socket = io('http://localhost:1337/',{query: `auth_token=${state.token}`})
  socket.on('connect', () => {
    console.log('connection established')
  })
  
  socket.on('error', (e) => {
    console.log('error in socket: ', e)
  })

  socket.on('success', data => {
    state.chatInitialized = true
    state.socket = socket
    emitter.emit('render')
  })
  
  socket.on('new_message', (message) => {
    console.log('new message recieved', message)
    state.messages.push(message)
    emitter.emit('render')
  })
}
