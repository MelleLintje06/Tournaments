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
      KnockOutAPIData() {  
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
      UsersAPIData() {  
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
      },
      FilterData() {
        let option = document.querySelector('.select-order').selectedOptions[0].value.toLowerCase();
        let knockouts = this.knockouts
        document.querySelector('#remove-filter').style.display = 'block';
        // Option Date | Done
        if (option === 'date') {
          knockouts.sort((a, b) => {
            // Sort based on date created
            let c = new Date(a.date)
            let d = new Date(b.date)
            return c - d;
          });
        }
        // Option Amount
        else if (option === 'amount') {}
        // Option Selections
        else if (option === 'selections') {}
        // Options Active | Done
        else if (option === 'creator') {
          knockouts.sort((a, b) => {
            // Sort based on ID
            return a.creator_id - b.creator_id || a.id - b.id;
          });
        }
        // Options Viewed
        else if (option === 'viewed') {}
        // Options ID | Done
        else {
          knockouts.sort((a, b) => {
            // Sort based on ID
            return a.id - b.id;
          });
          document.querySelector('#remove-filter').style.display = 'none';
        }
      },
      ClearFilter() {
        document.querySelector('#remove-filter').style.display = 'none';
        document.querySelector('.select-filter').selected = true;
        this.FilterData();
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
  <div class="filter">
    <button id="remove-filter" @click="ClearFilter()">Clear filter</button>
    <span>Filter: </span>
    <select class="select-order" @change="FilterData()">
      <option class="select-filter" disabled selected>Select Filter</option>
      <option>Date</option>
      <option>Amount</option>
      <option>Selections</option>
      <option>Creator</option>
      <option>Viewed</option>
    </select>
  </div>
  
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
  .filter {
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
  }
  .filter button {
    background-color: #6912B3;
    border-radius: 5px;
    box-shadow: 0px 0px 2px white;
    margin-right: 5px;
    display: none;
  }
  .select-order {
    width: 200px;
    color: black;
    border-radius: 25px;
  }
  .select-order option {
    background-color: black;
  }
</style>