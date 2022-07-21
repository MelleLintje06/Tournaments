<script>
export default {
  data() {
    return {
      currentID: this.$route.params.id,
      API: `https://api.learn4coding.nl/api/knockouts/${ this.$route.params.id }`,
      Players: "",
      Rounds: "",
      Orders: "",
      WLRatio: "",
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
      },
      ShowModal(id, name, round, ordernr) {
        if (name !== "...") {
          let players = [];
          this.Players.forEach(player => {
            if (player.round == round && player.order == ordernr) {
              players.push(player)
            }
          })
          if (id == players[0].id) {
            this.WLRatio = (players[0].score) / (players[1].score + players[0].score) * 100 + "% won"
          }
          else {
            this.WLRatio = (players[1].score) / (players[1].score + players[0].score) * 100 + "% won"
          }
          document.querySelector(`.modal-${id}`).style.display = "block";
        }
      },
      Close(id) {
        document.querySelector(`.modal-${id}`).style.display = "none";
      },
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
            <ul class="player" :class="player.username == null ? 'empty' : ''">
              <div class="player-info">
                <!-- Give class if player has lost or won -->
                <li :class="player.winner == null ? '' : player.winner ? '' : 'noselect'">
                  <!-- Username with link or not -->
                  <a class="username-link" @click="ShowModal(player.id, player.username, player.round, player.order)" v-if="player.username !== null && player.winner == 1"><div class="username">{{ player.username }}</div></a>
                  <a v-else><div class="username">{{ player.username }}</div></a>
                  <!-- Score of the player -->
                  <div class="noselect">{{ player.score }}</div>
                </li>
              </div>
            </ul>
            <div class="lines linediv noselect" v-if="player.round !== 4" :class="player.username == null ? 'empty-line' : ''">
              <span class="line">Lorum</span>
            </div>
            <div class="lines line-2 noselect" v-if="player.round !== 4" :class="player.username == null ? 'empty-line-2' : ''">
              <span class="line">Lorum</span>
            </div>
          </div>
          <div v-if="player.username !== '...'">
            <div v-if="player.round == round.round" class="modal" :class="`modal-${player.id}`">
              <div class="modal-content">
                <span @click="Close(player.id)" class="close noselect">&times;</span>
                <h4>{{ player.username }}</h4>
                <div class="flex-userinfo">
                  <div class="div">
                    <img src="../assets/media/undraw_movie_night_re_9umk.svg">
                  </div>
                  <div class="div">
                    <div class="grid-userinfo">
                      <div>Gender</div>
                      <div>Age</div>
                      <div>
                        W/L ratio
                        <br/>
                        <span v-text="WLRatio"></span>
                      </div>
                      <div>...</div>
                    </div>
                  </div>
                </div>
              </div>
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
  cursor: pointer;
}
.player li div:last-child {
  color: white;
}
.username {
  width: 150px;
}
.username-link {
  text-decoration: none;
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
.loser .linediv, 
.empty-line,
.empty-line-2 {
  opacity: .2;
  position: relative;
  z-index: 99;
}
.empty-line-2 {
  margin-right: 0px;
  z-index: 100;
  opacity: 1;
  border-color: #3D3945 !important;
}
.loser .player,
.empty {
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
  margin: 26px 0px;
}
.ko-container .round-2 div:nth-child(even) .playergrid .linediv {
  height: 40px !important;
  margin-top: 40px !important;
}
.ko-container .round-2 div:nth-child(odd) .playergrid .linediv {
  margin-top: -30px;
  height: 40px !important;
  margin-bottom: 10px !important;
}
.ko-container .round-2 div:nth-child(even) .playergrid .line-2 {
  border-bottom: 3px solid white;
  margin-top: 50px;
  margin-bottom: -15px;
  margin-left: -3px;
}
.round-3 div:nth-child(even) .playergrid {
  margin: -15px 0px;
}
.round-3 div:nth-child(odd) .playergrid {
  margin: 65px 0px;
}
.ko-container .round-3 div:nth-child(even) .playergrid .linediv {
  margin-top: 100px;
  height: 100px;
}
.ko-container .round-3 div:nth-child(odd) .playergrid .linediv {
  height: 100px;
  margin-top: -100px;
}
.ko-container .round-3 div:nth-child(even) .playergrid .line-2 {
  margin-top: 150px;
}
.round-4 .playergrid {
  margin: 175px 0px;
}
.modal {
  display: none;
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  /* opacity: 0.4; */
}
.modal-content {
  background-color: #0c0817;
  margin: 11% auto;
  padding: 20px;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px white;
  width: 80%;
  height: 49%;
}
.close {
  margin-top: -10px;
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: whitesmoke;
  text-decoration: none;
  cursor: pointer;
}
.modal-content h4 {
  font-size: 26px;
  letter-spacing: 1px;
  text-align: center;
  width: 100%;
  margin-top: 10px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #6912B3;
}
.flex-userinfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-inline: auto;
  height: 40vh;
}
.flex-userinfo img {
  width: 100%;
  height: auto;
}
.flex-userinfo .div:first-child {
  width: 50%;
}
.flex-userinfo .div:last-child {
  width: 50%;
  height: auto;
  overflow-y: auto;
  margin-inline: auto;
}
.grid-userinfo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
