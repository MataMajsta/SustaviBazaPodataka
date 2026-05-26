<script setup>
import Event from '../components/Event.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Adrese = ref([]);
const Galerije = ref([]);
const VrsteEventa = ref([]);
const Events = ref([]);
const newEvent = ref({
    naziv: '',
    cijena: 0,
    info: '',
    lokacijaid: null,
    galerijaid: null,
    vrstaid: null,
});
const showCreate = ref(false);

const createNew = () => {
    showCreate.value = true;
}

const confirmCreate = () => {
    alert('Kreirano');
}
async function createEvent() {   
    console.log('Creating event with data:', newEvent.value);
        try {
            const response = await axios.post('http://localhost:3000/eventi', {
                naziv: newEvent.value.naziv,
                nova_lokacija: newEvent.value.lokacijaid,
                cijena_ulaza: newEvent.value.cijena,
                info: newEvent.value.info,
                galerija: newEvent.value.galerijaid,
                vrsta: newEvent.value.vrstaid,
            });
            console.log('Event created successfully:', response.data);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    }
const postavljanje = async () => {
    let adrese = await axios.get('http://localhost:3000/lokacije');
    Adrese.value = adrese.data;
    Adrese.value[Adrese.value.length] = {idlokacija: "Nova", adresa: "Nova"};

    let galerije = await axios.get('http://localhost:3000/galerije');
    Galerije.value = galerije.data;

    let vrsteEventa = await axios.get('http://localhost:3000/vrste/eventi');
    VrsteEventa.value = vrsteEventa.data;

    let events = await axios.get('http://localhost:3000/eventi');
    Events.value = events.data;
}

onMounted(() => {
    postavljanje();
})
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Event v-for="ev in Events" :id="ev.idevent" :naziv="ev.naziv" :cijena="ev.cijena_ulaza" :info="ev.info" :adresaId="ev.nova_lokacija" :adrese="Adrese" :galerijaId="ev.galerija" :galerije="Galerije" :idVrsteEventa="ev.vrsta" :eventovi="VrsteEventa"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novi event: 
        <input type="text" v-model="newEvent.naziv" placeholder="Naziv eventa"/>
        <input type="number" v-model="newEvent.cijena" placeholder="Cijena ulaza"/>
        <select v-model="newEvent.lokacijaid">
            <option v-for="ad in Adrese" :value="ad.idlokacija" :key="ad.idlokacija">{{ ad.adresa }}</option>
        </select>
        <select v-model="newEvent.galerijaid">
            <option v-for="gal in Galerije" :value="gal.idgalerija" :key="gal.idgalerija">{{ gal.naziv }}</option>
        </select>
        <select v-model="newEvent.vrstaid">
            <option v-for="vrs in VrsteEventa" :value="vrs.idvrsta_eventa" :key="vrs.idvrsta_eventa">{{ vrs.tip }}</option>
        </select>
        <input type="text" v-model="newEvent.info" placeholder="Dodatne informacije"/>
        <button @click="createEvent()">Create</button>
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