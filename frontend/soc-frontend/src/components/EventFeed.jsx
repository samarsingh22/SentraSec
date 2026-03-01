
import { useEffect, useState } from "react";
import { WS_URL, getEvents } from "../api/api";

export default function EventFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load existing events
    getEvents().then(setEvents);

    // WebSocket connection
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.type === "security_event") {
        setEvents((prev) => [data.data, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h3>Live Events</h3>

      {events.map((e, i) => (
        <div key={i} style={{ border: "1px solid gray", margin: 5 }}>
          <b>{e.event_type}</b> — {e.severity}
          <div>{e.message}</div>
        </div>
      ))}
    </div>
  );
}