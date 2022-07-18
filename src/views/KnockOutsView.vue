<script>
  export default {
    data() {
      return {
        KnockOutAPI: "https://api.learn4coding.nl/api/knockouts",
        PersonsAPI: "https://api.learn4coding.nl/api/users",
        knockouts: "",
        persons: "",
      }
    },
    methods: {
      async KnockOutAPIData() {  
        fetch(this.KnockOutAPI, {
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
            this.knockouts = response;
        })
        .catch(err => {
            console.log(err);
        });
      },
      async UsersAPIData() {  
        fetch(this.PersonsAPI, {
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
            this.persons = response;
        })
        .catch(err => {
            console.log(err);
        });
      }
    },
    beforeMount(){
      this.KnockOutAPIData();
      this.UsersAPIData();
    }
  }
</script>
<template>
  <h1>All Knock-Outs</h1>
  <div class="grid">
    <a v-for="item in knockouts" class="griditem" :href="'/knockout/' + item.id">
      <div class="gridimage">
        <img src="../assets/media/undraw_movie_night_re_9umk.svg">
      </div>
      <div>
        <p v-for="person in persons">
          <span v-if="person.id == item.creator_id">{{ person.username }}</span>
          <br>
          <span>{{ item.description }}</span>
        </p>
      </div>
    </a>
  </div>
</template>
<style>
  .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      overflow-y: scroll;
      height: 65vh;
      padding: 2px;
  }
  @media only screen and (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  ::-webkit-scrollbar {
    width: 20px;
    margin-left: 20px;
  } 
    /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px lightgray; 
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #6912B3; 
    border-radius: 10px;
    transition: background-color 0.5s ease;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: indigo; 
  }
  ::-webkit-resizer,
  ::-webkit-scrollbar-button,
  ::-webkit-scrollbar-corner { display: none; }
  .griditem {
      background-color: #0c0817;
      box-shadow: 0px 0px 5px white;
      border-radius: 5px;
      text-decoration: none;
      color: white; 
      margin-bottom: 6px;
      margin: 6px;
      height: 35vh;
  }
  .gridimage {
    background: rgba(100, 157, 255, 0.1);
    padding: 20px;
  }
  .gridimage img {
    width: 100%;
    border-radius: 5px;
  }
</style>