<template>

  <div id="app">
    
    <a href="https://github.com/hyagosouzza/vue-minimal-todo" target="_blank" class="github-corner" aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#1dd1a1; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>

    <div class="container mx-auto">
      <div class="mx-auto w-full md:w-1/2 py-8 px-4">
        
        <!-- Title -->
        <div class="flex justify-around">
          <div class="flex items-center mb-6">
            <h1 class="tracking-wide text-white mr-6"><span>MINIMAL</span> TO DO</h1>

            <img src="/src/assets/logo.svg" class="hidden md:block" width="40" alt="">
          </div>
          <div class="flex items-center mb-6">
          </div>
        </div>
        

        <!-- New Todo Input -->
        <div v-on:keyup.enter="addTodo" class="input-wrapper relative">
          <input type="text"
                v-model="newTodo"
                placeholder="O que precisa ser feito?"
                class="p-4 mb-4 w-full bg-transparent border-grey-light text-white border rounded">
          <input type="checkbox" id="dataInicio" v-model="checked3">
          <label class="text-white" for="dataInicio">Escolher data inicial.</label>
          <br>
          <br>
          <datepicker :language="ptBR"
                      v-if="checked3 === true"
                      v-model="dataInicio"
                      placeholder="Data de inicio"></datepicker>
          <br>

          <input type="checkbox" id="checkbox" v-model="checked">
          <label class="text-white" for="checkbox">Tarefa com prazo de conclusão.</label>
          <br>
          <br>
          <datepicker :language="ptBR"
                v-if="checked === true"
                v-model="prazo"
                placeholder="Prazo de conclusão"></datepicker>
        </div>
      <br>
        <!-- To Do List -->    
        <ul class="list-reset">
          <transition-group name="fade">
            <li v-for="todo in todos" :key="todo.id"
                class="py-6 px-3 border-b border-grey-darkest flex justify-between items-center relative todo__item">
              <div class="flex justify-start">
                <div>
                  <input type="checkbox" :id="todo.id" class="cbx hidden" v-model="todo.completed">
                  <label :for="todo.id" class="text-xl cbx__child"></label>
                  <label class="cbx__lbl text-white inline-block mt-1" :class="{ completed: todo.completed }">{{ todo.title }}</label>
                  <br>
                  <label style="font-size:10px;font-style:italic;" class="cbx__lbl text-yellow-dark inline-block mt-1" :class="{ completed: todo.completed }">{{todo.date}} <span class="text-green-dark" v-if="todo.prazo">até</span> {{todo.prazo}}</label>
                </div>
              </div>
              <div class="flex justify-center">
                  <p><a target="_blank"
                    v-bind:href="todo.driveLink" v-if="todo.driveLink != '' && todo.completed === false"><button ><img src="src/assets/anexo.png" width="40" height="40" v-bind:title="todo.driveNome"></button></a></p>
                  <p class="disable"><a target="_blank"
                    v-bind:href="todo.driveLink" v-if="todo.driveLink != '' && todo.completed === true"><button ><img src="src/assets/anexo.png" width="40" height="40"></button></a></p>
              </div>
              <div class="flex justify-end">
                <div>
                  <button v-on:click="gravarTarefa(todo.title, todo.date, todo.prazo)" v-if="todo.completed === false" @click="toggleModal" class="able"><img src="src/assets/edit.png" ></button>
                  <button v-if="todo.completed === true" class="disable"><img src="src/assets/edit.png"></button>
                  <div v-if="modal" @click.self="toggleModal" class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex">
                    <div class="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">
                      <h2 style="border-bottom: 1px solid gray" class="text-4xl text-center font-bold font-hairline md:leading-loose text-blue md:mt-8 mb-4">Editar Tarefa</h2>

                      <h3 class="text-center">Nome atual: {{nomeAtual}}</h3>
                      <h3 class="text-center">Data inicio: {{dataIAtual}}</h3>
                      <h3 class="text-center">Data fim: {{dataFAtual}}</h3>
                      <br>
                      <br>
                      <p class="text-xl leading-normal mb-8 text-center">
                        <input type="text"
                               v-model="newTitle"
                               placeholder="Novo nome">
                        <br>
                        <br>
                        <input type="checkbox" id="newDataI" v-model="checked4">
                        <label class="text-black" for="newDataI">Mudar data inicial?</label>
                        <br>
                        <br>
                        <datepicker :language="ptBR"
                                    v-if="checked4 === true"
                                    v-model="newDataI"
                                    class="txt-black"
                                    placeholder="Data Inicial"></datepicker>

                        <input type="checkbox" id="newPrazo" v-model="checked2">
                        <label class="text-black" for="newPrazo">Mudar prazo de conclusão?</label>
                        <br>
                        <br>
                        <datepicker :language="ptBR"
                                    v-if="checked2 === true"
                                    v-model="newPrazo"
                                    class="txt-black"
                                    placeholder="Prazo de conclusão"></datepicker>
                      </p>
                      <div  class="inline-flex justify-center">
                        <button v-on:click="mudarVars()" @click="toggleModal" type="button" class="bg-grey-lighter flex-1 md:flex-none border-b-2 border-red ml-2 hover:bg-red-lightest text-grey-darkest font-bold py-4 px-6 rounded" data-dismiss="modal">Sair</button>
                        <button v-on:click="editarTodo(newTitle, newDataI, newPrazo)" @click="toggleModal" type="button" class="bg-grey-lighter flex-1 border-b-2 md:flex-none border-green ml-2 hover:bg-green-lightest text-grey-darkest font-bold py-4 px-6 rounded" data-dismiss="modal">Salvar</button>

                      </div>
                      <span v-on:click="mudarVars()" @click="toggleModal" class="absolute pin-t pin-r pt-4 px-4">
                        <svg class="h-12 w-12 text-grey hover:text-grey-darkest" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Fechar</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                    </div>
                  </div>
                </div>
                <div>
                  <button v-on:click="callDrive(todo)" id="pick" v-if="todo.completed === false" class="able"><img src="src/assets/google-drive.png"></button>
                  <button v-if="todo.completed === true" class="disable"><img src="src/assets/google-drive.png"></button>
                </div>
                <div>
                  <button class="able" v-on:click="callCalendar(todo)" v-if="todo.eventoAdd === false"><img src="src/assets/calendar-icon.png"></button>
                  <a v-if="todo.eventoAdd === true" target="_blank"
                    v-bind:href="todo.eventoLink"><button><img src="src/assets/calendar-icon.png"></button></a>
                    <p class="text-white text-xs" v-if="todo.eventoAdd === true">Evento Criado</p>
                </div>
                <div><button v-on:click="removeTodo(todo)" type="button" class="flex items-center delete-button absolute pin-r">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button></div>

              </div>
            </li>
          </transition-group>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = "todo-storage";
