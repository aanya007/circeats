/**
 * CircEats waitlist → Google Sheet webhook.
 *
 * Setup (~5 minutes, one time):
 * 1. Create a Google Sheet (e.g. "CircEats Waitlist").
 * 2. In the sheet: Extensions → Apps Script. Delete the stub and paste this file.
 * 3. Change SECRET below to any random string.
 * 3b. (Recommended) Limit the script's access to this one spreadsheet:
 *      Project Settings (gear icon) → tick "Show 'appsscript.json' manifest
 *      file in editor", then add to appsscript.json:
 *        "oauthScopes": ["https://www.googleapis.com/auth/spreadsheets.currentonly"],
 *      Without this, Google's consent screen asks for access to ALL your
 *      spreadsheets (the Apps Script default), even though this script only
 *      ever touches the sheet it's attached to.
 * 4. Deploy → New deployment → type "Web app":
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Authorize when prompted, then copy the web app URL (ends in /exec).
 * 5. In the project's .env.local set:
 *      SHEETS_WEBHOOK_URL=<that /exec URL>
 *      SHEETS_WEBHOOK_SECRET=<the same SECRET string>
 *
 * After editing this script you must Deploy → Manage deployments → Edit →
 * "New version" for changes to take effect.
 */

var SECRET = "change-me";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) {
      return json_({ error: "Unauthorized" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Postal code", "Role"]);
    }

    var email = String(data.email || "").toLowerCase();
    var existing = sheet
      .createTextFinder(email)
      .matchEntireCell(true)
      .findNext();
    if (existing) {
      return json_({ status: "already" });
    }

    sheet.appendRow([
      new Date(),
      String(data.name || ""),
      email,
      String(data.postalCode || ""),
      String(data.role || ""),
    ]);
    return json_({ status: "joined" });
  } catch (err) {
    return json_({ error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
