// Client ID and API key from the Developer Console
var CLIENT_ID = '272434584361-13ac1lmsqg4esrn1mnuagpso0obgjl3v.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDzR0gTVm3WFHXQmEl1bUxehr3L1CmlmhM';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/calendar";

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */

function startDrive() {
  if (updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())) {
    listFiles();
  } else {
    handleAuthClick();
  }
}

function startCalendar() {
  if (updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())) {
    addEvent();
  } else {
    handleAuthClick();
  }
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    return true;
  } else {
    return false;
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Print files.
 */
function listFiles() {
  gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': "nextPageToken, files(id, name)"
  }).then(function (response) {
    console.log('Files:');
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log(file.name + ' (' + file.id + ')');
      }
    } else {
      console.log('No files found.');
    }
  });
}

var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2018-09-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2018-09-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  }
};

function addEvent() {
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function (event) {
    console.log('Event created: ' + event.htmlLink);
  });
}

