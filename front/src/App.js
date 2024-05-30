import { useState } from 'react';
import { SocketApt } from './api/socket-api.ts';
import { useConnectSocket } from './hooks/useConnectSocket.ts';
import './styles/App.css';

function App() {
  // localStorage.removeItem('userId')
  const [text, setText] = useState('')
  const [dialog, setDialog] = useState([])
  useConnectSocket()

  const send = () => {
    console.log(text)
    SocketApt.socket.emit('newMessage', {text, user: localStorage.getItem('userId')})
    SocketApt.socket.on('newMessage', async (res) => {
      setDialog(res)
    })
    setText('')
  }

  return (
    <div className="App">
      <div>
          <input type="text" value={text} onChange={(e) => setText(e.currentTarget.value)}/>
          <button onClick={send}>
            Кнопка
          </button>
          {dialog.map(item => <div>{item.user + ': ' + item.text}</div>)}
        </div>
    </div>
  );
}

export default App;
