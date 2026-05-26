<script setup>
import Djelo from '../components/Djelo.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const random = Math.floor(Math.random() * 3) + 1;
const newDjelo = ref({
    naziv: '',
    galerijaid: null,
    vrstaid: null,
    info: '',
    autorid: null
});
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
    let autori = await axios.get('http://localhost:3000/autori');
    Autori.value = autori.data;

    let autorDjelo = await axios.get('http://localhost:3000/autor_djela');
    AutorDjelo.value = autorDjelo.data;

    let galerije = await axios.get('http://localhost:3000/galerije');
    Galerije.value = galerije.data;

    let vrsteDjela = await axios.get('http://localhost:3000/vrste/djela');
    VrsteDjela.value = vrsteDjela.data;

    let djela = await axios.get('http://localhost:3000/djela');
    Djela.value = djela.data;
}
async function createDjelo() {  
    console.log('Creating djelo with data:', newDjelo.value); 
        try {
            const response = await axios.post('http://localhost:3000/djela', {
                naziv: newDjelo.value.naziv,
                info: newDjelo.value.info,
                galerija: newDjelo.value.galerijaid,
                vrsta: newDjelo.value.vrstaid
            });
            console.log(newDjelo.value);
            console.log('Djelo created successfully:', response.data);
           console.log(response.data.iddjela);
            const autorDjeloResponse = await axios.post('http://localhost:3000/autor_djela', {
                djelo: response.data.iddjela,
                autor: random
            });
            console.log('Autor-Djelo relationship created successfully:', autorDjeloResponse.data);
        } catch (error) {
            console.error('Error creating djelo:', error);
        }
    }
onMounted(() => {
    postavljanje();
})
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Djelo v-for="d in Djela" :id="d.iddjela" :naziv="d.naziv" :idGalerije="d.galerija" :status="d.info" :idVrsteDjela="d.vrsta" :vrsteDjela="VrsteDjela" :galerije="Galerije" :autori="Autori" :autorDjelo="AutorDjelo"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novo djelo: 
        <input type="text" v-model="newDjelo.naziv" placeholder="Naziv djela"/>
        <select v-model="newDjelo.galerijaid">
            <option v-for="gal in Galerije" :value="gal.idgalerija" :key="gal.idgalerija">{{ gal.naziv }}</option>
        </select>
        <select v-model="newDjelo.vrstaid">
            <option v-for="vrsta in VrsteDjela" :value="vrsta.idvrsta_djela" :key="vrsta.idvrsta_djela">{{ vrsta.tip }}</option>
        </select>
        <input type="text" v-model="newDjelo.info" placeholder="Dodatne informacije"/>
        <button @click="createDjelo()">Create</button>
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