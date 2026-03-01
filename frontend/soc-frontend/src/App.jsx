import EventFeed from "./components/EventFeed";
import AlertPanel from "./components/AlertPanel";
import ScanForm from "./components/ScanForm";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🛡️ Enterprise SOC Dashboard</h1>

      <ScanForm />

      <hr />

      <div style={{ display: "flex", gap: 20 }}>
        <EventFeed />
        <AlertPanel />
      </div>
    </div>
  );
}
