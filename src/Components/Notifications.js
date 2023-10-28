import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const NotificationComponent = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const socket = io("http://192.168.12.11:3020"); // Substitua 'http://localhost:3000' pela URL correta do seu servidor

    socket.on("notification", (data) => {
      setNotification(data.notification);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notificações em tempo real:</h2>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default NotificationComponent;
