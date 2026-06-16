var SPECIALIST_EMAILS = [
  "cessabinamira.federalland@gmail.com",
  "federalland.smartinez@gmail.com",
  "federalland.rperillo@gmail.com",
  "rd.federalland@yahoo.com"
];

var NOTIFICATION_SETTINGS = {
  email: true,
  telegram: false,
  viber: false,
  sms: false
};

var TELEGRAM_BOT_TOKEN = "PASTE_TELEGRAM_BOT_TOKEN_HERE";
var TELEGRAM_CHAT_ID = "PASTE_TELEGRAM_CHAT_ID_HERE";

var VIBER_BOT_TOKEN = "PASTE_VIBER_BOT_TOKEN_HERE";
var VIBER_RECEIVER_ID = "PASTE_VIBER_RECEIVER_ID_HERE";

var SMS_API_URL = "PASTE_SMS_PROVIDER_API_URL_HERE";
var SMS_API_KEY = "PASTE_SMS_PROVIDER_API_KEY_HERE";
var SMS_RECIPIENT_NUMBERS = [
  "639451165855",
  "639387528661",
  "639561334430",
  "639274374749"
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No form data was received.");
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();

    sheet.appendRow([
      timestamp,
      data.fullName || "",
      data.mobileNumber || "",
      data.email || "",
      data.city || "",
      data.preferredLocation || "",
      data.budget || "",
      data.goal || "",
      data.buyingTimeline || "",
      data.leadSource || "Federal Land Properties by Kitt Legacy Group Lead Funnel"
    ]);

    sendNotifications(data, timestamp);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Lead saved successfully."
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotifications(data, timestamp) {
  var message = buildLeadMessage(data, timestamp);

  if (NOTIFICATION_SETTINGS.email) {
    safeRun(function () {
      MailApp.sendEmail({
        to: SPECIALIST_EMAILS.join(","),
        subject: "New Federal Land Lead: " + safeValue(data.fullName),
        body: message
      });
    }, "Email notification failed");
  }

  if (NOTIFICATION_SETTINGS.telegram) {
    safeRun(function () {
      sendTelegramNotification(message);
    }, "Telegram notification failed");
  }

  if (NOTIFICATION_SETTINGS.viber) {
    safeRun(function () {
      sendViberNotification(message);
    }, "Viber notification failed");
  }

  if (NOTIFICATION_SETTINGS.sms) {
    safeRun(function () {
      sendSmsNotifications(message);
    }, "SMS notification failed");
  }
}

function buildLeadMessage(data, timestamp) {
  return [
    "New Federal Land Properties Lead",
    "",
    "Timestamp: " + timestamp,
    "Full Name: " + safeValue(data.fullName),
    "Mobile Number: " + safeValue(data.mobileNumber),
    "Email: " + safeValue(data.email),
    "City: " + safeValue(data.city),
    "Preferred Location: " + safeValue(data.preferredLocation),
    "Budget: " + safeValue(data.budget),
    "Goal: " + safeValue(data.goal),
    "Buying Timeline: " + safeValue(data.buyingTimeline),
    "Lead Source: " + (data.leadSource || "Federal Land Properties by Kitt Legacy Group Lead Funnel")
  ].join("\n");
}

function sendTelegramNotification(message) {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    }),
    muteHttpExceptions: true
  });
}

function sendViberNotification(message) {
  UrlFetchApp.fetch("https://chatapi.viber.com/pa/send_message", {
    method: "post",
    contentType: "application/json",
    headers: {
      "X-Viber-Auth-Token": VIBER_BOT_TOKEN
    },
    payload: JSON.stringify({
      receiver: VIBER_RECEIVER_ID,
      type: "text",
      text: message
    }),
    muteHttpExceptions: true
  });
}

function sendSmsNotifications(message) {
  SMS_RECIPIENT_NUMBERS.forEach(function (number) {
    UrlFetchApp.fetch(SMS_API_URL, {
      method: "post",
      payload: {
        apikey: SMS_API_KEY,
        number: number,
        message: message
      },
      muteHttpExceptions: true
    });
  });
}

function safeRun(callback, logPrefix) {
  try {
    callback();
  } catch (error) {
    console.log(logPrefix + ": " + error.message);
  }
}

function safeValue(value) {
  return value ? String(value) : "";
}
