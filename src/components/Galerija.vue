<script setup>
import { ref ,onMounted} from 'vue';
import axios from 'axios';
const adreso = ref([]);
defineProps({
  id: String,
  naziv: String,
  cijena: String,
  info: String,
  adresa: String,
  variant: {
    type: String,
    default: 'default'
  }
})
const idref=ref(null);
const nazivref=ref(null);   
const cijenaref=ref(null);
const adresaref=ref(null);
const inforef=ref(null);

onMounted(() => {
    console.log('Component mounted, fetching adrese...');
    axios.get('http://localhost:3000/lokacije')
        .then(response => {
            adreso.value = response.data;
            console.log('Adrese fetched successfully:', adreso.value);
        })
        .catch(error => {
            console.error('Error fetching adrese:', error);
        });
});
const editing = ref(false)

const edit = (id) => {
    editing.value = true;
    let divs = document.getElementsByClassName(id);
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "yellow";
        divs[i].contentEditable = true;
    }
}
const izbrisi = (data) => {
    alert('hi');
    console.log("allooo ")
    console.log('Attempting to delete galerija with ID:', data);
    izbrisiGalerija(data);
}

async function izbrisiGalerija(id) {   
    try {
        console.log("allooo ")
        const response = await axios.delete(`http://localhost:3000/galerije/${id}`);
        console.log('Galerija deleted successfully:', response.data);
        location.reload();
    } catch (error) {
        console.error('Error deleting galerija:', error);
    }
}
async function azurirajGalerija(id) {
    const noviNaziv = nazivref.value.innerText;
    const novaCijena = cijenaref.value.innerText;
    const novaAdresa = adresaref.value.innerText;
    const noviInfo = inforef.value.innerText;

    console.log("Novi podaci iz spanova:", { noviNaziv, novaCijena, novaAdresa, noviInfo });
       try {
        const response = await axios.patch(`http://localhost:3000/galerije/${id}`, {
            naziv: noviNaziv,
            cijena_ulaza: Number(novaCijena),
            lokacijaid: adreso.value.find(adresa => adresa.mjesto === novaAdresa)?.idlokacija,
            info: noviInfo
        });
        console.log('Galerija updated successfully:', response.data);
        location.reload();
    } catch (error) {
        console.error('Error updating galerija:', error);
    }
}

const potvrdi = () => {
    alert('Podatak azuriran!');
}

const ponisti = (id,naziv,cijena,adresa,info) => {
    // Ovdje bi jos trebalo i vratiti stare vrijednosti u polja
    editing.value = false;
    nazivref.value.innerText = naziv;
    cijenaref.value.innerText = cijena; 
    adresaref.value.innerText = adresa;
    inforef.value.innerText = info;
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
        ID: <span  :class="id">{{ id }}</span>
        Naziv: <span ref="nazivref" :class="id" >{{ naziv }}</span>
        Cijena ulaza: <span ref="cijenaref" :class="id" >{{ cijena }}</span>
        Adresa: <span ref="adresaref" :class="id" >{{ adresa }}</span>
        Info: <span ref="inforef" :class="id" >{{ info }}</span>
        <button v-if="!editing" @click="edit(id)">Uredi</button>
        <button v-if="editing" @click="azurirajGalerija(id)">Potvrdi</button>
        <button v-if="editing" @click="ponisti(id,naziv,cijena,adresa,info)">Ponisti</button>
        <button @click="izbrisiGalerija(id)">Izbrisi</button>
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