import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import configs from "../../configs";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import InfoBar from "../InfoBar/InfoBar";
import Join from "../../components/Join/Join";
import "./Chat.css";

const WS_ENDPOINT = configs.wsUrl;
let socket;

const Chat = ({ location, ...props }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    if(props.isAuth) {
      const name = localStorage.getItem("user");
      socket = io(`${WS_ENDPOINT}?token=${localStorage.getItem("conversation#token")}`);
     socket.io.on("connect_error", ()=>{
         localStorage.removeItem("conversation#token");
         alert(`the server ${WS_ENDPOINT} is offline`);
     });
      socket.on("exception", (reason) => {
        localStorage.removeItem("conversation#token");
        alert(reason.message);
      });
      socket.emit("join", { name }, (error) => {
        if (error) {
          localStorage.removeItem("conversation#token");
          alert(error);
        }
      });

      setName(name);
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }

  }, [props.isAuth]);



  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      const name = localStorage.getItem("user");
      socket.emit("message", { name, message });
      setMessage("")
    }
  };
  return (
      props.isAuth ? <div className="outerContainer">
          <div className="container">
            <InfoBar />
            <Messages messages={messages} name={name} />
            <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
          </div>
        </div> : <Join {...props} />

  );
};

export default Chat;
