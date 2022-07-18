<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Icon } from '@iconify/vue';
</script>
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/knockouts">Knock-Outs</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <div class="icons">
          <a href="https://discord.gg/ABCDEF" target="_blank"><Icon icon="line-md:discord-twotone" /></a>
          <a href="mailto:info@inspireweb.nl"><Icon icon="line-md:email" /></a>
          <a href="https://github.com/MelleLintje06" target="_blank"><Icon icon="line-md:github" /></a>
        </div>
      </nav>
    </div>
  </header>
  <div class="main">
    <div class="RGB">
      <div class="content-wrapper">
        <div class="content-wrap">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
<style>

@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
* {
  font-family: 'Righteous', cursive;
  color: white;
}
body {
  background: #0c0817;
  margin: 0;
  height: 100vh;
  width: 100%;
  padding: 0;
}
#app {
  width: 100%;
}
header {
  width: 90%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0px 0px 10px 10px;
    margin-top: 0px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    color: transparent;
    border: 1px solid white;
    border-top: none;
    box-shadow: 0px 0px 5px white;
    margin-bottom: 20px;
}
.wrapper nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrapper a {
  text-decoration: none;
  margin: 20px;
  font-size: 20px;
  letter-spacing: 1px;
}
.icons a {
  margin: 0px 10px;
  font-size: 25px;
}
.icons a .iconify {
  padding: 5px;
  border-radius: 5px;
  transition: all .3s ease;
  background-color: transparent;
}
.icons a .iconify path {
  transition: all .3s ease;
}
.icons a:hover .iconify path,
.icons a:hover .iconify {
  color: white;
  background-color: #6912B3;
}
.main {
    width: 100%;
    display: flex;
    justify-content: center;
}
.RGB {
    width: 190vh;
    height: 80vh;
    overflow: hidden;
    position: absolute;
    transform: translate(-50% -50%);
}
.RGB::before {
    content: "";
    position: absolute;
    /* border-radius: 5px; */
    width: 1000%;
    height:1000%;
    background: conic-gradient(
        #fd004c,
        #fe9000,
        #fff020,
        #3edf4b,
        #3363ff,
        #b102b7,
        #fd004c
    );
    left: -450%;
    top: -450%;
    animation: spin 2s infinite linear;
    z-index: -1;
}
@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
.RGB::after {
    content: "";
    
}
.content-wrapper {
    background-color: #0c0817;
    height: 79vh;
    width: 189vh;
    margin: .5vh;
}

.content-wrap {
    display: grid;
    text-align: center;
    /* justify-content: center; */
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

</style>