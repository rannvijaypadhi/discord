# USS Missouri SSN-780 — Qualification System

A small self-hosted web app: sailors submit qualification applications through
a form, and they land in a SQLite database that chiefs/officers can review,
approve, or deny from an admin page.

## What's included
- `server.js` — Express backend + REST API
- `db.js` — SQLite setup (creates `quals.db` automatically on first run)
- `data/qualifications.js` — the full qual list (shipwide + all 9 ratings),
  used to populate the dropdowns. Edit this file whenever quals change.
- `public/index.html` + `app.js` — the application form
- `public/admin.html` + `admin.js` — the chief/officer review queue

## Requirements
- [Node.js](https://nodejs.org) 18 or newer installed on the machine you're hosting from.

## Setup
```bash
cd uss-missouri-quals
npm install
npm start
```
Then open `http://localhost:3000` (or your server's address) in a browser.

- Application form: `/` or `/index.html`
- Review queue: `/admin.html`

The database file `quals.db` is created automatically the first time you run
the server — no manual SQL setup needed.

## Hosting it for real
Right now `admin.html` has no login — anyone with the link can approve/deny.
Since you're hosting it yourself, the two easiest ways to lock it down:
1. **Don't publish the `/admin.html` link** outside your chiefs/officers (fine for casual use, not real security).
2. **Add basic auth** in front of the admin routes — happy to add this if you want it; just say the word and I'll wire up a simple password gate.

To keep it running persistently (instead of just in a terminal), consider a
process manager like `pm2`:
```bash
npm install -g pm2
pm2 start server.js --name uss-missouri-quals
```

## Editing the qualification list
Everything in `data/qualifications.js` is a plain JS array. Each entry:
```js
{ rating: "Sonar Technician - Submarine (STS)", name: "Passive Broadband Operator",
  code: "PBB", description: "Outstanding performance standing watch as PBB." }
```
Set `rating: null` for shipwide quals (they show up regardless of what rating
the applicant selects). Restart the server after editing.

## Database schema
Table `applications`:
| column | notes |
|---|---|
| id | auto-increment |
| discord_name | required |
| discord_id | optional |
| rank | required |
| rating | nullable (shipwide quals) |
| qualification | required |
| qual_code | e.g. NEC code |
| justification | required |
| recommended_by | optional |
| status | `pending` / `approved` / `denied` |
| reviewer_notes | set on approve/deny |
| created_at / updated_at | timestamps |

You can inspect it directly with any SQLite browser (e.g. [DB Browser for
SQLite](https://sqlitebrowser.org/)) or the `sqlite3` CLI — the file is
`quals.db` in the project root.
