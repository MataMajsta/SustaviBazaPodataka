<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const selectedAdress = ref()
const nazivref = ref()
const cijenaref = ref()
const inforef = ref()
const selectedGalerija = ref()
const selectedVrsta = ref()
const props = defineProps({
  id: Number,
  naziv: String,
  cijena: Number,
  info: String,
  adresaId: Number,
  adrese: Array,
  galerijaId: Number,
  galerije: Array,
  idVrsteEventa: Number,
  eventovi: Array,
  variant: {
    type: String,
    default: 'default'
  }
})

const editing = ref(false)

const edit = (id) => {
    editing.value = true;
    let divs = document.getElementsByClassName('sranje' + id);
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "yellow";
        divs[i].contentEditable = true;
    }
    document.getElementById(props.id + 4).style.pointerEvents = "auto";
    document.getElementById(props.id + 5).style.pointerEvents = "auto";
    document.getElementById(props.id + 6).style.pointerEvents = "auto";
}
const izbrisi = async () => {
    if(confirm("Jeste li sigurni da zelite izbrisati?")){
        const response = await axios.delete('http://localhost:3000/eventi/' + props.id);
        console.log(response);
    }
}

const potvrdi = async () => {
    if(confirm("Jeste li sigurni da ste dobro unijeli?")){
        let novaAdresa = "nesto";
        if(selectedAdress.value == 'Nova'){
            const pom = await axios.post('http://localhost:3000/lokacije', {
                mjesto: document.getElementById(props.id + 7).value,
                drzava: document.getElementById(props.id + 8).value,
                adresa: document.getElementById(props.id + 9).value,
            });
            novaAdresa = pom.data.id;
        } else novaAdresa = selectedAdress.value;
        console.log('Creating event with data:', {
            naziv: nazivref.value.innerHTML,
        });
        const response = await axios.patch('http://localhost:3000/eventi/' + props.id, {
            "naziv": nazivref.value.innerHTML,
            "nova_lokacija": novaAdresa,
            "cijena_ulaza": Number(cijenaref.value.innerHTML),
            "info": inforef.value.innerHTML,
            "galerija": selectedGalerija.value,
            "vrsta": selectedVrsta.value,
        });
        console.log(response);
    }
}

const ponisti = (id) => {
    // Ovdje bi jos trebalo i vratiti stare vrijednosti u polja
    editing.value = false;
    let divs = document.getElementsByClassName('sranje' + id);
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "transparent";
        divs[i].contentEditable = true;
    }
    document.getElementById(props.id + 4).style.pointerEvents = "none";
    document.getElementById(props.id + 5).style.pointerEvents = "none";
    document.getElementById(props.id + 6).style.pointerEvents = "none";
}

onMounted(() => {
    selectedAdress.value = props.adresaId;
    document.getElementById(props.id + 4).style.pointerEvents = "none";
    
    selectedVrsta.value = props.idVrsteEventa;
    document.getElementById(props.id + 5).style.pointerEvents = "none";
    
    selectedGalerija.value = props.galerijaId;
    document.getElementById(props.id + 6).style.pointerEvents = "none";
})
</script>

<template>
    <div id="mainDiv">
        <div class="lapo">
            ID: <span>{{ id }}</span>
            Naziv: <span ref="nazivref" :class="'sranje' + id" :id="id + 1">{{ naziv }}</span>
            Cijena: <span ref="cijenaref" :class="'sranje' + id" :id = "id + 2">{{ cijena }}</span>
            Info: <span ref="inforef" :id="id + 3" :class="'sranje' + id">{{ info }}</span>
        </div>
        <div class="lapo">
            Galerija: <select v-model="selectedGalerija" :id="id + 6"><option v-for="g in galerije" :key="g.idgalerija" :value="g.idgalerija">{{ g.naziv }}</option> </select>
            Vrsta eventa: <select v-model="selectedVrsta" :id="id + 5"><option v-for="vr in eventovi" :key="vr.idvrsta_eventa" :value="vr.idvrsta_eventa">{{ vr.tip }}</option> </select>
            Nova lokacija: <select v-model="selectedAdress" :id="id + 4"><option v-for="ad in adrese" :key="ad.idlokacija" :value="ad.idlokacija">{{ ad.adresa }}</option> </select>
        </div>
        <div class="lapo">
            <button v-if="!editing" @click="edit(id)">Uredi</button> 
            <button v-if="editing" @click="potvrdi()">Potvrdi</button>
            <button v-if="editing" @click="ponisti(id)">Ponisti</button>
            <button @click="izbrisi()">Izbrisi</button>
        </div>
        <div v-if="selectedAdress=='Nova'" class="lapo">
            <input :id="id + 7" type="text" placeholder="mjesto"/>
            <input :id="id + 8" type="text" placeholder="drzava"/>
            <input :id="id + 9" type="text" placeholder="adresa"/>
        </div>
    </div>
</template>

<style scoped>
#mainDiv {
    font-size: 30px;
    color: rgb(213, 153, 236);
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-top: 20px;
}
.lapo {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-top: 20px;
    margin-left: 3%;
}
select {
    color: white;
}
option {
    color: #551166; 
}
</style>