<script setup>
import Galerija from '../components/Galerija.vue';
import { ref,onMounted } from 'vue';
import axios from 'axios';
const adrese = ref([]);
const newGalerija = ref({
    naziv: '',
    cijena_ulaza: 0,
    info: ''
});
const galerije = ref([]);
const lokacija = ref([]);
onMounted(() => {
    console.log('Component mounted, fetching adrese...');
    axios.get('http://localhost:3000/lokacije')
        .then(response => {
            adrese.value = response.data;
            console.log('Adrese fetched successfully:', adrese.value);
        })
        .catch(error => {
            console.error('Error fetching adrese:', error);
        });
    axios.get('http://localhost:3000/galerije')
        .then(response => {
            galerije.value = response.data;
            console.log('Galerije fetched successfully:', galerije.value);
        })
        .catch(error => {
            console.error('Error fetching galerije:', error);
        });
});
const showCreate = ref(false);

const createNew = () => {
    
    showCreate.value = true;
}

const confirmCreate = () => {
alert("Kreirano!");
}
async function createGalerija() {   
        try {
            const response = await axios.post('http://localhost:3000/galerije', {
                idgalerija: 70,
                naziv: newGalerija.value.naziv,
                cijena_ulaza: newGalerija.value.cijena_ulaza,
                info: newGalerija.value.info,
                lokacija_id: lokacija.value
            });
            console.log(newGalerija.value);
            console.log('Galerija created successfully:', response.data);
        } catch (error) {
            console.error('Error creating galerija:', error);
        }
    }
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Galerija v-for="galeri in galerije" :key="galeri.idgalerija" :id="String(galeri.idgalerija)" :naziv="galeri.naziv" :cijena="galeri.cijena_ulaza" :info="galeri.info" :adresa="adrese.find(adresa => adresa.idlokacija === galeri.lokacijaid)?.mjesto"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novu galeriju: 
        <input v-model="newGalerija.naziv" type="text" placeholder="Naziv galerije"/>
        <input v-model="newGalerija.cijena_ulaza" type="number" placeholder="Cijena ulaza"/>
        <select v-model="lokacija">
            <option disabled value="">Please select one</option>
            <option v-for="ad in adrese" :value="ad.idlokacija" :key="ad.idlokacija">{{ ad.mjesto }}</option>
        </select>
        <input v-model="newGalerija.info" type="text" placeholder="Dodatne informacije"/>
        <button @click="createGalerija()">Create</button>
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