var now = new Date();
import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";

export default {
  name: "app",
  //Componente do calendário para prazo de conclusão
  components: {
    Datepicker
  },
  data() {
    return {
      //Dados globais
      modal: false,
      ptBR: ptBR,
      newTodo: "",
      newTitle: "",
      nomeAtual: "",
      dataIAtual: "",
      dataFAtual: "",
      todos: [],
      show_guide: false,
      checked: false,
      checked2: false,
      checked3: false,
      checked4: false,
      dataInicio: "",
      prazo: "",
      todoIdAux: null,
      newDataI: "",
      newPrazo: "",
    };
  },

  methods: {
    toggleModal() {
      this.modal = !this.modal;
    },
    //Adiciona tarefa
    addTodo() {
      //Se não tiver data de inicio
      if (this.dataInicio === "") {
        if (this.prazo === "") {
          if (this.newTodo.length) {
            this.todos.push({
              title: this.newTodo,
              completed: false,
              eventoAdd: false,
              driveLink: "",
              driveNome: "",
              eventoLink: "",
              eventoId: "",
              date:
                now.getDate() +
                "/" +
                (now.getMonth() + 1) +
                "/" +
                now.getFullYear(),
              id: this.todos.length,
              prazo: ""
            });
          }
          //Se tiver prazo de conclusão
        } else {
          var dataAnalise = now.getDate() +
            "/" +
            (now.getMonth() + 1) +
            "/" +
            now.getFullYear();
          console.log("DATA INICIAL: " + dataAnalise)
          console.log("PRAZO ESCOLHIDO: "+ this.prazo.toLocaleDateString("pt-BR"))
          var prazoAnalise = this.prazo.toLocaleDateString("pt-BR");
          var splitDataAnalise = dataAnalise.split("/");
          var splitPrazoAnalise = prazoAnalise.split("/");

          if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])){
            if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])){
              if(parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])){
                if (this.newTodo.length) {
                  this.todos.push({
                    title: this.newTodo,
                    completed: false,
                    eventoAdd: false,
                    driveLink: "",
                    driveNome: "",
                    eventoLink: "",
                    eventoId: "",
                    date:
                      now.getDate() +
                      "/" +
                      (now.getMonth() + 1) +
                      "/" +
                      now.getFullYear(),
                    id: this.todos.length,
                    prazo: this.prazo.toLocaleDateString("pt-BR")
                  });
                }
              } else {
                this.alerta("Data prazo menor do que data inicial. EVENTO NÃO CRIADO 1");
              }
            } else {
              this.alerta("Data prazo menor do que data inicial. EVENTO NÃO CRIADO 2");
            }
          } else {
            this.alerta("Data prazo menor do que data inicial. EVENTO NÃO CRIADO 3");
          }
        }
     } else{
        if (this.prazo === "") {
          if (this.newTodo.length) {
            this.todos.push({
              title: this.newTodo,
              completed: false,
              eventoAdd: false,
              driveLink: "",
              driveNome: "",
              eventoLink: "",
              eventoId: "",
              date: this.dataInicio.toLocaleDateString("pt-BR"),
              id: this.todos.length,
              prazo: ""
            });
          }
          //Se tiver prazo de conclusão
        } else {
          var dataAnalise = this.dataInicio.toLocaleDateString("pt-BR");
          var prazoAnalise = this.prazo.toLocaleDateString("pt-BR");
          var splitDataAnalise = dataAnalise.split("/");
          var splitPrazoAnalise = prazoAnalise.split("/");

          if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])) {
            if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])) {
              if (parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])) {
                if (this.newTodo.length) {
                  this.todos.push({
                    title: this.newTodo,
                    completed: false,
                    eventoAdd: false,
                    driveLink: "",
                    driveNome: "",
                    eventoLink: "",
                    eventoId: "",
                    date: this.dataInicio.toLocaleDateString("pt-BR"),
                    id: this.todos.length,
                    prazo: this.prazo.toLocaleDateString("pt-BR")
                  });
                }
              } else{
                this.alerta("Data prazo menor do que data inicial. EVENTO NÃO CRIADO");
              }
            } else{
              this.alerta("Data prazo menor do que data inicial. EVENTO NÃO CRIADO");
            }
          } else{
            this.alerta("Data prazo menor do que data inicial. EVENTO NÃO CRIADO");
          }
        }
      }

      this.newTodo = "";
      this.prazo = "";
      this.checked = false;
      this.checked3= false;
      this.dataInicio = "";
    },
    //Editar tarefa
    editarTodo(newTitle, newDataI, newPrazo) {
      if (this.newTitle.length || !(this.newPrazo === "") || !(this.newDataI === "")) {
        var contador = 0;

        for (contador = 0; this.todos.length; contador++) {
          if (this.todos[contador].title === this.nomeAtual) {

            if ((this.newTitle.length) && (this.newDataI === "") && (this.newPrazo == "")){
              console.log("1");
              this.todos[contador].title = newTitle;
            }else if ((this.newTitle.length) && !(this.newDataI === "") && (this.newPrazo === "")){
              console.log("2");
              if(!(this.todos[contador].prazo === "")) {
                var dataAnalise = newDataI.toLocaleDateString("pt-BR");
                var splitDataAnalise = dataAnalise.split("/");
                var splitPrazoAnalise = this.todos[contador].prazo.split("/");
                if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])) {
                  if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])) {
                    if (parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])) {
                      this.todos[contador].title = newTitle;
                      this.todos[contador].date = newDataI.toLocaleDateString("pt-BR");
                    }else {
                      this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                    }
                  } else {
                    this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                  }
                } else {
                  this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                }
              } else{
                this.todos[contador].title = newTitle;
                this.todos[contador].date = newDataI.toLocaleDateString("pt-BR");
              }
            } else if ((this.newTitle.length) && (this.newDataI === "") && !(this.newPrazo === "")){
              console.log("3");
              var splitDataAnalise = this.todos[contador].date.split("/");
              var prazoAnalise = newPrazo.toLocaleDateString("pt-BR");
              var splitPrazoAnalise = prazoAnalise.split("/");
              if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])) {
                if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])) {
                  if (parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])) {
                    this.todos[contador].title = newTitle;
                    this.todos[contador].prazo = newPrazo.toLocaleDateString("pt-BR");
                  } else {
                    this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                  }
                } else {
                  this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                }
              } else {
                this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
              }
            } else if (!(this.newTitle.length) && !(this.newDataI === "") && (this.newPrazo === "")){
              console.log("4");
              if(!(this.todos[contador].prazo === "")) {
                var dataAnalise = newDataI.toLocaleDateString("pt-BR");
                var splitDataAnalise = dataAnalise.split("/");
                var splitPrazoAnalise = this.todos[contador].prazo.split("/");
                if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])) {
                  if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])) {
                    if (parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])) {
                      this.todos[contador].date = newDataI.toLocaleDateString("pt-BR");
                    } else {
                      this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                    }
                  } else {
                    this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                  }
                } else {
                  this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                }
              } else {
                this.todos[contador].date = newDataI.toLocaleDateString("pt-BR");
              }
            } else if (!(this.newTitle.length) && !(this.newDataI === "") && !(this.newPrazo === "")){
              console.log("5");
              var dataAnalise = newDataI.toLocaleDateString("pt-BR");
              var prazoAnalise = newPrazo.toLocaleDateString("pt-BR");
              var splitDataAnalise = dataAnalise.split("/");
              var splitPrazoAnalise = prazoAnalise.split("/");
              if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])) {
                if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])) {
                  if (parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])) {
                    this.todos[contador].date = newDataI.toLocaleDateString("pt-BR");
                    this.todos[contador].prazo = newPrazo.toLocaleDateString("pt-BR");
                  } else {
                    this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                  }
                } else {
                  this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                }
              } else {
                this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
              }
            } else if (!(this.newTitle.length) && (this.newDataI === "") && !(this.newPrazo === "")){
              console.log("6");
              var prazoAnalise = newPrazo.toLocaleDateString("pt-BR");
              var splitDataAnalise = this.todos[contador].date.split("/");
              var splitPrazoAnalise = prazoAnalise.split("/");
              if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])) {
                if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])) {
                  if (parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])) {
                    this.todos[contador].prazo = newPrazo.toLocaleDateString("pt-BR");
                  } else {
                    this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                  }
                } else {
                  this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                }
              } else {
                this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
              }
            } else if ((this.newTitle) && !(this.newDataI === "") && !(this.newPrazo === "")){
              console.log("7");
              var dataAnalise = newDataI.toLocaleDateString("pt-BR");
              var prazoAnalise = newPrazo.toLocaleDateString("pt-BR");
              var splitDataAnalise = dataAnalise.split("/");
              var splitPrazoAnalise = prazoAnalise.split("/");
              if (parseInt(splitDataAnalise[2]) <= parseInt(splitPrazoAnalise[2])) {
                if (parseInt(splitDataAnalise[1]) <= parseInt(splitPrazoAnalise[1])) {
                  if (parseInt(splitDataAnalise[0]) <= parseInt(splitPrazoAnalise[0])) {
                    this.todos[contador].title = newTitle;
                    this.todos[contador].date = newDataI.toLocaleDateString("pt-BR");
                    this.todos[contador].prazo = newPrazo.toLocaleDateString("pt-BR");
                  } else {
                    this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                  }
                } else {
                  this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
                }
              } else {
                this.alerta("Data prazo menor do que data inicial. EVENTO NÃO EDITADO");
              }
            }
            break;
          }
        }
      }

      if (this.todos[contador].eventoAdd) {
        removeEvento(this.todos[contador]);
        this.todos[contador].eventoAdd = false;
        addEvent(this.todos[contador]);
      }

      this.newTitle = "";
      this.nomeAtual = "";
      this.checked2 = false;
      this.newPrazo = "";
      this.newDataI = "";
      this.checked4 = "";
    },
    //Set false em newTitle e checked2
    mudarVars() {
      this.newTitle = "";
      this.checked2 = false;
      this.newPrazo = "";
      this.newDataI = "";
      this.checked4 = "";
    },
    //Salvar todo clicado
    gravarTarefa(nome, dataI, dataF) {
      this.nomeAtual = nome;
      this.dataIAtual = dataI;
      if (dataF === ""){
        this.dataFAtual = "Não possui prazo";
      } else{
        this.dataFAtual = dataF;
      }
    },
    //Remove tarefa e seu evento
    removeTodo(todo) {
      if (todo.eventoAdd === true) {
        removeEvento(todo);
      }

      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    //Chama o Calendar para logar ou add evento
    callCalendar(todo) {
      startCalendar(todo);
    },
    callDrive(todo) {
      this.todoIdAux = todo.id;
      if (updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())) {
        var oauthToken = gapi.auth2.getAuthInstance().currentUser.Ab.Zi
          .access_token;
        if (
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()) &&
          oauthToken
        ) {
          var picker = new google.picker.PickerBuilder()
            .addView(google.picker.ViewId.DOCS)
            .setOAuthToken(oauthToken)
            .setDeveloperKey(API_KEY)
            .setCallback(this.pickerCallback)
            .build();
          picker.setVisible(true);
        }
      } else {
        handleAuthClick();
      }
    },
    pickerCallback(data) {
      var url = "nothing";
      var nome = "";
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];
        nome = doc[google.picker.Document.NAME];
      }
      for (var i = 0, len = this.todos.length; i < len; ++i) {
        console.log(this.todos[i]);
        if(this.todoIdAux === this.todos[i].id) {
          this.todos[i].driveLink = url;
          this.todos[i].driveNome = nome;
        }
      }
      var message = "You picked: " + url;
      console.log(message);
    },
    alerta: function(mensagem){
      alert(mensagem);
    }
  },

  mounted() {
    if (localStorage.getItem(STORAGE_KEY))
      this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  watch: {
    todos: {
      handler() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
$c-primary: #1dd1a1;

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#login:hover {
  opacity: 0.8;
}

//Datepicker
.vdp-datepicker {
  div {
    input {
      background-color: transparent;
      color: dimgray;
      border: solid white 1px;
      border-radius: 5px;
    }
  }
}

//ToogleButtonCalendar
.able {
  margin-right: 40px;
  cursor: pointer;
  opacity: 1;
}
.disable {
  margin-right: 40px;
  cursor: auto;
  opacity: 0.5;
}

// Global
body {
  font-family: "Raleway", sans-serif;
}

// Github Corner
.github-corner {
  @media (max-width: 768px) {
    display: none;
  }
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}

// Title
h1 {
  span {
    color: $c-primary;
  }
}

// Input
.input-wrapper {
  input {
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: $c-primary;
    }
  }

  .text-guide {
    right: 0;
    bottom: -8px;
    text-transform: uppercase;
  }
}

// Checkbox & Label
.cbx__lbl {
  margin-left: 4px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    width: 0%;
    height: 2px;
    background: $c-primary;
    position: absolute;
    left: 0;
    top: 50%;
    display: block;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &.completed {
    color: #c8ccd4;
    &:after {
      width: 100%;
    }
  }
}

.cbx:checked ~ .cbx__child {
  border-color: transparent;
  background: $c-primary;
  animation: jelly 0.6s ease;
}

.cbx:checked ~ .cbx__child:after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}

