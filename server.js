const express = require("express");
const path = require("path");
const { QUALIFICATIONS, RATINGS } = require("./data/qualifications");
const {
  createApplication,
  getApplications,
  getApplicationById,
  setApplicationStatus,
} = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---- Reference data for the frontend to build the form ----
app.get("/api/qualifications", (req, res) => {
  res.json({ ratings: RATINGS, qualifications: QUALIFICATIONS });
});

// ---- Submit a new application ----
app.post("/api/applications", (req, res) => {
  const {
    discord_name,
    discord_id,
    rank,
    rating,
    qualification,
    qual_code,
    justification,
    recommended_by,
  } = req.body;

  if (!discord_name || !rank || !qualification || !justification) {
    return res.status(400).json({
      error: "discord_name, rank, qualification, and justification are required.",
    });
  }

  const result = createApplication({
    discord_name,
    discord_id: discord_id || null,
    rank,
    rating: rating || null,
    qualification,
    qual_code: qual_code || null,
    justification,
    recommended_by: recommended_by || null,
  });

  res.status(201).json({ id: result.lastInsertRowid, status: "pending" });
});

// ---- List all applications (for the chief/officer review page) ----
app.get("/api/applications", (req, res) => {
  res.json(getApplications());
});

app.get("/api/applications/:id", (req, res) => {
  const app_ = getApplicationById(req.params.id);
  if (!app_) return res.status(404).json({ error: "Not found" });
  res.json(app_);
});

// ---- Approve / deny an application ----
app.patch("/api/applications/:id", (req, res) => {
  const { status, reviewer_notes } = req.body;
  if (!["pending", "approved", "denied"].includes(status)) {
    return res.status(400).json({ error: "status must be pending, approved, or denied" });
  }
  const existing = getApplicationById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Not found" });

  setApplicationStatus(req.params.id, status, reviewer_notes);
  res.json(getApplicationById(req.params.id));
});

app.listen(PORT, () => {
  console.log(`USS Missouri qual system running at http://localhost:${PORT}`);
});
