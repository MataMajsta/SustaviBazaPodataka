<script setup>
import Event from '../components/Event.vue';
import { ref ,onMounted} from 'vue';
import axios from 'axios';

const adrese = ref([]);
const galerije = ref([]);
const vrste = ref([]);
const eventa = ref([]);
const newEvent = ref({
    naziv: '',
    cijena: 0,
    info: '',
    lokacijaid: null,
    galerijaid: null,
    vrstaid: null,
});
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
    axios.get('http://localhost:3000/vrste/eventi')
        .then(response => {
            vrste.value = response.data;
            console.log('Vrste eventa fetched successfully:', vrste.value);
        })
        .catch(error => {
            console.error('Error fetching vrste eventa:', error);
        });
    axios.get('http://localhost:3000/eventi')
        .then(response => {
            eventa.value = response.data;
            console.log('Events fetched successfully:', response.data);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
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
                idevent: 69,
                naziv: newEvent.value.naziv,
                cijena: newEvent.value.cijena,
                info: newEvent.value.info,
                lokacijaid: newEvent.value.lokacijaid,
                vrstaid: newEvent.value.vrstaid,
            });
            console.log('Event created successfully:', response.data);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    }
</script>

<template>
    <div id="podaci">
        <div>Podaci iz baze</div>
        <Event v-for="event in eventa" :key="event.idevent" :id="String(event.idevent)" :naziv="event.naziv" :cijena="event.cijena" :info="event.info" :novaLokacija="adrese.find(ad => ad.idlokacija === event.lokacijaid)?.mjesto" :galerija=null :vrstaEventa="vrste.find(v => v.idevent === event.vrstaid)?.tip"/>
    </div>

    <button id="createNew" @click="createNew()">Create New</button>

    <div v-if="showCreate" id="creation">
        Dodajte novi event: 
        <input type="text" v-model="newEvent.naziv" placeholder="Naziv eventa"/>
        <input type="number" v-model="newEvent.cijena" placeholder="Cijena ulaza"/>
        <select v-model="newEvent.lokacijaid">
            <option v-for="ad in adrese" :key="ad.idlokacija" :value="ad.idlokacija">{{ ad.mjesto }}</option>
        </select>
        <select v-model="newEvent.galerijaid">
            <option v-for="gal in galerije" :key="gal.idgalerija" :value="gal.idgalerija">{{ gal.naziv }}</option>
        </select>
        <select v-model="newEvent.vrstaid">
            <option v-for="vrsta in vrste" :value="vrsta.idevent" :key="vrsta.idevent">{{ vrsta.tip }}</option>
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