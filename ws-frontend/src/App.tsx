import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSocket } from "./hooks/useSocket";

function App() {
  const [latestMessage, setLatestMessage] = useState("");
  const [text, setText] = useState("");
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (message) => {
      console.log("Received Message: ", message.data);
      setLatestMessage(message.data);
    };
  }, [socket]);
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
