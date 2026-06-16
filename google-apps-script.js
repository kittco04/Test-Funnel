function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No form data was received.");
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date(),
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
