# Federal Land Properties by Kitt Legacy Group Lead Funnel

This is a complete static lead generation website for Federal Land Properties by Kitt Legacy Group. It includes a luxury landing page, lead capture form, thank-you confirmation, mobile-friendly design, and a Google Sheets connection using Google Apps Script.

## Files

- `index.html` - Website content and lead form
- `style.css` - Luxury black, gold, and white responsive design
- `script.js` - Form validation, thank-you message, and Google Apps Script submission
- `google-apps-script.js` - Google Sheets receiver for form leads
- `README.md` - Setup guide
- `assets/federal-land-mid-year-sale.jpeg` - Promotional flyer used in the Mid Year Sale section
- `assets/princess-binamira.jpeg` - Property specialist photo used in the specialist section
- `assets/shy-martinez.jpeg` - Property specialist photo used in the specialist section
- `assets/romenic-perillo.jpeg` - Property specialist photo used in the specialist section
- Embedded video highlight - Uses Federal Land's official YouTube corporate video as a short credibility segment

## How To Connect The Form To Google Sheets

### 1. Create a Google Sheet

Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.

Suggested spreadsheet name:

```text
Federal Land Properties by Kitt Legacy Group Leads
```

### 2. Add column headers

In the first row of the sheet, add these exact headers:

```text
Timestamp
Full Name
Mobile Number
Email
City
Preferred Location
Budget
Goal
Buying Timeline
Lead Source
```

### 3. Open Apps Script

In the Google Sheet menu, click:

```text
Extensions -> Apps Script
```

### 4. Paste the Apps Script code

Delete any sample code in the Apps Script editor.

Open `google-apps-script.js` from this website folder, copy all of the code, and paste it into the Apps Script editor.

Click **Save**.

### 5. Deploy as a Web App

In Apps Script, click:

```text
Deploy -> New deployment
```

Then:

- Click the gear icon beside "Select type"
- Choose **Web app**
- Description: `Kitt Legacy Group Lead Form`
- Execute as: **Me**
- Who has access: **Anyone**

### 6. Set access to Anyone

Make sure **Who has access** is set to:

```text
Anyone
```

This allows the website form to send leads into your Google Sheet.

### 7. Copy the Web App URL

After deployment, Google will show a Web App URL.

Copy that full URL.

### 8. Paste the URL into `script.js`

Open `script.js` and find this line:

```javascript
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

Replace the placeholder text with your Web App URL:

```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

Save the file.

### 9. Test the form

Open `index.html` in a browser.

Fill out the lead form and submit it.

You should see this thank-you message:

```text
Thank you! A Kitt Legacy Group property specialist will contact you shortly with a personalized recommendation.
```

Then check your Google Sheet. A new row should appear with the submitted lead details.

## Editing Tips

- To change page text, edit `index.html`.
- To change colors, edit the color values at the top of `style.css`.
- To add or remove form options, edit the radio buttons and location dropdown in `index.html`.
- To change the Google Sheet columns, update both the sheet headers and the `appendRow` order in `google-apps-script.js`.

## Important Notes

- This website does not need a backend server.
- The form will show the thank-you message even before the Google Apps Script URL is added, so you can preview the design immediately.
- For live lead capture, the Google Apps Script Web App URL must be pasted into `script.js`.
- If you update the Apps Script code later, deploy a new version in Apps Script so the live form uses the latest code.
- Property names, sample locations, and published price ranges in the page are based on public Federal Land website information. Confirm current availability and pricing before sending recommendations to clients.
- FNG project names, details, and sample imagery are based on public Federal Land NRE Global website information. Confirm current availability, payment terms, and inventory before presenting offers to clients.
- The video highlight is embedded from Federal Land's official YouTube video instead of downloading or rehosting the clip.
- Promotional discounts shown in the Mid Year Sale section should be confirmed before presenting offers to clients.
