# 🔴 CYBER-SOC TERMINAL - Project Overview

## 🎯 Project Summary

A hardcore hacker-themed Security Operations Center (SOC) dashboard with red/black aesthetics, Matrix visualization, and real-time threat monitoring. Built with FastAPI backend and React frontend.

---

## 🐛 Backend Bugs Fixed

### 1. alerts/router.py
**Issue:** `db = get_db` was not calling the function
**Fix:** Changed to `db = get_db()`
**Impact:** Alerts endpoint now properly retrieves database connection

### 2. event_manager.py
**Issue:** DateTime objects not JSON serializable in WebSocket broadcast
**Fix:** Convert datetime to ISO format string before broadcasting
**Impact:** Real-time event streaming now works without JSON serialization errors

---

## 🎨 Frontend Features

### Visual Design
- **Color Scheme:** Red (#ff0000) and Black (#000000) hardcore hacker theme
- **Matrix Background:** Animated red matrix rain effect with Japanese characters
- **Glowing Effects:** Red neon glow on borders, text, and interactive elements
- **Scan Lines:** Animated scanning effects during operations
- **Custom Scrollbars:** Red-themed scrollbars matching the aesthetic

### Components

#### 1. MatrixBackground
- Animated canvas-based matrix rain
- Red characters falling effect
- Subtle opacity for background layer

#### 2. ScanForm (Malware Scanner)
- File path input with red styling
- Animated scanning line during operation
- Visual threat detection feedback
- Glowing red alerts for malicious files

#### 3. EventFeed (Live Stream)
- WebSocket real-time connection
- Connection status indicator
- Severity-based color coding
- Auto-scrolling event list
- Metadata display for events

#### 4. AlertPanel (Active Threats)
- Severity filtering (ALL, CRITICAL, HIGH, MEDIUM, LOW)
- Auto-refresh every 5 seconds
- Threat icons based on severity
- Detailed alert information
- Pulsing animations for critical threats

#### 5. SystemStats
- Live uptime counter
- Threat statistics
- Scan counter
- System status indicator

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/events?limit=50` | Fetch security events |
| GET | `/alerts?limit=50` | Fetch active alerts |
| POST | `/antivirus/scan?file_name=<name>` | Scan file for malware |
| WS | `/ws/soc` | WebSocket for real-time updates |

---

## 🚀 Deployment Architecture

### Separate Server Deployment

```
┌─────────────────┐         ┌─────────────────┐
│  Frontend       │         │  Backend        │
│  (React/Vite)   │◄───────►│  (FastAPI)      │
│  Port: 80/443   │  HTTP   │  Port: 8000     │
│  Static Files   │  WS     │  + MongoDB      │
└─────────────────┘         └─────────────────┘
```

### Configuration
- Frontend: Edit `.env` file with `VITE_API_BASE_URL`
- Backend: CORS enabled for cross-origin requests
- WebSocket: Automatic protocol detection (ws/wss)

---

## 📦 Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **Vite 7.3.1** - Build tool
- **Canvas API** - Matrix animation
- **WebSocket** - Real-time communication
- **CSS3** - Animations and effects

### Backend
- **FastAPI** - Python web framework
- **Motor** - Async MongoDB driver
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **WebSocket** - Real-time streaming

### Database
- **MongoDB** - Document database for events and alerts

---

## 🎯 Inspired By

- **Nmap** - Network scanning tool aesthetics
- **Metasploit** - Penetration testing framework UI
- **The Matrix** - Iconic falling code effect
- **Hollywood Hacker Terminals** - Red/black color schemes
- **Cyberpunk Aesthetics** - Neon glows and dark themes

---

## 📁 Project Structure

```
Diversion/
├── fastback/                    # Backend
│   ├── app/
│   │   ├── core/               # Core functionality
│   │   │   ├── config.py
│   │   │   ├── mongodb.py
│   │   │   ├── event_manager.py (FIXED)
│   │   │   ├── alert_manager.py
│   │   │   └── stream_manager.py
│   │   ├── modules/            # Feature modules
│   │   │   ├── alerts/
│   │   │   │   └── router.py (FIXED)
│   │   │   ├── antivirus/
│   │   │   ├── events/
│   │   │   └── streaming/
│   │   ├── models/             # Data models
│   │   └── main.py             # App entry
│   ├── requirements.txt
│   └── DEPLOYMENT.md
│
└── frontend/
    └── soc-frontend/           # Frontend
        ├── src/
        │   ├── components/
        │   │   ├── MatrixBackground.jsx (NEW)
        │   │   ├── SystemStats.jsx (NEW)
        │   │   ├── ScanForm.jsx (ENHANCED)
        │   │   ├── EventFeed.jsx (ENHANCED)
        │   │   └── AlertPanel.jsx (ENHANCED)
        │   ├── api/
        │   │   └── api.js (UPDATED)
        │   ├── App.jsx (UPDATED)
        │   └── index.css (TRANSFORMED)
        ├── .env (NEW)
        ├── .env.example (NEW)
        ├── start.bat (NEW)
        ├── start.sh (NEW)
        └── README.md (NEW)
```

---

## 🚀 Quick Start

### Backend
```bash
cd fastback
python -m venv myenv
myenv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend/soc-frontend
npm install
npm run dev
```

Or use quick start scripts:
- Windows: `start.bat`
- Linux/Mac: `./start.sh`

---

## 🔒 Security Considerations

1. **CORS:** Restrict to specific domains in production
2. **HTTPS:** Use SSL/TLS for production
3. **Authentication:** Implement user authentication
4. **MongoDB:** Enable authentication
5. **Environment Variables:** Never commit sensitive data
6. **Rate Limiting:** Add API rate limiting
7. **Input Validation:** Already implemented with Pydantic

---

## 📊 Performance Features

- **Lazy Loading:** Components load on demand
- **WebSocket Efficiency:** Single connection for all real-time data
- **Event Limiting:** Max 100 events in memory
- **Auto-refresh:** Alerts refresh every 5 seconds
- **Optimized Animations:** CSS-based for GPU acceleration

---

## 🎨 Customization

### Colors
Edit `src/index.css`:
```css
:root {
  --hacker-red: #ff0000;
  --blood-red: #8b0000;
  --neon-red: #ff3131;
}
```

### Matrix Effect
Edit `src/components/MatrixBackground.jsx`:
- Change `chars` for different characters
- Adjust `fontSize` for density
- Modify `fillStyle` for color

---

## 📝 License

MIT License - Feel free to use and modify

---

## 🤝 Support

For issues or questions:
1. Check README.md files
2. Review DEPLOYMENT.md
3. Inspect browser console for errors
4. Verify backend logs

---

**Built with 💀 for hardcore security professionals**
