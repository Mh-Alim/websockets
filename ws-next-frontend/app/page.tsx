"use client";

import { useSocket } from "@/hooks/useSocket";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div
      style={{
        height: "95vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        style={{ background: "grey" }}
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
      <br />
      {latestMessage}
    </div>
  );
}
