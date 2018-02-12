import html from 'choo/html'
import chatInput from './chatInput'




export default (state, emit) => {

  console.log('renrendering')
  console.log(state.messages)
  
  if(!state.socket) {
    emit('connectSocket')  
  }
 
  if(state.chatInitialized) 
    return html `
      <div> 
      <div>
      ${state.messages.map(msg => {
        return html `<li> ${msg.user} : ${msg.message} </li>`
      })}
      </div>
      ${chatInput(emit)}
      </div>
    `

  return html `
   <div> Initializing chat ....</div>
  `
}