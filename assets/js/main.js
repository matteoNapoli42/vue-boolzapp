/*
Descrizione:
Iniziamo a lavorare alla nostra replica della nota app di messaggistica. L'esercitazione sará divisa in piú giornate, oggi iniziamo a lavorare alla prima milestone che vi
riporto di seguito:

MILESTONE 1
●Replica della grafica con la possibilità di avere messaggi scritti dall'utente (verdi) e dall'interlocutore (bianco) assegnando due classi CSS diverse
●Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

MILESTONE 2
● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
messaggi relativi al contatto attivo all’interno del pannello della conversazione
● Click sul contatto mostra la conversazione del contatto cliccato

MILESTONE 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.

MILESTONE 4
● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
“mar” rimangono solo Marco e Martina)

MILESTONE 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato
● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

 */

const {
    createApp
  } = Vue
  createApp({
    data() {
      return {
        inputMessage : "",
        me: {
          avatar: '_io',
          name: 'Sofia'
        },
        activeContact: 0,
        contacts: [
          {
            id: 1,
            name: 'Michele',
            avatar: '_1',
            visible: true,
            messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
            ],
          },
          {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            messages: [{
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
            ],
          },
          {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            messages: [{
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            }
            ],
          },
          {
            name: 'Alessandro B.',
            avatar: '_4',
            visible: true,
            messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
            ],
          },
          {
            name: 'Alessandro L.',
            avatar: '_5',
            visible: true,
            messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
            ],
          },
          {
            name: 'Claudia',
            avatar: '_6',
            visible: true,
            messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
            ],
          },
          {
            name: 'Federico',
            avatar: '_7',
            visible: true,
            messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
            ],
          },
          {
            name: 'Davide',
            avatar: '_8',
            visible: true,
            messages: [{
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
            ],
          }
        ],
        searchDom :  document.getElementsByClassName("searcharea"),
      }
    },

    methods : 
    {
      /* OLD SELECTCONTACT VERSION
      selectContact: function(elem,index){
            console.log(this.contacts[index]);
            const domPortion = document.getElementsByClassName("messages")[0];
            domPortion.innerHTML = "";
            this.activeContact=index;
            return this.printMessages(index);
        },
        */

        //Funzione per aggiornare il layout con i dati riguardanti il contatto selezionato
        selectContact : function(index)
        {
          this.activeContact=index; //aggiorno la variabile globale riguardante il contatto attivo
          console.log(this.contacts[index]);
        },

        /*OLD PRINTMESSAGES VERSION
        printMessages: function(index,elem){
            const domPortion = document.getElementsByClassName("messages")[0];
            console.log(this.contacts[index].messages.length);
            for(let i=0; i<this.contacts[index].messages.length;i++)
            {
                    if(this.contacts[index].messages[i].status == 'received')
                    {
                        console.log(this.contacts[index].messages[i]);
                        domPortion.innerHTML += 
                        `<div class="received">
                            ${this.contacts[index].messages[i].message}
                        </div>`;
                        console.log("ahio");
                    }
                    else
                    {
                        console.log(this.contacts[index].messages[i]);
                        domPortion.innerHTML += 
                        `<div class="sent">
                            ${this.contacts[index].messages[i].message}
                        </div>`;
                        console.log("ahio2");
                    }
            }
        },*/
        
        printMessages(elem,domPortion)
        {
          console.log(elem);
          if(elem.status == 'received')
          {
            domPortion.innerHTML += 
            `<div class="received">
            ${elem.message}
            </div>`;
            console.log("ricevuto");
          }
          else
          {
            domPortion.innerHTML += 
            `<div class="sent">
            ${elem.message}
            </div>`;
            console.log("mandato");
          }
        },

        newMessage(userInput){        
          console.log(userInput);
          if(userInput==="")//se il messaggio dell utente è vuoto allora non fa nulla
            return
          const messageDom = document.getElementsByClassName("messages")[0];
          const newMessage = 
          {
            date : new Date().getTime(),
            message: userInput,
            status: 'sent'
          }
         console.log(newMessage.status);
         this.printMessages(newMessage,messageDom);
         this.inputMessage = "";
         setTimeout(() => {
          this.printMessages({ message: "ok", status: "received" }, messageDom);
        }, 1000);
        },

        filterContacts (userInput){
          console.log(userInput + " ::usciti dalla formattazione");
          for(let i=0; i<this.contacts.length;i++)
          {
            if(!this.contacts[i].name.includes(userInput))
              this.contacts[i].visible= false;
            else
              this.contacts[i].visible= true;
          }
          if(userInput=="")
            for(let i=0; i<this.contacts.length;i++)
              this.contacts[i].visible= true;
          },
        
          formatUserContactSearch(userInput) {
            console.log("Partita");
            let formattedInput;
            if (userInput === "") 
                return "";
            else {
                formattedInput = userInput.toLowerCase();
                formattedInput = formattedInput.charAt(0).toUpperCase() + formattedInput.slice(1);
                console.log(formattedInput);
                return formattedInput;
            }
        },
    }
  }).mount('#app')