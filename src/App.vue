<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>

<template>
  <div id="header1">
  <RouterLink to="/"><button>Events </button></RouterLink>
  <RouterLink to="/galerije"><button>Galerije</button></RouterLink>
  <RouterLink to="/djela"><button>Djela</button></RouterLink>
  </div>
  <RouterView />
</template>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
body {
  font-size: 50px;
  background: linear-gradient(to bottom, #101533, #1b2a5e);
  margin: 2%;
  color: white;
  font-family: poppins;
}
button {
  font-size: 20px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
button:hover {
  background-color: white;
  color: #101533;
}
select {
  font-size: 20px;
}
#header1 {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;
}
option {
  background: none;
  color: grey;
}
select {
  background: none;
  color: grey;
}
</style>