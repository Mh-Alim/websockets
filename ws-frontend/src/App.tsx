import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const socket = new WebSocket("http://localhost:8080");
    socket.onopen = () => {
      console.log("socket connected");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("Received Message: ", message.data);
      setLatestMessage(message.data);
    };
  }, []);

  if (!socket) return <div>Connecting to the server</div>;
  return (
    <>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        onClick={() => {
          socket?.send(text);
        }}
      >
        submit
      </button>

      {latestMessage}
    </>
  );
}

export default App;
