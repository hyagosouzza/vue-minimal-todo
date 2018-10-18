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

function startCalendar(todo) {
  if (updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())) {
    addEvent(todo.id, todo.title, todo.date, todo.prazo);
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

function criaEvento(event) {
  console.log(event);
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function (event) {
    console.log('Evento criado: ' + event.htmlLink);
  });
}

function addEvent(todoId, title, data, prazo) {
  var splitDe = data.split('/');
  var dataDe = splitDe[2] + '-' + splitDe[1] + '-' + splitDe[0];
  var dataAte;

  if(prazo != undefined) {
    var splitAte = prazo.split('/');
    dataAte = splitAte[2] + '-' + splitAte[1] + '-' + splitAte[0];
  } else {
    dataAte = dataDe;
  }

  var id = todoId + dataDe.split('-').join('') + dataAte.split('-').join('');

  var event = {
    'id' : id,
    'summary': title,
    'description': 'Lembrete Minimal TODO',
    'start': {
      'date': dataDe
    },
    'end': {
      'date': dataAte
    }
  };

  var checkRequest = gapi.client.calendar.events.get({
    'calendarId' : 'primary',
    'eventId' : id
  });

  checkRequest.execute( (
    function(event) {
      return function(request) {
        if(request.code === 404) {
          criaEvento(event);
        } else {
          alert("Evento já existe");
        }
      };
    })(event) );
}


