<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>

<template>
  <RouterLink to="/">Events </RouterLink>
  <RouterLink to="/galerije">Galerije </RouterLink>
  <RouterLink to="/djela">Djela </RouterLink>
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
</style>