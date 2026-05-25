<script setup>
import Djelo from '../components/Djelo.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const galerije = ["Galerija1", "Galerija2"];
const autori = ["Autor1", "Autor2"];

const showCreate = ref(false);

const createNew = () => {
    showCreate.value = true;
}

const confirmCreate = () => {
    alert('Kreirano');
}
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Djelo id="5" naziv="Slika1" galerija="Galerija1" info="Nesto" vrsta="Slika"/>
        <Djelo id="6" naziv="Slika2" galerija="Galerija2" info="Nista" vrsta="Slika"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novo djelo: 
        <input type="text" placeholder="Naziv djela"/>
        <select>
            <option v-for="gal in galerije" :value="gal">{{ gal }}</option>
        </select>
        <select>
            <option v-for="au in autori" :value="au">{{ au }}</option>
        </select>
        <input type="text" placeholder="Dodatne informacije"/>
        <button @click="confirmCreate">Create</button>
    </div>
</template>

<style scoped>
#podaci {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
#creation {
    font-size: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px; 
    font-weight: bold;
}
input {
    font-size: 25px;
}
</style>