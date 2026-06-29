# LBCC Workforce Development — Employer Intake Page

A single-page site you can send to local employers. It does two jobs:

1. **Shows what LBCC can offer** — a flagship AI upskilling series plus a broader, customizable workshop catalog.
2. **Collects a 5-minute needs assessment** that lands in a spreadsheet and emails your Workforce Development team.

Files:
- `index.html` — the page (self-contained; no build step).
- `apps-script-backend.gs` — the backend that captures submissions.

---

## 1. Wire up the backend (pick one)

### Option A — Google Sheet (recommended)
Free, no submission limit, data lands in a Sheet your team can sort and analyze.

1. Create a new Google Sheet.
2. **Extensions → Apps Script**, paste in `apps-script-backend.gs`, set `NOTIFY_EMAIL`.
3. **Deploy → New deployment → Web app** → *Execute as: Me* → *Who has access: Anyone* → **Deploy**.
4. Copy the Web app URL (ends in `/exec`).
5. In `index.html`, at the top, set:
   ```js
   window.LBCC_CONFIG = { endpoint: "PASTE_URL_HERE", mode: "apps_script", ... };
   ```

### Option B — Formspree (zero-code, 50 submissions/month free)
1. Create a form at formspree.io, copy its endpoint (`https://formspree.io/f/xxxx`).
2. In `index.html`: `endpoint: "https://formspree.io/f/xxxx", mode: "formspree"`.

> Until you set an endpoint, the page runs in **demo mode** — the form validates and shows a confirmation but saves nothing. Good for testing the look and flow.

---

## 2. Publish (GitHub Pages)

Drop `index.html` into a repo (e.g. `lbcc-workforce-intake`), enable Pages on the main branch, and share the URL — matches your existing `vrcalip-pixel.github.io` setup.

---

## 3. Before you send it out — quick customizations

- **Contact line** (footer): confirm the public WFD email/phone you want listed. Placeholder is `vcalip@lbcc.edu`.
- **Workshop list**: edit or trim the AI series cards and the "Beyond AI" pills to match what your team will actually commit to delivering.
- **Notify email** in the Apps Script: who on the WFD team should get each inquiry.
- **Lumens / registration**: if you want a "register an existing course" path, the footer is the place to add a Lumens link (`lbcc.augusoft.net`).

---

## Notes on the data

The form sends a fixed set of fields in a stable order, so spreadsheet columns won't drift. Multi-select answers (roles, AI use cases) are stored as semicolon-separated text in one cell — easy to filter and tally for a needs-assessment summary.
