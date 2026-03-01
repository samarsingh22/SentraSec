
const API_BASE = "http://127.0.0.1:8000";

export async function getEvents() {
  const res = await fetch(`${API_BASE}/events`);
  return res.json();
}

export async function getAlerts() {
  const res = await fetch(`${API_BASE}/alerts`);
  return res.json();
}

export async function scanFile(fileName) {
  const res = await fetch(`${API_BASE}/antivirus/scan?file_name=${fileName}`, {
    method: "POST",
  });

  return res.json();
}

export const WS_URL = "ws://127.0.0.1:8000/ws/soc";