// Client ID and API key from the Developer Console
var CLIENT_ID = '272434584361-13ac1lmsqg4esrn1mnuagpso0obgjl3v.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDzR0gTVm3WFHXQmEl1bUxehr3L1CmlmhM';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive";
var oauthToken;

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
    gapi.load('picker');
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

//Verifica se usuário está logado
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    return true;
  } else {
    return false;
  }
}

// A simple callback implementation.
 

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

//Se usuário ja estiver logado, cria o evento, senão, loga
function startCalendar(todo) {
  if (updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())) {
    addEvent(todo);
  } else {
    handleAuthClick();
  }
}


//Cria o Evento no Google Calendar
function criaEvento(event, todo) {
  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event
  });

  request.execute(function (event) {
    todo.eventoAdd = true;
    todo.eventoLink = event.htmlLink;
    todo.eventoId = event.id;
    console.log(event.id);
    console.log("Evento criado: " + event.htmlLink);
  });
}

//Cria uma variável com o evento 
function addEvent(todo) {
  var splitDe = todo.date.split("/");
  var dataDe = splitDe[2] + "-" + splitDe[1] + "-" + splitDe[0];
  var dataAte;

  if (todo.prazo != "") {
    var splitAte = todo.prazo.split("/");
    dataAte = splitAte[2] + "-" + splitAte[1] + "-" + splitAte[0];
  } else {
    dataAte = dataDe;
  }

  var event = {
    summary: todo.title,
    description: "Lembrete Minimal TODO",
    start: {
      date: dataDe
    },
    end: {
      date: dataAte
    }
  };

  criaEvento(event, todo);

}

//Remove evento ao remover tarefa
function removeEvento(todo) {
  var request = gapi.client.calendar.events.delete({
    calendarId: 'primary',
    eventId: todo.eventoId
  });

  request.execute(function (event) {
    console.log('Event deleted: ' + todo.title);
  });
}