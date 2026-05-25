<script setup>
import { ref ,onMounted} from 'vue';
import axios from 'axios';
defineProps({
  id: String,
  naziv: String,
  cijena: String,
  info: String,
  novaLokacija: String | undefined,
  galerija: String,
  vrstaEventa: String,
  variant: {
    type: String,
    default: 'default'
  }
})
const nazivref=ref(null);
const inforef=ref(null);
const cijenaref=ref(null);
const editing = ref(false)
const adrese = ref([]);
const vrste = ref([]);
const edit = (id) => {
    editing.value = true;
    let divs = document.getElementsByClassName(id);
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "yellow";
        divs[i].contentEditable = true;
    }
}
const izbrisi = (id) => {
    alert('hi');
}
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
    axios.get('http://localhost:3000/vrste/eventi')
        .then(response => {
            vrste.value = response.data;
            console.log('Vrste fetched successfully:', vrste.value);
        })
        .catch(error => {
            console.error('Error fetching vrste:', error);
        });
});
async function izbrisiEvent(id) {   
    try {
        const response = await axios.delete(`http://localhost:3000/eventi/${id}`);
        console.log('Event deleted successfully:', response.data);
        location.reload();
    } catch (error) {
        console.error('Error deleting event:', error);
    }

}

const potvrdi = () => {
    alert('Podatak azuriran!');
}
async function azurirajEvent(id,vrstaEventa,novaLokacija) {   
    const noviNaziv = nazivref.value.innerText;
    const novaCijena = cijenaref.value.innerText;
    const noviInfo = inforef.value.innerText;
    try {
        const response = await axios.patch(`http://localhost:3000/eventi/${id}`, {
            idevent: id,
            naziv: noviNaziv,
            info: noviInfo,
            cijena: Number(novaCijena),
            lokacijaid:adrese.value.find(ad => ad.mjesto === novaLokacija)?.idlokacija,
            vrstaid:vrste.value.find(v => v.tip === vrstaEventa)?.idevent 
        });
        console.log('Event updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating event:', error);
    }
}

const ponisti = (id) => {
    // Ovdje bi jos trebalo i vratiti stare vrijednosti u polja
    editing.value = false;
    let divs = document.getElementsByClassName(id);
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "transparent";
        divs[i].contentEditable = true;
    }
}
</script>

<template>
    <div id="mainDiv">
        ID: <span>{{ id }}</span>
        Naziv: <span ref="nazivref" :class="id">{{ naziv }}</span>
        Cijena ulaza: <span ref="cijenaref" :class="id">{{ cijena }}</span>
        Info: <span ref="inforef" :class="id">{{ info }}</span>
        Galerija: <span :class="id">{{ galerija }}</span>
        Vrsta eventa: <span :class="id">{{ vrstaEventa }}</span>
        <span v-if="novaLokacija">Adresa: <span :class="id">{{ novaLokacija }}</span></span>
        <button v-if="!editing" @click="edit(id)">Uredi</button>
        <button v-if="editing" @click="azurirajEvent(id,vrstaEventa,novaLokacija)">Potvrdi</button>
        <button v-if="editing" @click="ponisti(id)">Ponisti</button>
        <button @click="izbrisiEvent(id,vrstaEventa,novaLokacija)">Izbrisi</button>
    </div>
</template>

<style scoped>
#mainDiv {
    font-size: 30px;
    color: grey;
    display: flex;
    flex-direction: row;
    gap: 5px;
}
</style>