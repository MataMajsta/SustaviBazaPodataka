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