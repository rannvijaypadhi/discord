function fmtDate(iso) {
  return new Date(iso + "Z").toLocaleString();
}

function badge(status) {
  return `<span class="status-badge status-${status}">${status}</span>`;
}

async function loadApplications() {
  const list = document.getElementById("list");
  const res = await fetch("/api/applications");
  const apps = await res.json();

  if (apps.length === 0) {
    list.innerHTML = `<div class="empty">No applications yet.</div>`;
    return;
  }

  list.innerHTML = apps
    .map((a) => `
      <div class="app-row" data-id="${a.id}">
        <div class="app-top">
          <div>
            <span class="app-name">${escapeHtml(a.discord_name)}</span>
            &middot; ${escapeHtml(a.rank)}
            ${a.rating ? `&middot; ${escapeHtml(a.rating)}` : ""}
          </div>
          ${badge(a.status)}
        </div>
        <div class="app-meta">
          Applying for <span class="app-qual">${escapeHtml(a.qualification)}${a.qual_code ? ` (${escapeHtml(a.qual_code)})` : ""}</span>
          ${a.recommended_by ? ` &middot; Recommended by ${escapeHtml(a.recommended_by)}` : ""}
          &middot; Submitted ${fmtDate(a.created_at)}
        </div>
        <div class="app-just">${escapeHtml(a.justification)}</div>
        ${a.reviewer_notes ? `<div class="app-meta">Reviewer notes: ${escapeHtml(a.reviewer_notes)}</div>` : ""}
        <div class="app-actions">
          <button class="secondary approve" data-action="approved" data-id="${a.id}">Approve</button>
          <button class="secondary deny" data-action="denied" data-id="${a.id}">Deny</button>
          ${a.status !== "pending" ? `<button class="secondary" data-action="pending" data-id="${a.id}">Reset to Pending</button>` : ""}
        </div>
      </div>
    `)
    .join("");

  list.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => updateStatus(btn.dataset.id, btn.dataset.action));
  });
}

async function updateStatus(id, status) {
  let reviewer_notes = null;
  if (status === "denied") {
    reviewer_notes = prompt("Optional: reason for denial") || null;
  }
  await fetch(`/api/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, reviewer_notes }),
  });
  loadApplications();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", loadApplications);
