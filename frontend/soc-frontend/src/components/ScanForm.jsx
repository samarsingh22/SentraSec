
import { useState } from "react";
import { scanFile } from "../api/api";

export default function ScanForm() {
  const [file, setFile] = useState("");

  const handleScan = async () => {
    const result = await scanFile(file);
    alert("Scan Completed");
    console.log(result);
  };

  return (
    <div>
      <h3>Antivirus Scan</h3>

      <input
        placeholder="file.exe"
        value={file}
        onChange={(e) => setFile(e.target.value)}
      />

      <button onClick={handleScan}>Scan</button>
    </div>
  );
}