Vue.use(Buefy.default);

var timerPuzzle;
var whole;
var watchTimer = true;

var app = new Vue({
    el: '#app',
    data: {
      activeTab: 0,
      tickets : [],
      activeModal : true,
      timeTracker : 0
    },
    methods: {
      addTicket : function(){
        this.tickets.push({number:null,amount:null});
      },
      removeTicket : function(key){
        this.tickets.splice(key, 1);
      }
    },
    computed: {
      total: function(){
        return this.tickets.reduce(function(prev, ticket){
          return (prev*1) + (ticket.amount*1);
        },0);
      }
    },
    watch: {
      activeTab : function(newVal){
        whole = this;
        if(newVal == 3){
          this.$dialog.alert({
            title: 'Arma el rompecabezas',
            message: 'Arrastra la piezas de la derecha hacia la izquierda para armar el auto. Mientras más rápido armes el auto más oportunidades tendrás de ganar.<br><br>¡Buena suerte!',
            confirmText: '¡Iniciar rompecabezas!',
            type: 'is-info',
            onConfirm: () => {
              this.$toast.open('¡Comienza!');
              timerPuzzle = window.setInterval(() => { if(watchTimer){ this.timeTracker=this.timeTracker+1; } },1000);
              //Puzzle start
              $('img.puzzle').snapPuzzle({
                rows: 4,
                columns: 3 ,
                pile: '#puzzle-pile',
                containment: '.puzzle-container',
                onComplete: function(){
                    watchTimer = false;
                    clearInterval(timerPuzzle);
                    whole.$dialog.alert({
                      title: 'Rompecabezas completado',
                      message: 'Terminanste el rompecabezas en '+whole.timeTracker+ ' segundos <br>¡Felicidades!',
                      confirmText: 'Gracias por participar',
                      onConfirm: () => {
                        location.reload();
                      }
                    });
                }

              });
            }
          })
        }
      },
      timeTracker : function(newVal){
        if(watchTimer){
          this.$toast.open({
            message: newVal +' segundos',
            duration: 800,
            type: 'is-info'
          });
        }
      }
    }

})
