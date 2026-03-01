
import { useEffect, useState } from "react";
import { getAlerts } from "../api/api";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts().then(setAlerts);
  }, []);

  return (
    <div>
      <h3>Security Alerts</h3>

      {alerts.map((a, i) => (
        <div key={i} style={{ border: "2px solid red", margin: 5 }}>
          <b>{a.title}</b>
          <div>Severity: {a.severity}</div>
          <div>Status: {a.status}</div>
        </div>
      ))}
    </div>
  );
}