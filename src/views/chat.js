import html from 'choo/html'
import io from 'socket.io-client'
import chatInput from './chatInput'

const createSocketConnection = (state,emit) => {
  const socket = io('http://localhost:1337/',{query: `auth_token=${state.token}`})
  socket.on('connect', () => {
    console.log('connection established')
  })
  
  socket.on('error', (e) => {
    console.log(e)
  })

  socket.on('success', (data) => {
    state.chatInitialized = true
    state.socket = socket
    emit('render')
  })
}

export default (state, emit) => {

  if(!state.socket) {
    createSocketConnection(state, emit)  
  }
 
  if(state.chatInitialized) 
    return html `
      <div> 
      
      ${chatInput(emit)}
      </div>
    `

  return html `
   <div> Initializing chat ....</div>
  `
}