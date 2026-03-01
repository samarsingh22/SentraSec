import { useEffect, useState } from 'react';

export default function NetworkTopology() {
  const [activeConnections, setActiveConnections] = useState([]);
  const [hoveredDevice, setHoveredDevice] = useState(null);
  const [deviceStats, setDeviceStats] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnections(
        Array.from({ length: 3 }, () => Math.floor(Math.random() * 8))
      );
      // Update device stats
      const stats = {};
      devices.forEach(device => {
        stats[device.id] = {
          cpu: Math.floor(Math.random() * 100),
          disk: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 100),
          security: Math.random() > 0.8 ? 'Warning' : 'Secure'
        };
      });
      setDeviceStats(stats);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const devices = [
    { id: 'router', label: 'ROUTER', x: 50, y: 20, color: '#ff0000', icon: '🌐', desc: 'Main network gateway' },
    { id: 'firewall', label: 'FIREWALL', x: 50, y: 40, color: '#ff3131', icon: '🛡️', desc: 'Network security barrier' },
    { id: 'switch', label: 'SWITCH', x: 50, y: 60, color: '#ff6b6b', icon: '🔀', desc: 'Network traffic distributor' },
    { id: 'server1', label: 'SERVER-1', x: 20, y: 85, color: '#00ff41', icon: '🖥️', desc: 'Application server' },
    { id: 'server2', label: 'SERVER-2', x: 40, y: 85, color: '#00ff41', icon: '🖥️', desc: 'Web server' },
    { id: 'db', label: 'DATABASE', x: 60, y: 85, color: '#00d4ff', icon: '💾', desc: 'Data storage server' },
    { id: 'client1', label: 'CLIENT-1', x: 80, y: 85, color: '#ffff00', icon: '💻', desc: 'Workstation endpoint' },
    { id: 'client2', label: 'CLIENT-2', x: 100, y: 85, color: '#ffff00', icon: '💻', desc: 'Workstation endpoint' }
  ];

  const connections = [
    { from: 'router', to: 'firewall' },
    { from: 'firewall', to: 'switch' },
    { from: 'switch', to: 'server1' },
    { from: 'switch', to: 'server2' },
    { from: 'switch', to: 'db' },
    { from: 'switch', to: 'client1' },
    { from: 'switch', to: 'client2' }
  ];

  return (
   <div className="panel" style={{ 
  gridColumn: '1 / -1', 
  background: 'transparent', 
  border: 'none', 
  boxShadow: 'none',
  width: '100%',
  height: '100%',
  minHeight: '500px',
  overflow: 'visible',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
}}>
  <div className="panel-title" style={{ padding: '0 0 10px 0' }}>🌐 NETWORK TOPOLOGY</div>
  <div style={{ 
    position: 'relative', 
    width: '100%',
    flex: '1',
    minHeight: '450px',
    height: 'calc(100% - 40px)',
    overflow: 'visible', /* Changed to visible to allow tooltips to show */
    border: '1px solid #333',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.2)'
  }}>
    {/* Inner container with proper scaling and centering */}
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible' /* Changed to visible */
    }}>
      {/* Content wrapper - adjusted scale for better fit */}
      <div style={{
        position: 'relative',
        width: '95%', /* Increased from 90% */
        height: '95%', /* Increased from 90% */
        transform: 'scale(0.85)', /* Reduced scale to make more room */
        transformOrigin: 'center center',
        margin: '0 auto'
      }}>
        {/* SVG Container */}
        <svg width="100%" height="100%" style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {connections.map((conn, i) => {
            const from = devices.find(d => d.id === conn.from);
            const to = devices.find(d => d.id === conn.to);
            const isActive = activeConnections.includes(i);
            
            if (!from || !to) return null;
            
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={isActive ? '#00ff41' : '#333'}
                strokeWidth={isActive ? '3' : '2'}
                strokeOpacity={isActive ? '1' : '0.3'}
                style={{
                  transition: 'all 0.3s',
                  filter: isActive ? 'drop-shadow(0 0 5px #00ff41)' : 'none'
                }}
              />
            );
          })}
        </svg>

        {/* Device Nodes - Slightly smaller to fit better */}
        {devices.map((device) => {
          const stats = deviceStats[device.id] || { cpu: 0, disk: 0, memory: 0, security: 'Unknown' };
          const isHovered = hoveredDevice === device.id;
          
          return (
            <div
              key={device.id}
              data-device-id={device.id}
              style={{
                position: 'absolute',
                left: `${device.x}%`,
                top: `${device.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered ? 100 : 10,
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredDevice(device.id)}
              onMouseLeave={() => setHoveredDevice(null)}
            >
              {/* Device Circle - Slightly smaller for better fit */}
              <div
                style={{
                  width: '60px', /* Reduced from 70px */
                  height: '60px', /* Reduced from 70px */
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${device.color}20, ${device.color}40)`,
                  border: `2px solid ${device.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem', /* Reduced from 1.8rem */
                  boxShadow: isHovered ? `0 0 20px ${device.color}` : `0 0 15px ${device.color}50`,
                  animation: 'pulse 2s infinite',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {device.icon}
              </div>
              
              {/* Device Label */}
              <div
                style={{
                  marginTop: '6px',
                  fontSize: '0.7rem',
                  color: device.color,
                  fontWeight: '600',
                  textShadow: `0 0 5px ${device.color}`,
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  maxWidth: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {device.label}
              </div>
              
              {/* Tooltip - Now positioned relative to the device */}
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '15px',
                  width: '240px',
                  background: 'rgba(0, 0, 0, 0.95)',
                  border: `2px solid ${device.color}`,
                  borderRadius: '8px',
                  padding: '12px',
                  zIndex: 200,
                  boxShadow: `0 10px 20px rgba(0, 0, 0, 0.5)`,
                  fontSize: '0.75rem',
                  textAlign: 'left',
                  pointerEvents: 'none',
                  backdropFilter: 'blur(10px)',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  {/* Arrow */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: `8px solid ${device.color}`
                  }} />
                  
                  {/* Tooltip Content */}
                  <div style={{ 
                    color: device.color, 
                    fontWeight: 'bold', 
                    marginBottom: '8px', 
                    borderBottom: `1px solid ${device.color}40`, 
                    paddingBottom: '6px',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                  }}>
                    {device.label}
                  </div>
                  
                  <div style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.7rem', lineHeight: '1.4', textAlign: 'center' }}>
                    {device.desc}
                  </div>
                  
                  <div style={{ display: 'grid', gap: '6px' }}>
                    {/* CPU Usage */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#888' }}>CPU:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '4px', background: '#333', borderRadius: '2px' }}>
                          <div style={{ 
                            width: `${stats.cpu}%`, 
                            height: '100%', 
                            background: stats.cpu > 80 ? '#ff3131' : '#00ff41',
                            borderRadius: '2px'
                          }} />
                        </div>
                        <span style={{ color: stats.cpu > 80 ? '#ff3131' : '#00ff41', fontWeight: 'bold' }}>{stats.cpu}%</span>
                      </div>
                    </div>
                    
                    {/* Disk Usage */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#888' }}>Disk:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '4px', background: '#333', borderRadius: '2px' }}>
                          <div style={{ 
                            width: `${stats.disk}%`, 
                            height: '100%', 
                            background: stats.disk > 80 ? '#ff3131' : '#00ff41',
                            borderRadius: '2px'
                          }} />
                        </div>
                        <span style={{ color: stats.disk > 80 ? '#ff3131' : '#00ff41', fontWeight: 'bold' }}>{stats.disk}%</span>
                      </div>
                    </div>
                    
                    {/* Memory Usage */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#888' }}>Memory:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '4px', background: '#333', borderRadius: '2px' }}>
                          <div style={{ 
                            width: `${stats.memory}%`, 
                            height: '100%', 
                            background: stats.memory > 80 ? '#ff3131' : '#00ff41',
                            borderRadius: '2px'
                          }} />
                        </div>
                        <span style={{ color: stats.memory > 80 ? '#ff3131' : '#00ff41', fontWeight: 'bold' }}>{stats.memory}%</span>
                      </div>
                    </div>
                    
                    {/* Security Status */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginTop: '8px', 
                      paddingTop: '8px', 
                      borderTop: `1px solid ${device.color}20` 
                    }}>
                      <span style={{ color: '#888' }}>Security:</span>
                      <span style={{ 
                        color: stats.security === 'Secure' ? '#00ff41' : '#ff3131', 
                        fontWeight: 'bold',
                        padding: '2px 8px',
                        background: stats.security === 'Secure' ? '#00ff4120' : '#ff313120',
                        borderRadius: '4px'
                      }}>
                        {stats.security}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

    {/* Stats Panel - Upper Right */}
    <div style={{ 
      position: 'absolute', 
      top: '10px', 
      right: '10px', 
      fontSize: '0.7rem',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1px solid #333',
      zIndex: 20,
      pointerEvents: 'none',
      backdropFilter: 'blur(5px)',
      minWidth: '140px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ 
        marginBottom: '6px', 
        color: '#00ff41', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px',
        fontWeight: 'bold'
      }}>
        <span style={{ fontSize: '0.9rem' }}>●</span> 
        <span>ACTIVE: 7 devices</span>
      </div>
      <div style={{ 
        marginBottom: '6px', 
        color: '#ffff00', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px' 
      }}>
        <span style={{ fontSize: '0.9rem' }}>●</span> 
        <span>TRAFFIC: 2.4 Gbps</span>
      </div>
      <div style={{ 
        color: '#00d4ff', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px' 
      }}>
        <span style={{ fontSize: '0.9rem' }}>●</span> 
        <span>LATENCY: 12ms</span>
      </div>
    </div>
  </div>

  <style>{`
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .panel {
      overflow: visible !important;
    }
    
    /* Ensure tooltips are always on top */
    [data-device-id]:hover {
      z-index: 1000 !important;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #444;
    }
  `}</style>
</div>
  );
}
