import html from 'choo/html'

export default (emit) => {

  const sendMessage = () => {
    const message = document.getElementById('chat-input').value
    document.getElementById('chat-input').value = ''
    emit('message', message)
  }
  
  return html `
    <div class="chatbox mdl-grid"> 
    <input type="text" class="mdl-cell mdl-cell--10-col" id="chat-input"/>
    <button class="mdl-cell mdl-cell--2-col mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onclick=${sendMessage}>
    Send
    </button>
    </div>
  `
}