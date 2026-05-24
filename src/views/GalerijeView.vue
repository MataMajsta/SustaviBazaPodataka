<script setup>
import Galerija from '../components/Galerija.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Adrese = ref([]);
const Galerije = ref([]);

const showCreate = ref(false);

const createNew = () => {
    showCreate.value = true;
}

const confirmCreate = () => {
    alert('Kreirano');
}

const testBack = async () => {
    let adrese = await axios.get('http://localhost:5000/api/lokacije');
    Adrese.value = adrese.data;
    Adrese.value[Adrese.value.length] = {_id: "Nova", adresa: "Nova"};
    let galerije = await axios.get('http://localhost:5000/api/galerije');
    Galerije.value = galerije.data;
}

onMounted(() => {
    testBack();
})
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Galerija v-for="g in Galerije" :id="g._id" :naziv="g.naziv" :cijena="g.cijenaUlaza" :info="g.info" :adresaId="g.idLokacije" :adrese="Adrese"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novu galeriju: 
        <input type="text" placeholder="Naziv galerije"/>
        <input type="number" placeholder="Cijena ulaza"/>
        <select>
            <option v-for="ad in Adrese" :value="ad.adresa">{{ ad.adresa }}</option>
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