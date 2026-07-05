/**
 * LBCC Workforce Development — Employer Intake backend (v2, two-door model)
 * -------------------------------------------------------------------------
 * Receives submissions from the intake page, appends them to the bound
 * Google Sheet, and emails the owner of the matching service area.
 *
 * SETUP (5 minutes):
 *  1. Create a new Google Sheet.
 *  2. Extensions > Apps Script. Paste this file in. Set the emails below.
 *  3. Deploy > New deployment > Web app
 *       - Execute as: Me   - Who has access: Anyone
 *  4. Copy the /exec URL into LBCC_CONFIG.endpoint in index.html.
 *
 * ROUTING: each pathway notifies its owner (per the July 2026 meeting:
 * Stephanie owns Training & Upskilling; Veronica owns Placement).
 * Replace the placeholder addresses before launch.
 */

var ROUTES = {
  'Training & Upskilling':                 'training-owner@lbcc.edu',   // Stephanie
  'Hiring, Internships & Apprenticeships': 'placement-owner@lbcc.edu',  // Veronica
  'Teach With Us':                         'recruitment-owner@lbcc.edu' // SME roster owner
};
var FALLBACK_EMAIL = 'vcalip@lbcc.edu';
var SHEET_NAME = 'Intake';

// Fixed column order — keep in sync with FIELDS in index.html.
var COLUMNS = [
  'submitted_at','pathway','contact_name','email','phone','org_name','sector','company_size',
  'topics','participants','format','timeline','skill_gap',
  'talent_interest','roles_needed','positions','talent_notes',
  'expertise','experience_years','availability','profile_link','teach_notes','page'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);
    var row = COLUMNS.map(function(k) {
      var v = data[k];
      return Array.isArray(v) ? v.join('; ') : (v == null ? '' : v);
    });
    sheet.appendRow(row);

    var to = ROUTES[data.pathway] || FALLBACK_EMAIL;
    var summary = COLUMNS.map(function(k) {
      var v = data[k];
      var val = Array.isArray(v) ? v.join(', ') : (v || '');
      return val ? (k + ': ' + val) : null;
    }).filter(Boolean).join('\n');

    MailApp.sendEmail({
      to: to,
      cc: FALLBACK_EMAIL === to ? '' : FALLBACK_EMAIL,
      subject: '[WD Intake] ' + (data.pathway || 'Inquiry') + ' — ' + (data.org_name || data.contact_name || 'Unknown'),
      body: 'New inquiry from the workforce development front door.\n' +
            'Two-business-day response clock starts now.\n\n' + summary
    });

    return ContentService.createTextOutput(JSON.stringify({result:'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({result:'error', error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('LBCC intake endpoint is live.');
}
