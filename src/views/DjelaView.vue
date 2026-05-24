<script setup>
import Djelo from '../components/Djelo.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Autori = ref([]);
const Djela = ref([]);
const AutorDjelo = ref([]);
const VrsteDjela = ref([]);
const Galerije = ref([]);

const showCreate = ref(false);

const createNew = () => {
    showCreate.value = true;
}

const confirmCreate = () => {
    alert('Kreirano');
}

const postavljanje = async () => {
    let autori = await axios.get('http://localhost:5000/api/autori');
    Autori.value = autori.data;

    let autorDjelo = await axios.get('http://localhost:5000/api/autorDjelo');
    AutorDjelo.value = autorDjelo.data;

    let galerije = await axios.get('http://localhost:5000/api/galerije');
    Galerije.value = galerije.data;

    let vrsteDjela = await axios.get('http://localhost:5000/api/vrsteDjela');
    VrsteDjela.value = vrsteDjela.data;

    let djela = await axios.get('http://localhost:5000/api/djela');
    Djela.value = djela.data;
}

onMounted(() => {
    postavljanje();
})
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Djelo v-for="d in Djela" :id="d._id" :naziv="d.naziv" :idGalerije="d.idGalerije" :status="d.status" :idVrsteDjela="d.idVrstaDjela" :vrsteDjela="VrsteDjela" :galerije="Galerije" :autori="Autori" :autorDjelo="AutorDjelo"/>
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