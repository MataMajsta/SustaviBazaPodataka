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
body {
  font-size: 50px;
  background-color: #191919;
  color: white;
}
button {
  font-size: 20px;
}
select {
  font-size: 20px;
}
#header1 {
  display: flex;
  flex-direction: row;
  gap: 20px
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