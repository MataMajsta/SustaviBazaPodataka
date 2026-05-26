<script setup>
import Galerija from '../components/Galerija.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Adrese = ref([]);
const Galerije = ref([]);
const newGalerija = ref({
    naziv: '',
    cijena_ulaza: 0,
    info: '',
    lokacijaid: 0
});

const showCreate = ref(false);

const createNew = () => {
    showCreate.value = true;
}

const confirmCreate = () => {
    alert('Kreirano');
}
async function createGalerija() {   
        try {
            const response = await axios.post('http://localhost:3000/galerije', {
                naziv: newGalerija.value.naziv,
                cijena_ulaza: newGalerija.value.cijena_ulaza,
                info: newGalerija.value.info,
                idlokacije: newGalerija.value.lokacijaid
            });
            console.log(newGalerija.value);
            console.log('Galerija created successfully:', response.data);
        } catch (error) {
            console.error('Error creating galerija:', error);
        }
    }
const testBack = async () => {
    let adrese = await axios.get('http://localhost:3000/lokacije');
    Adrese.value = adrese.data;
    Adrese.value[Adrese.value.length] = {idlokacija: "Nova", adresa: "Nova"};
    let galerije = await axios.get('http://localhost:3000/galerije');
    Galerije.value = galerije.data;
}

onMounted(() => {
    testBack();
})
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Galerija v-for="g in Galerije" :id="g.idgalerija" :naziv="g.naziv" :cijena="g.cijena_ulaza" :info="g.info" :adresaId="g.idlokacije" :adrese="Adrese"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novu galeriju: 
        <input type="text" v-model="newGalerija.naziv" placeholder="Naziv galerije"/>
        <input type="number" v-model="newGalerija.cijena_ulaza" placeholder="Cijena ulaza"/>
        <select v-model="newGalerija.lokacijaid">
            <option v-for="ad in Adrese" :value="ad.idlokacija" :key="ad.idlokacija">{{ ad.adresa }}</option>
        </select>
        <input type="text" v-model="newGalerija.info" placeholder="Dodatne informacije"/>
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