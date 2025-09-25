import React, { useMemo, useState } from "react";
import { parse, type ParseOptions, type ValidateFn, type ValidateResult, type ParseResult } from "pastebox-core";

export type PasteSelectProps = {
  validate: ValidateFn;
  delimiters?: string[];
  normalize?: (v: string) => string;
  maxValues?: number;
  caseSensitive?: boolean;
  onChange?: (r: { parse: ParseResult; validate: ValidateResult }) => void;
  className?: string;
};

export function PasteSelect({
  validate,
  delimiters,
  normalize,
  maxValues,
  caseSensitive,
  onChange,
  className
}: PasteSelectProps) {
  const [input, setInput] = useState("");
  const [parseRes, setParseRes] = useState<ParseResult>({ all: [], normalized: [], uniques: [], duplicates: [] });
  const [valRes, setValRes] = useState<ValidateResult>({ valid: [], invalid: [] });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const opts: ParseOptions = useMemo(() => ({ delimiters, normalize, maxValues, caseSensitive }), [delimiters, normalize, maxValues, caseSensitive]);

  async function handleValidate() {
    setBusy(true);
    setErr(null);
    try {
      const p = parse(input, opts);
      setParseRes(p);
      const v = await validate(p.uniques);
      setValRes(v);
      onChange?.({ parse: p, validate: v });
    } catch (e: any) {
      setErr(e?.message ?? "Validation failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className} style={{ display: "grid", gap: 12 }}>
      <label>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Paste values</div>
        <textarea
          rows={8}
          placeholder="Paste values separated by comma, newline, tab, or semicolon…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
        />
      </label>

      <button disabled={busy} onClick={handleValidate} style={{ 
        padding: "10px 14px", 
        borderRadius: 8, 
        backgroundColor: busy ? "#ccc" : "#007acc",
        color: "white",
        border: "none",
        cursor: busy ? "not-allowed" : "pointer"
      }}>
        {busy ? "Validating…" : "Validate"}
      </button>

      {err && <div style={{ color: "crimson", padding: 8, backgroundColor: "#ffe6e6", borderRadius: 4 }}>{err}</div>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Badge label="Total" value={parseRes.all.length} />
        <Badge label="Unique" value={parseRes.uniques.length} />
        <Badge label="Duplicates" value={parseRes.duplicates.length} />
        <Badge label="Valid" value={valRes.valid.length} tone="good" />
        <Badge label="Invalid" value={valRes.invalid.length} tone="bad" />
      </div>

      <Lists valid={valRes.valid} invalid={valRes.invalid} />
    </div>
  );
}

function Badge({ label, value, tone }: { label: string; value: number; tone?: "good" | "bad" }) {
  const bg = tone === "good" ? "#e6ffed" : tone === "bad" ? "#ffe6e6" : "#f5f5f5";
  const color = tone === "good" ? "#22543d" : tone === "bad" ? "#c53030" : "#2d3748";
  return (
    <div style={{ 
      background: bg, 
      color: color,
      borderRadius: 999, 
      padding: "6px 10px", 
      fontSize: 12,
      border: `1px solid ${tone === "good" ? "#c6f6d5" : tone === "bad" ? "#fed7d7" : "#e2e8f0"}`
    }}>
      <strong>{label}:</strong> {value}
    </div>
  );
}

function Lists({ valid, invalid }: { valid: string[]; invalid: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <List title="Valid" items={valid} />
      <List title="Invalid" items={invalid} />
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(items.join("\n")).catch(console.error);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <strong>{title}</strong>
        <button 
          onClick={copyToClipboard}
          disabled={items.length === 0}
          style={{
            padding: "4px 8px",
            fontSize: 11,
            border: "1px solid #ccc",
            borderRadius: 4,
            backgroundColor: "#f9f9f9",
            cursor: items.length ? "pointer" : "not-allowed"
          }}
        >
          Copy
        </button>
      </div>
      <div role="list" style={{ 
        maxHeight: 180, 
        overflow: "auto", 
        border: "1px solid #e2e8f0", 
        borderRadius: 8, 
        padding: 8,
        backgroundColor: "#fafafa"
      }}>
        {items.map((it, i) => (
          <div role="listitem" key={`${it}-${i}`} style={{ 
            fontFamily: "monospace", 
            fontSize: 12,
            padding: "2px 0",
            borderBottom: i < items.length - 1 ? "1px solid #eee" : "none"
          }}>
            {it}
          </div>
        ))}
        {items.length === 0 && <div style={{ color: "#999", fontStyle: "italic" }}>No items</div>}
      </div>
    </div>
  );
}
