const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- ROOT CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("Mini Detail Library API running");
});

/* ---------------- API 1: LIST DETAILS ---------------- */
app.get("/details", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, category FROM details"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- API 2: SEARCH DETAILS ---------------- */
app.get("/details/search", async (req, res) => {
  try {
    const q = `%${req.query.q}%`;
    const result = await pool.query(
      `SELECT * FROM details
       WHERE title ILIKE $1
          OR tags ILIKE $1
          OR description ILIKE $1`,
      [q]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- API 3: SMART SUGGEST DETAIL ---------------- */
app.post("/suggest-detail", async (req, res) => {
  const { host_element, adjacent_element, exposure } = req.body;

  try {
    // 1️⃣ Exact match
    let result = await pool.query(
      `SELECT d.*
       FROM detail_usage_rules r
       JOIN details d ON d.id = r.detail_id
       WHERE r.host_element = $1
         AND r.adjacent_element = $2
         AND r.exposure = $3`,
      [host_element, adjacent_element, exposure]
    );

    if (result.rows.length > 0) {
      return res.json({
        detail: result.rows[0],
        explanation: `Exact match: ${host_element} connected to ${adjacent_element} under ${exposure} exposure.`,
      });
    }

    // 2️⃣ Host + exposure
    result = await pool.query(
      `SELECT d.*
       FROM detail_usage_rules r
       JOIN details d ON d.id = r.detail_id
       WHERE r.host_element = $1
         AND r.exposure = $2`,
      [host_element, exposure]
    );

    if (result.rows.length > 0) {
      return res.json({
        detail: result.rows[0],
        explanation: `Partial match based on host element '${host_element}' and '${exposure}' exposure.`,
      });
    }

    // 3️⃣ Host-only
    result = await pool.query(
      `SELECT d.*
       FROM detail_usage_rules r
       JOIN details d ON d.id = r.detail_id
       WHERE r.host_element = $1`,
      [host_element]
    );

    if (result.rows.length > 0) {
      return res.json({
        detail: result.rows[0],
        explanation: `Closest match based on host element '${host_element}'.`,
      });
    }

    // 4️⃣ Fallback
    result = await pool.query(`SELECT * FROM details LIMIT 1`);

    res.json({
      detail: result.rows[0],
      explanation:
        "No exact rule matched. Showing a generally applicable detail.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- START SERVER ---------------- */
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
