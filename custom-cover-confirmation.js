// 1. Copy this file in the folder $HA_CONFIG/www 
// 2. Add this resources to your lovelace in Settings->Dashboards>Resources and put /local/custom-cover-confirmation.js as url.

// Load card helpers
async function _loadCardHelpers() {
  const helpers = await loadCardHelpers();
  const element = helpers.createRowElement({type: "call-service", name: "a", service: "a.b"});
}

// Display the message in a popup and call given handler if user press OK
function displayMessage(message, handler) {
  const btn = document.createElement('ha-call-service-button');
  btn.callService = handler;
  btn.confirmation = message;
  document.querySelector("home-assistant").appendChild(btn);
  btn.buttonTapped();
  document.querySelector("home-assistant").removeChild(btn);
}

// Redefine onOpenTap(ev) function of ha-cover-controls
function onOpenTap2(ev) {
  displayMessage("Open", () => {
    ev.stopPropagation();
    this.hass.callService("cover", "open_cover", {entity_id: this.stateObj.entity_id,});
  });
}

// Redefine onCloseTap(ev) function of ha-cover-controls
function onCloseTap2(ev) {
  displayMessage("Close", () => {
    ev.stopPropagation();
    this.hass.callService("cover", "close_cover", {entity_id: this.stateObj.entity_id,});
  });
}

// Load card helpers
_loadCardHelpers();

// When ha-cover-controls is defined, overload onOpenTap() and onCloseTap() functions
customElements.whenDefined('ha-cover-controls').then(() => {

  // Find the HaCoverControls class
  const HaCoverControls2 = customElements.get('ha-cover-controls');

  // Replace onOpenTap and onCloseTap in the base class
  HaCoverControls2.prototype._onOpenTap = onOpenTap2;
  HaCoverControls2.prototype._onCloseTap = onCloseTap2;
});

