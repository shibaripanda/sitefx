import { useState } from 'react';
import { SocketApt } from './api/socket-api.ts';
import { useConnectSocket } from './hooks/useConnectSocket.ts';
import './styles/App.css';

function App() {
  const [text, setText] = useState('')
  useConnectSocket()

  const send = () => {
    SocketApt.socket.emit('newMessage', {text})
    setText('')
  }

  return (
    <div className="App">
      <div>
          <input type="text" value={text} onChange={(e) => setText(e.currentTarget.value)}/>
          <button onClick={send}>
            Кнопка
          </button>
        </div>
    </div>
  );
}

export default App;
