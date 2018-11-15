// The Browser API key obtained from the Google Developers Console.
var developerKey = 'AIzaSyDzR0gTVm3WFHXQmEl1bUxehr3L1CmlmhM';
// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = "272434584361-13ac1lmsqg4esrn1mnuagpso0obgjl3v.apps.googleusercontent.com";
// Scope to use to access user's photos.
var scope = 'https://www.googleapis.com/auth/drive';
var pickerApiLoaded = false;
var oauthToken;

// Use the API Loader script to load google.picker and gapi.auth.
function onApiLoad() {
  gapi.load('auth2', onAuthApiLoad);
  gapi.load('picker', onPickerApiLoad);
}

function onAuthApiLoad() {
  gapi.auth2.authorize({
    client_id: clientId,
    scope: scope
  }, handleAuthResult);
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

// Create and render a Picker object for picking user Photos.
function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    var picker = new google.picker.PickerBuilder().
      addView(google.picker.ViewId.DOCUMENTS).
      setOAuthToken(oauthToken).
      setDeveloperKey(developerKey).
      setCallback(pickerCallback).
      build();
    picker.setVisible(true);
  }
}

// A simple callback implementation.
function pickerCallback(data) {
  var url = 'nothing';
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var doc = data[google.picker.Response.DOCUMENTS][0];
    url = doc[google.picker.Document.URL];
  }
  var message = 'You picked: ' + url;
  console.log(message);
}