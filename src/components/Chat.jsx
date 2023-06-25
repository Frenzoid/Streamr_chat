
import { StreamPermission } from "streamr-client";
import { client } from "../utils/steamr";
import { useSubscribe } from "streamr-client-react";
import { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import { STREAMR_TOPIC } from "../config/constants";
import Alert from "./Alert";

function Chat({ address }) {

  const streamRef = useRef(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [subPermissions, setSubPermissions] = useState(false);
  const [pubPermissions, setPubPermissions] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    loadStream();

    // Unsubscribe from the stream when component unmounts, IE: when the user disconnects the wallet.
    return () => client.unsubscribe(STREAMR_TOPIC);
  }, []);


  const loadStream = async () => {
    try {
      // Create or get the stream
      const stream = await client.getOrCreateStream({
        id: STREAMR_TOPIC,
      });

      streamRef.current = stream;

      // Check if user has permission to publish to the stream
      const hasPubPermissions = await stream.hasPermission({
        permission: StreamPermission.PUBLISH,
        user: address,
        allowPublic: true
      })

      console.log('User has permission to publish: ' + hasPubPermissions);
      setPubPermissions(hasPubPermissions);

      // Check if user has permission to subscribe to the stream
      const hasSubPermissions = await stream.hasPermission({
        permission: StreamPermission.SUBSCRIBE,
        user: address,
        allowPublic: true
      });

      console.log('User has permission to subscribe: ' + hasSubPermissions);
      setSubPermissions(hasSubPermissions);

      if (hasSubPermissions) {

        // Subscribe to the stream, classic way
        console.log("Subscribing to the topic...")
        client.subscribe(STREAMR_TOPIC, ({ message }) => {
          setMessages([...messages, ...{ message }]);
          console.log("New message:", message, messages);
        });

        // Subscribe to the stream, using the hook
        /*useSubscribe(STREAMR_TOPIC, {
          onMessage: (message) => {
            console.log("New message:", message);
            setMessages([...messages, message]);
          },
        });*/
      }

    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  // Publish a message to the stream
  const sendMessage = () => {
    if (message) {
      streamRef.current.publish({
        message: {
          date: new Date().toLocaleString(),
          sender: address,
          text: message,
        },
      }).then(() => {
        setMessage('');
      }).catch((err) => {
        setError(err.message);
      });
    }
  }


  Chat.propTypes = {
    address: PropTypes.string.isRequired,
  }


  return (
    <div className={"container"}>
      {error && <Alert message={error} color={"danger"} />}
      <div className="mt-3 col-md-6 offset-md-3">
        <div className="chat">
          {messages.map(({ sender, text, date }, i) => (
            <div key={i} className={"card mb-3"}>
              <div className="card-body d-flex flex-row justify-content-between">
                <div>
                  <h5 className={"card-title text-break"}>{sender}</h5>
                  <p className={"card-text"}>{text}</p>
                  <span className={"text-secondary"}>{date}</span>
                </div>
                <img
                  src={`https://avatars.dicebear.com/api/adventurer/${sender}.svg`}
                  alt={"Icon"}
                  width={"50px"}
                />
              </div>
            </div>
          ))}
          <div className="input-group mt-5">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
          <div className={"mt-2 d-flex flex-row justify-content-around"}>
            <h5><span className={`badge bg-${pubPermissions ? "success" : "error"}`}>Subscribe Permissions</span></h5>
            <h5><span className={`badge bg-${subPermissions ? "success" : "error"}`}>Publish Permissions</span></h5>
          </div>
        </div>
      </div>
    </div >
  )

}

export default Chat;