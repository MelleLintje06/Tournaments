<script>
export default {
  data() {
    return {
      currentID: this.$route.params.id,
      API: `https://api.learn4coding.nl/api/knockouts/${ this.$route.params.id }`,
      Players: "",
      Rounds: "",
      Orders: "",
    }
  },
  methods: {
      GetAllPlayers() {  
        fetch(this.API, {
            "method": "GET",
        })
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(response => {
            this.Players = response;
        })
        .catch(err => {
            console.log(err);
        });
      },
      GetRounds() {  
        fetch(`${this.API}?rounds=true`, {
            "method": "GET",
        })
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(response => {
            this.Rounds = response;
        })
        .catch(err => {
            console.log(err);
        });
      },
      GetOrders() {  
        fetch(`${this.API}?orders=true`, {
            "method": "GET",
        })
        .then(response => { 
            if(response.ok){
                return response.json()    
            } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(response => {
            this.Orders = response;
        })
        .catch(err => {
            console.log(err);
        });
      }
    },
    beforeMount(){
      this.GetAllPlayers();
      this.GetRounds();
      this.GetOrders();
    }
}
</script>
<template>
  <div>
    <h1>Knock Out | O=('-'Q)</h1>
    <!-- Container -->
    <div class="ko-container">
      <!-- Get Rounds in order -->
      <section v-for="round in Rounds" class="round" :class="`round-${round.round}`">
        <!-- Round Title -->
        <h4>
          Round {{ round.round }}
          <br>
          <span class="description">Lorum Ipsum</span>
        </h4>
        <div v-for="player in Players">
          <div v-if="player.round === round.round" class="playergrid" :class="player.winner == null ? 'unknown' : player.winner ? 'winner' : 'loser'">
            <ul class="player">
              <div class="player-info">
                <li :class="player.winner == null ? '' : player.winner ? '' : 'noselect'">
                  <div class="username">{{ player.Username }}</div>
                  <div class="noselect">{{ player.score }}</div>
                </li>
              </div>
            </ul>
            <div class="lines linediv noselect">
              <span class="line">Lorum</span>
            </div>
            <div class="lines line-2 noselect">
              <span class="line">Lorum</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div> 
</template>
<style>
.ko-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.ko-container h4 {
  width: 200px;
}
.description {
  font-size: 13px;
  color: lightblue;
}
.playergrid {
  display: flex;
  align-items: center;
}
.player {
  list-style-type: none;
  text-align: left;
  padding: 0px;
  border-radius: 5px;
  margin-left: auto;
  margin-top: 0px;
  margin-bottom: 0px;
}
.player li {
  min-width: 175px;
  display: flex;
  justify-content: space-between;
  color: black;
  border-radius: 2px;
  border: 1px solid white;
  box-shadow: 0px 0px 2px white;
  padding: 5px 10px;
  background-image: linear-gradient(to right, #6912B3 40%, indigo);
}
.player li div:last-child {
  color: white;
}
.username {
  width: 150px;
}
.linediv {
  width: 50%;
  margin-right: auto;
  border-right: 3px solid white;
}
.ko-container div:nth-child(even) .playergrid .line-2 {
  border-bottom: 3px solid white;
  margin-top: 25px;
  margin-bottom: 3px;
  margin-left: -3px;
}
.ko-container div:nth-child(even) .playergrid .linediv {
  margin-top: 20px;
  border-radius: 0px 5px 0px 0px;
  border-top: 3px solid white;
}
.ko-container div:nth-child(odd) .playergrid .linediv {
  margin-top: -20px;
  margin-right: -3px;
  border-radius: 0px 0px 5px 0px;
  border-bottom: 3px solid white;
}
.line {
  opacity: 0;
}
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.loser .linediv {
  opacity: .2;
  position: relative;
  z-index: 99;
}
.loser .player {
  opacity: .7;
  filter: grayscale(.95);
}
.winner .linediv,
.winner .line-2 {
  border-color: white !important;
  position: relative;
  z-index: 100;
}
.round-2 .playergrid {
  margin: 41.5px 0px;
}
</style>
