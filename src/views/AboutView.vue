<template>
  <div class="flex">
    <div>
      <h1>InspireWeb</h1>
      <p>This project has been created by <a href="https://inspireweb.nl" target="_blank">InspireWeb</a>. </p>
    </div>
    <div>
      <img src="../assets/media/undraw_team_up_re_84ok.svg">
    </div>
  </div>
</template>
<style>
.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 79vh;
}
.flex div {
  text-align: left;
  width: 50%;
}
.flex div:first-child h1 {
  margin-top: -10px;
}
.flex div:last-child {
  display: flex;
  justify-content: center;
}
.flex div:first-child p a {
  text-decoration: none;
  color: lightblue;
}
.flex div img {
  width: 50%;
}
</style>