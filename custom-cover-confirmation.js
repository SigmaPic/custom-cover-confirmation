// Add this to your lovelace resources as
// url: /local/custom-cover-confirmation.js
// type: module


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
    this.entityObj.openCover();
  });
}

// Redefine onCloseTap(ev) function of ha-cover-controls
function onCloseTap2(ev) {
  displayMessage("Close", () => {
    ev.stopPropagation();
    this.entityObj.closeCover();
  });
}

// Load card helpers
_loadCardHelpers();

// When ha-cover-controls is defined, overload onOpenTap() and onCloseTap() functions
customElements.whenDefined('ha-cover-controls').then(() => {

  // Find the HaCoverControls class
  const HaCoverControls2 = customElements.get('ha-cover-controls');

  // Replace onOpenTap and onCloseTap in the base class
  HaCoverControls2.prototype.onOpenTap = onOpenTap2;
  HaCoverControls2.prototype.onCloseTap = onCloseTap2;
});

