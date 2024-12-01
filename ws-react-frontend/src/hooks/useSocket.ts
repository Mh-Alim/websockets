import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("http://localhost:8080");
    socket.onopen = () => {
      console.log("socket connected");
      setSocket(socket);
    };

    return () => socket.close();
  }, []);
  return socket;
};
