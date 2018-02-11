import choo from 'choo'
import html from 'choo/html'
import store from './store'
import main from './views/main'
import chat from './views/chat'

import './assets/style.css'

const app = choo()

app.use(store)
app.route('/', main)
app.route('/chat', chat)
app.mount('div')