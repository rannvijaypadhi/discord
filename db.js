const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "quals.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_name   TEXT NOT NULL,
    discord_id     TEXT,
    rank           TEXT NOT NULL,
    rating         TEXT,                 -- NULL for shipwide quals
    qualification  TEXT NOT NULL,
    qual_code      TEXT,
    justification  TEXT NOT NULL,        -- why they think they earned it
    recommended_by TEXT,                 -- chief/officer who is recommending them, if any
    status         TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | denied
    reviewer_notes TEXT,
    created_at     TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const insertApplication = db.prepare(`
  INSERT INTO applications
    (discord_name, discord_id, rank, rating, qualification, qual_code, justification, recommended_by)
  VALUES
    (@discord_name, @discord_id, @rank, @rating, @qualification, @qual_code, @justification, @recommended_by)
`);

const listApplications = db.prepare(`
  SELECT * FROM applications ORDER BY created_at DESC
`);

const getApplication = db.prepare(`SELECT * FROM applications WHERE id = ?`);

const updateStatus = db.prepare(`
  UPDATE applications
  SET status = ?, reviewer_notes = ?, updated_at = datetime('now')
  WHERE id = ?
`);

module.exports = {
  db,
  createApplication: (data) => insertApplication.run(data),
  getApplications: () => listApplications.all(),
  getApplicationById: (id) => getApplication.get(id),
  setApplicationStatus: (id, status, notes) => updateStatus.run(status, notes || null, id),
};