@keyframes jelly {
  from {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.25, 0.75);
  }
  40% {
    transform: scale(0.75, 1.25);
  }
  50% {
    transform: scale(1.15, 0.85);
  }
  65% {
    transform: scale(0.95, 1.05);
  }
  75% {
    transform: scale(1.05, 0.95);
  }
  to {
    transform: scale(1, 1);
  }
}

.cbx__child {
  position: relative;
  top: 1px;
  width: 17px;
  height: 17px;
  border: 1px solid #c8ccd4;
  border-radius: 3px;
  vertical-align: middle;
  display: inline-block;
  transition: background 0.1s ease;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 5px;
    width: 5px;
    height: 11px;
    opacity: 0;
    transform: rotate(45deg) scale(0);
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transition: all 0.3s ease;
    transition-delay: 0.15s;
  }
}

// Fade In/Out Animation
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// Todo List
.todo {
  &__item {
    &:hover {
      .delete-button {
        opacity: 1;
        visibility: visible;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}

// Delete Button
.delete-button {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;

  svg {
    transition: all 0.3s ease;
    height: 20px;
  }

  .feather {
    color: #fff;
  }
  &:hover .feather {
    color: #ff6b6b;
  }

  &:focus {
    outline: none;
    border: 1px dashed #ff6b6b;
  }
}
</style>
