<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const selectedAdress = ref()

const props = defineProps({
  id: String,
  naziv: String,
  cijena: Number,
  info: String,
  adresaId: String,
  adrese: Array,
  galerijaId: String,
  galerije: Array,
  idVrsteEventa: String,
  eventovi: Array,
  variant: {
    type: String,
    default: 'default'
  }
})

const editing = ref(false)

const edit = (id) => {
    editing.value = true;
    let divs = document.getElementsByClassName(id);
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
        const response = await axios.delete('http://localhost:5000/api/events/' + props.id);
        console.log(response);
    }
}

const potvrdi = async () => {
    if(confirm("Jeste li sigurni da ste dobro unijeli?")){
        let novaAdresa = "nesto";
        if(selectedAdress.value == 'Nova'){
            const pom = await axios.post('http://localhost:5000/api/lokacije', {
                mjesto: document.getElementById(props.id + 7).value,
                drzava: document.getElementById(props.id + 8).value,
                adresa: document.getElementById(props.id + 9).value,
            });
            novaAdresa = pom.data.id;
        } else novaAdresa = selectedAdress.value;
        const response = await axios.patch('http://localhost:5000/api/events/' + props.id, {
            "naziv": document.getElementById(props.id + 1).innerHTML,
            "cijenaUlaza": document.getElementById(props.id + 2).innerHTML,
            "info": document.getElementById(props.id + 3).innerHTML,
            "idNoveLokacije": novaAdresa,
            "idGalerije": document.getElementById(props.id + 6).value,
            "idVrsteEventa": document.getElementById(props.id + 5).value,
        });
        console.log(response);
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
    document.getElementById(props.id + 4).style.pointerEvents = "none";
    document.getElementById(props.id + 5).style.pointerEvents = "none";
    document.getElementById(props.id + 6).style.pointerEvents = "none";
}

onMounted(() => {
    selectedAdress.value = props.adresaId;
    document.getElementById(props.id + 4).style.pointerEvents = "none";
    
    document.getElementById(props.id + 5).value = props.idVrsteEventa;
    document.getElementById(props.id + 5).style.pointerEvents = "none";
    
    document.getElementById(props.id + 6).value = props.galerijaId;
    document.getElementById(props.id + 6).style.pointerEvents = "none";
})
</script>

<template>
    <div id="mainDiv">
        <div class="lapo">
            ID: <span>{{ id }}</span>
            Naziv: <span :class="id" :id="id + 1">{{ naziv }}</span>
            Cijena: <span :class="id" :id = "id + 2">{{ cijena }}</span>
            Info: <span :id="id + 3" :class="id">{{ info }}</span>
        </div>
        <div class="lapo">
            Galerija: <select :id="id + 6"><option v-for="g in galerije" :value="g._id">{{ g.naziv }}</option> </select>
            Vrsta eventa: <select :id="id + 5"><option v-for="vr in eventovi" :value="vr._id">{{ vr.tip }}</option> </select>
            Nova lokacija: <select v-model="selectedAdress" :id="id + 4"><option v-for="ad in adrese" :value="ad._id">{{ ad.adresa }}</option> </select>

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
    color: grey;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    margin-top: 20px;
}
.lapo {
    display: flex;
    flex-direction: row;
    gap: 5px;
}
</style>