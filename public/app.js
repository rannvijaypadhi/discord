let QUALS = [];

async function loadReferenceData() {
  const res = await fetch("/api/qualifications");
  const data = await res.json();
  QUALS = data.qualifications;

  const ratingSelect = document.getElementById("rating");
  data.ratings.forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    ratingSelect.appendChild(opt);
  });

  populateQuals(""); // default: shipwide
}

function populateQuals(rating) {
  const qualSelect = document.getElementById("qualification");
  qualSelect.innerHTML = "";

  const matches = QUALS.filter((q) => (rating ? q.rating === rating : !q.rating));

  if (matches.length === 0) {
    qualSelect.innerHTML = `<option value="">No qualifications listed for this rating yet</option>`;
    return;
  }

  qualSelect.innerHTML = `<option value="">— Select a qualification —</option>`;
  matches.forEach((q) => {
    const opt = document.createElement("option");
    opt.value = q.name;
    opt.dataset.code = q.code || "";
    opt.dataset.desc = q.description || "";
    opt.textContent = q.code ? `${q.name} (${q.code})` : q.name;
    qualSelect.appendChild(opt);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadReferenceData();

  document.getElementById("rating").addEventListener("change", (e) => {
    populateQuals(e.target.value);
    document.getElementById("qualDesc").textContent = "";
  });

  document.getElementById("qualification").addEventListener("change", (e) => {
    const opt = e.target.selectedOptions[0];
    document.getElementById("qualDesc").textContent = opt?.dataset.desc || "";
  });

  document.getElementById("qualForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("formMsg");
    msg.textContent = "";
    msg.className = "";

    const form = e.target;
    const qualOpt = form.qualification.selectedOptions[0];

    const payload = {
      discord_name: form.discord_name.value.trim(),
      discord_id: form.discord_id.value.trim(),
      rank: form.rank.value.trim(),
      rating: form.rating.value || null,
      qualification: form.qualification.value,
      qual_code: qualOpt?.dataset.code || null,
      recommended_by: form.recommended_by.value.trim(),
      justification: form.justification.value.trim(),
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      msg.textContent = `Application submitted (#${data.id}). It's now pending review.`;
      msg.className = "ok";
      form.reset();
      populateQuals("");
    } catch (err) {
      msg.textContent = err.message;
      msg.className = "err";
    }
  });
});
