# LBCC_WD — Workforce Development Front Door

Employer-facing site for LBCC Workforce & Economic Development:
entrance animation → overview → branching intake, with detail pages for
Training & Upskilling and Hiring & Talent, plus a footer-only
"Teach With Us" page for SME recruitment.

## Files in this repo (upload all of these together)
| File | Role |
|---|---|
| `index.html` | Landing page: entrance animation, overview, intake form |
| `training.html` | Training & Upskilling detail page |
| `hiring.html` | Hiring / internships / apprenticeships detail page |
| `teach.html` | SME roster page (linked only from footers, by design) |
| `apps-script-backend.gs` | Google Sheet backend (lives in Apps Script, kept here for reference) |
| `README.md` | This file |

Every page is fully self-contained (styles inlined). All cross-page links are
relative, so they work automatically as long as these files sit together in
the repo root. **Do not add any other project's `index.html` to this repo.**

## Enable GitHub Pages (one time)
1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: **main** → Folder: **/ (root)** → Save
3. Live in a minute or two at: `https://vrcalip-pixel.github.io/LBCC_WD/`
   (path is case-sensitive — match the repo name exactly)

## Make the form live (currently demo mode)
1. New Google Sheet → Extensions → Apps Script → paste `apps-script-backend.gs`
2. Set the owner emails in `ROUTES` (training / placement / teach)
3. Deploy → New deployment → **Web app** → Execute as: Me → Access: Anyone
4. Copy the `/exec` URL into `LBCC_CONFIG.endpoint` at the top of `index.html`

## Before public launch
- [ ] Confirm staff names/titles in the "Real people" section (index.html)
- [ ] Confirm the public WFD contact email in all four footers
- [ ] Webmaster (Christine) + Communications: approval and a link from the
      official LBCC Workforce Development page
- [ ] Generate the QR code for business cards → the live URL above
