import './App.css';
import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import Chat from './components/Chat';

const socket = io("http://localhost:3001");


function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
    }
  }

  return (
    <div className="App">
      <h4>Join to chat</h4>
      <input type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder="Room ID..." onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join a room</button>
      <Chat socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;
