<script setup>
import Redak from '../components/Redak.vue';
import { ref } from 'vue';

const adrese = ["adresa1", "adresa2"];

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
        <Redak id="5" naziv="galerija1" cijena="15" info="Nesto"/>
        <Redak id="6" naziv="galerija2" cijena="25" info="Nista"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novu galeriju: 
        <input type="text" placeholder="Naziv galerije"/>
        <input type="number" placeholder="Cijena ulaza"/>
        <select>
            <option v-for="ad in adrese" :value="ad">{{ ad }}</option>
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