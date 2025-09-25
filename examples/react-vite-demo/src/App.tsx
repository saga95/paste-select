import { PasteSelect } from "pastebox-react";
import { inMemorySetValidator } from "pastebox-core";

const allowedValues = new Set([
  "A123", "B456", "C789", "SKU-999", "ITEM-001", 
  "PROD-789", "CODE-456", "ID-123", "REF-999", "DEMO-001"
]);

function App() {
  return (
    <div style={{ 
      maxWidth: 900, 
      margin: "40px auto", 
      padding: 20,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ 
          fontSize: 36, 
          fontWeight: 700, 
          margin: 0, 
          marginBottom: 8,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          🎯 PasteBox Demo
        </h1>
        <p style={{ 
          fontSize: 18, 
          color: "#666", 
          margin: 0,
          marginBottom: 16
        }}>
          Bulk paste parsing & validation for enterprise dashboards
        </p>
        
        <div style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #e9ecef",
          borderRadius: 8,
          padding: 16,
          marginBottom: 24
        }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600, color: "#495057" }}>
            ✅ Valid Sample Values:
          </h3>
          <div style={{ 
            fontFamily: "Monaco, Courier New, monospace", 
            fontSize: 13,
            color: "#28a745",
            lineHeight: 1.6
          }}>
            A123, B456, C789, SKU-999, ITEM-001, PROD-789, CODE-456, ID-123, REF-999, DEMO-001
          </div>
        </div>

        <div style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: 8,
          padding: 16,
          marginBottom: 24
        }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: 14, fontWeight: 600, color: "#856404" }}>
            💡 Try pasting mixed formats:
          </h3>
          <div style={{ fontSize: 13, color: "#856404" }}>
            A123,B456<br/>
            C789; INVALID-001<br/>
            SKU-999&nbsp;&nbsp;&nbsp;&nbsp;ITEM-001<br/>
            A123 (duplicate)
          </div>
        </div>
      </div>

      <PasteSelect
        validate={inMemorySetValidator(allowedValues)}
        onChange={(result) => {
          console.log("📊 Validation Results:", {
            totalParsed: result.parse.uniques.length,
            validCount: result.validate.valid.length,
            invalidCount: result.validate.invalid.length,
            duplicateCount: result.parse.duplicates.length
          });
        }}
        className="demo-paste-select"
      />

      <div style={{
        marginTop: 40,
        padding: 24,
        backgroundColor: "#f1f3f4",
        borderRadius: 12,
        border: "1px solid #dadce0"
      }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 18, fontWeight: 600, color: "#3c4043" }}>
          🚀 Features Showcase
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 14 }}>
          <div>
            <strong>✨ Smart Parsing:</strong>
            <ul style={{ margin: "4px 0 0 0", paddingLeft: 16, color: "#5f6368" }}>
              <li>Auto-detects commas, newlines, tabs, semicolons</li>
              <li>Handles up to 10,000 values efficiently</li>
              <li>Removes duplicates and empty values</li>
            </ul>
          </div>
          <div>
            <strong>🔍 Validation:</strong>
            <ul style={{ margin: "4px 0 0 0", paddingLeft: 16, color: "#5f6368" }}>
              <li>Real-time validation against allow-list</li>
              <li>Batched API validation support</li>
              <li>Visual feedback with counts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
