const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby4KuzjGQHfqxRZ2Jw_Y3nSzmHYiwwp7V_zdiZXYiPk/dev";

const form = document.getElementById("lead-form");
const thankYou = document.getElementById("thank-you");
const errorMessage = document.getElementById("form-error");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function getSelectedValue(formData, fieldName) {
  return formData.get(fieldName) ? String(formData.get(fieldName)).trim() : "";
}

function buildLeadPayload(formData) {
  return {
    fullName: getSelectedValue(formData, "fullName"),
    mobileNumber: getSelectedValue(formData, "mobileNumber"),
    email: getSelectedValue(formData, "email"),
    city: getSelectedValue(formData, "city"),
    preferredLocation: getSelectedValue(formData, "preferredLocation"),
    budget: getSelectedValue(formData, "budget"),
    goal: getSelectedValue(formData, "goal"),
    buyingTimeline: getSelectedValue(formData, "buyingTimeline"),
    leadSource: getSelectedValue(formData, "leadSource") || "Federal Land Properties by Kitt Legacy Group Lead Funnel",
  };
}

function showError(message) {
  errorMessage.textContent = message;
}

function showThankYou() {
  form.hidden = true;
  thankYou.hidden = false;
  thankYou.focus();
}

async function sendLead(payload) {
  if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")) {
    console.info("Google Apps Script URL is not set. Lead captured locally for testing:", payload);
    return { ok: true, setupPending: true };
  }

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  return response;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError("");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  const originalButtonText = submitButton.textContent;
  const payload = buildLeadPayload(new FormData(form));

  submitButton.textContent = "Sending...";
  form.classList.add("is-submitting");

  try {
    await sendLead(payload);
    form.reset();
    showThankYou();
  } catch (error) {
    console.error("Lead submission failed:", error);
    showError("Sorry, we could not send your request. Please try again or contact Kitt Legacy Group directly.");
  } finally {
    submitButton.textContent = originalButtonText;
    form.classList.remove("is-submitting");
  }
});
