<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const selectedAdress = ref()
 
const nazivref = ref();
const cijenaref = ref();    
const inforef = ref();
const props = defineProps({
  id: Number,
  naziv: String,
  cijena: Number,
  info: String,
  adresaId: Number,
  adrese: Array,
  variant: {
    type: String,
    default: 'default'
  }
})

const editing = ref(false)

const edit = (id) => {
    editing.value = true;
    console.log("editujemo " + id);
    console.log(document.getElementsByClassName('sranje' + id));
    let divs = document.getElementsByClassName('sranje' + id);
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "green";
        divs[i].contentEditable = true;
    }
    document.getElementById(props.id + 4).style.pointerEvents = "auto";
}
const izbrisi = async () => {
    if(confirm("Jeste li sigurni da zelite izbrisati?")){
        const response = await axios.delete('http://localhost:3000/galerije/' + props.id);
      
        console.log(response);
    }
}

const potvrdi = async () => {
    console.log("potvrđujemo " + props.id);
    const nazivNovi=nazivref.value.innerHTML;
    const cijenaNovi=cijenaref.value.innerHTML;
    const infoNovi=inforef.value.innerHTML;
    if(confirm("Jeste li sigurni da ste dobro unijeli?")){
        let novaAdresa = "nesto";
        if(selectedAdress.value == 'Nova'){
            const pom = await axios.post('http://localhost:3000/lokacije', {
                mjesto: document.getElementById(props.id + 6).value,
                drzava: document.getElementById(props.id + 7).value,
                adresa: document.getElementById(props.id + 8).value,
            });
            novaAdresa = pom.data.idlokacija;
        } else novaAdresa = selectedAdress.value;
        const response = await axios.patch('http://localhost:3000/galerije/' + props.id, {
            "naziv": nazivNovi,
            "cijena_ulaza": cijenaNovi,
            "info": infoNovi,
            "idlokacije": novaAdresa
        });
        console.log(response);
        
    }
}

const ponisti = (id) => {
    // Ovdje bi jos trebalo i vratiti stare vrijednosti u polja
    editing.value = false;
    let divs = document.getElementsByClassName(String(id));
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "transparent";
        divs[i].contentEditable = false;
    }
    document.getElementById(props.id + 4).style.pointerEvents = "none";
}

const check = async () => {
    const pom = await axios.post('http://localhost:3000/lokacije', {
                mjesto: document.getElementById(props.id + 6).value,
                drzava: document.getElementById(props.id + 7).value,
                adresa: document.getElementById(props.id + 8).value,
            });
            console.log(document.getElementById(props.id + 6).value);
}

onMounted(() => {
    selectedAdress.value = props.adresaId;
    document.getElementById(props.id + 4).style.pointerEvents = "none";
})
</script>

<template>
    <div id="mainDiv">
        <div class="lapo">
            ID: <span>{{ id }}</span>
            Naziv: <span ref="nazivref" :class="'sranje' + id" :id="id + 1">{{ naziv }}</span>
            Cijena ulaza: <span ref="cijenaref" :class="'sranje' + id" :id = "id + 2">{{ cijena }}</span>
        </div>
        <div class="lapo">
            Adresa: <select :id="id + 4" v-model="selectedAdress"><option class="adresa-option" v-for="ad in adrese" :value="ad.idlokacija" :key="ad.idlokacija">{{ ad.adresa }}</option> </select>
            Info: <span ref="inforef" :class="'sranje' + id" :id="id + 3">{{ info }}</span>
            <button v-if="!editing" @click="edit(id)">Uredi</button>
            <button v-if="editing" @click="potvrdi()">Potvrdi</button>
            <button v-if="editing" @click="ponisti(id)">Ponisti</button>
            <button @click="check()">Check</button>
            <button @click="izbrisi()">Izbrisi</button>
        </div>
        <div v-if="selectedAdress=='Nova'" class="lapo">
            <input :id="id + 6" type="text" placeholder="mjesto"/>
            <input :id="id + 7" type="text" placeholder="drzava"/>
            <input :id="id + 8" type="text" placeholder="adresa"/>
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
.adresa-option {
    color: #551166;
}
</style>