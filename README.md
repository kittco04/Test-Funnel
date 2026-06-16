# Federal Land Properties by Kitt Legacy Group Lead Funnel

This is a complete static lead generation website for Federal Land Properties by Kitt Legacy Group. It includes a luxury landing page, lead capture form, thank-you confirmation, mobile-friendly design, and a Google Sheets connection using Google Apps Script.

## Files

- `index.html` - Website content and lead form
- `style.css` - Luxury black, gold, and white responsive design
- `script.js` - Form validation, thank-you message, and Google Apps Script submission
- `google-apps-script.js` - Google Sheets receiver for form leads
- `README.md` - Setup guide
- `assets/federal-land-mid-year-sale.jpeg` - Promotional flyer used in the Mid Year Sale section
- `assets/kitt-kristoffers-co.png` - Leadership photo used in the Kitt Kristoffer Co section
- `assets/princess-binamira.jpeg` - Property specialist photo used in the specialist section
- `assets/shy-martinez.jpeg` - Property specialist photo used in the specialist section
- `assets/romenic-perillo.jpeg` - Property specialist photo used in the specialist section
- `assets/ron-dela-torre.jpeg` - Property specialist photo used in the specialist section
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

## Automatic Lead Notifications

The Google Apps Script can send notifications after each successful form submission.

By default, email notifications are already turned on for:

```text
cessabinamira.federalland@gmail.com
federalland.smartinez@gmail.com
federalland.rperillo@gmail.com
rd.federalland@yahoo.com
```

When a lead submits the form, the script will:

1. Save the lead to Google Sheets.
2. Email the lead details to all four specialists.
3. Optionally send Telegram, Viber, or SMS alerts if those settings are enabled.

### Enable Email Notifications

Email is enabled in `google-apps-script.js`:

```javascript
var NOTIFICATION_SETTINGS = {
  email: true,
  telegram: false,
  viber: false,
  sms: false
};
```

After pasting the updated script into Apps Script, click **Deploy -> Manage deployments**, edit your Web App deployment, choose a **New version**, and deploy again.

Google may ask you to authorize permissions for:

```text
Send email as you
Connect to an external service
View and manage spreadsheets
```

Allow these permissions so notifications can work.

### Optional Telegram Notification

To use Telegram:

1. Open Telegram and message **@BotFather**.
2. Create a new bot.
3. Copy the bot token.
4. Add the bot to a Telegram group or message the bot directly.
5. Get the chat ID using a Telegram chat ID tool or bot.
6. In `google-apps-script.js`, replace:

```javascript
var TELEGRAM_BOT_TOKEN = "PASTE_TELEGRAM_BOT_TOKEN_HERE";
var TELEGRAM_CHAT_ID = "PASTE_TELEGRAM_CHAT_ID_HERE";
```

Then turn Telegram on:

```javascript
telegram: true,
```

Deploy a new Apps Script version after editing.

### Optional Viber Notification

Viber alerts require a Viber Bot or Viber Business/API setup.

To use Viber:

1. Create or request access to a Viber Bot/API account.
2. Get your Viber bot token.
3. Get the receiver ID for the user or group that should receive alerts.
4. In `google-apps-script.js`, replace:

```javascript
var VIBER_BOT_TOKEN = "PASTE_VIBER_BOT_TOKEN_HERE";
var VIBER_RECEIVER_ID = "PASTE_VIBER_RECEIVER_ID_HERE";
```

Then turn Viber on:

```javascript
viber: true,
```

Deploy a new Apps Script version after editing.

### Optional SMS Notification

SMS requires a paid or prepaid SMS provider. In the Philippines, providers may include Semaphore, Twilio, or another local SMS gateway.

The script includes a simple generic SMS setup:

```javascript
var SMS_API_URL = "PASTE_SMS_PROVIDER_API_URL_HERE";
var SMS_API_KEY = "PASTE_SMS_PROVIDER_API_KEY_HERE";
```

The current recipient numbers are:

```text
639451165855
639387528661
639561334430
639274374749
```

After adding your provider URL and API key, turn SMS on:

```javascript
sms: true,
```

Deploy a new Apps Script version after editing.

Important: each SMS provider uses a slightly different format. If your provider gives different field names, update the `sendSmsNotifications` function in `google-apps-script.js`.

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
