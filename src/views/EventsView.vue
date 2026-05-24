<script setup>
import Event from '../components/Event.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Adrese = ref([]);
const Galerije = ref([]);
const VrsteEventa = ref([]);
const Events = ref([]);

const showCreate = ref(false);

const createNew = () => {
    showCreate.value = true;
}

const confirmCreate = () => {
    alert('Kreirano');
}

const postavljanje = async () => {
    let adrese = await axios.get('http://localhost:5000/api/lokacije');
    Adrese.value = adrese.data;
    Adrese.value[Adrese.value.length] = {_id: "Nova", adresa: "Nova"};

    let galerije = await axios.get('http://localhost:5000/api/galerije');
    Galerije.value = galerije.data;

    let vrsteEventa = await axios.get('http://localhost:5000/api/vrsteEventa');
    VrsteEventa.value = vrsteEventa.data;

    let events = await axios.get('http://localhost:5000/api/events');
    Events.value = events.data;
}

onMounted(() => {
    postavljanje();
})
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Event v-for="ev in Events" :id="ev._id" :naziv="ev.naziv" :cijena="ev.cijenaUlaza" :info="ev.info" :adresaId="ev.idNoveLokacije" :adrese="Adrese" :galerijaId="ev.idGalerije" :galerije="Galerije" :idVrsteEventa="ev.idVrsteEventa" :eventovi="VrsteEventa"/>
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
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 10px;
    text-shadow: 2px 5px 2px rgba(92, 22, 113, 0.5);
}
#createNew {
    width: 30%;
}
#creation {
    font-size: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px; 
    font-weight: bold;
    border: 2px solid white;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
}
input {
    font-size: 25px;
}
</style>