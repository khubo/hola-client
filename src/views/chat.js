import html from 'choo/html'
import io from 'socket.io-client'

export default (state, emit) => {

  const socket = io('http://localhost:1337/')
  socket.on('connect', () => {
    console.log('connection established')
  })

  return html `
    <div> chat box </div>
  `
}