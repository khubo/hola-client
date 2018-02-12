import html from 'choo/html'
import axios from 'axios'
import redirect from 'choo-redirect'

export default function (state, emit) {
  
  let error = state.mainComponentError
  console.log('error is ', error)
  const login = () => {
    let username = document.getElementById('username').value
    if(!state.pos) {
     return console.log('location not available')
    }
    
    let position = state.pos
    axios.post('http://192.168.0.14:1337/user',{
      username,
      position
    }).then((res, body) => {
      emit('authToken', res.data.token)
    }).catch(e => {
      console.log(e)
      emit('error:main', e.response.data)
    })
  }

  setTimeout(() => {
    if(sessionStorage['auth_token']) {
    emit('authToken', sessionStorage['auth_token'])
  }}, 100);


  return html `
    <div class="header">  
      ${error} <br>
     <div class="mdl-textfield mdl-js-textfield">
        <input class="mdl-textfield__input" type="text" id="username">
        <label class="mdl-textfield__label" for="sample1">${state.name}</label></div>
      <button class="mdl-button mdl-js-button mdl-button--raised" onclick=${login}>
        Enter
      </button>
    </div>
  `
}