import { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function App() {
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");

  const [host, setHost] = useState("");
  const [adjacent, setAdjacent] = useState("");
  const [exposure, setExposure] = useState("");

  const [suggested, setSuggested] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- LOAD ALL DETAILS ---------------- */
  useEffect(() => {
    fetch(`${API}/details`)
      .then(res => res.json())
      .then(data => setDetails(data));
  }, []);

  /* ---------------- SEARCH DETAILS ---------------- */
  const handleSearch = async () => {
    const res = await fetch(`${API}/details/search?q=${search}`);
    const data = await res.json();
    setDetails(data);
  };

  /* ---------------- SUGGEST DETAIL ---------------- */
  const handleSuggest = async () => {
    setError("");
    setSuggested(null);

    if (!host || !adjacent || !exposure) {
      setError("Please select all context fields.");
      return;
    }

    const res = await fetch(`${API}/suggest-detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host_element: host,
        adjacent_element: adjacent,
        exposure: exposure,
      }),
    });

    const data = await res.json();
    setSuggested(data);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Mini Detail Library</h1>
      <p style={styles.subtitle}>
        Context-aware architectural detail suggestion system
      </p>

      {/* ================= SEARCH ================= */}
      <div style={styles.card}>
        <h3>Search Details</h3>
        <div style={styles.row}>
          <input
            style={styles.input}
            placeholder="Search by title, tags or description"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button style={styles.button} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div style={styles.card}>
        <h3>Available Details</h3>
        {details.length === 0 && <p>No details found.</p>}
        {details.map(d => (
          <div key={d.id} style={styles.listItem}>
            <span>{d.title}</span>
            <span style={styles.badge}>{d.category}</span>
          </div>
        ))}
      </div>

      {/* ================= SUGGEST ================= */}
      <div style={{ ...styles.card, ...styles.highlight }}>
        <h3>Suggest Detail by Drawing Context</h3>

        <div style={styles.row}>
          <select style={styles.select} onChange={e => setHost(e.target.value)}>
            <option value="">Host Element</option>
            <option value="External Wall">External Wall</option>
            <option value="Window">Window</option>
            <option value="Internal Wall">Internal Wall</option>
          </select>

          <select
            style={styles.select}
            onChange={e => setAdjacent(e.target.value)}
          >
            <option value="">Adjacent Element</option>
            <option value="Slab">Slab</option>
            <option value="External Wall">External Wall</option>
            <option value="Floor">Floor</option>
          </select>

          <select
            style={styles.select}
            onChange={e => setExposure(e.target.value)}
          >
            <option value="">Exposure</option>
            <option value="External">External</option>
            <option value="Internal">Internal</option>
          </select>
        </div>

        <button
          style={{ ...styles.button, marginTop: 15 }}
          onClick={handleSuggest}
        >
          Suggest Detail
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {suggested && (
          <div style={styles.result}>
            {suggested.detail ? (
              <>
                <h4>{suggested.detail.title}</h4>
                <p>{suggested.explanation}</p>
              </>
            ) : (
              <p>{suggested.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    fontFamily: "Segoe UI, sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
    padding: 30,
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    color: "#555",
    marginBottom: 30,
  },
  card: {
    background: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  highlight: {
    borderLeft: "6px solid #1976d2",
  },
  row: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: 8,
  },
  select: {
    padding: 8,
    minWidth: 160,
  },
  button: {
    padding: "8px 18px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  listItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
  },
  badge: {
    background: "#e3f2fd",
    padding: "2px 10px",
    borderRadius: 12,
    fontSize: 12,
  },
  result: {
    marginTop: 15,
    padding: 15,
    background: "#f1f8e9",
    borderRadius: 6,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
};
