<script setup>
import Event from '../components/Event.vue';
import { ref } from 'vue';

const adrese = ["adresa1", "adresa2"];
const galerije = ["Galerija1", "Galerija2"];
const vrste = ["Izlozba", "Konferencija"];

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
        <Event id="5" naziv="Event1" cijena="15" info="Nesto" novaLokacija="ima" galerija="Galerija1" vrstaEventa="izlozba"/>
        <Event id="6" naziv="Event1" cijena="15" info="Nista" galerija="Galerija2" vrstaEventa="izlozba"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novi event: 
        <input type="text" placeholder="Naziv eventa"/>
        <input type="number" placeholder="Cijena ulaza"/>
        <input type="number" placeholder="Cijena ulaza"/>
        <select>
            <option v-for="ad in adrese" :value="ad">{{ ad }}</option>
        </select>
        <select>
            <option v-for="gal in galerije" :value="gal">{{ gal }}</option>
        </select>
        <select>
            <option v-for="vrsta in vrste" :value="vrsta">{{ vrsta }}</option>
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