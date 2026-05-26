<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const autoriDjela = ref([]);
const dodaniAutori = ref([]);
const naziviAutora = ref([]);
const selectedGalerija = ref();
const selectedVrsta = ref();

const editing = ref(false)


const props = defineProps({
  id: Number,
  naziv: String,
  status: String,
  idGalerije: Number,
  idVrsteDjela: Number,
  galerije: Array,  
  autori: Array,
  autorDjelo: Array,
  vrsteDjela: Array,
  variant: {
    type: String,
    default: 'default'
  }
})

const statusref = ref()
const nazivref = ref()

const edit = (id) => {
    editing.value = true;
    let divs = document.getElementsByClassName('sranje' + id);
    let i = 0;
    for(i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = "yellow";
        divs[i].contentEditable = true;
    }
    document.getElementById(props.id + 5).style.pointerEvents = "auto";
    document.getElementById(props.id + 6).style.pointerEvents = "auto";
}
const izbrisi = async () => {
    console.log("Brisemo " + props.id);
    if(confirm("Jeste li sigurni da zelite izbrisati?")){
        const response = await axios.delete('http://localhost:3000/autor_djela/' + props.id);
        console.log(response);
        const djelaResponse = await axios.delete('http://localhost:3000/djela/' + props.id);
        console.log(djelaResponse);
    }
}

const potvrdi = async () => {
    console.log("potvrđujemo " + props.id);
    const noviNaziv = nazivref.value.innerHTML;
    const noviStatus = statusref.value.innerHTML;
    console.log('Novi naziv:', noviNaziv);
    console.log('Novi status:', noviStatus);
    if(confirm("Jeste li sigurni da ste dobro unijeli?")){
        let idNovog = "nest";
        const response = await axios.patch('http://localhost:3000/djela/' + props.id, {
            "naziv": noviNaziv,
            "info": noviStatus,
            "galerija": selectedGalerija.value,
            "vrsta": selectedVrsta.value,
        })
        dodaniAutori.value.forEach((idAutora) => {
            axios.post('http://localhost:3000/autor_djela', {
                djelo: props.id,
                autor: idAutora
            })
        })
    }
}

const dodajAutora = (naziv, id) => {
    naziviAutora.value[naziviAutora.value.length] = naziv;
    dodaniAutori.value[dodaniAutori.value.length] = id;
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

const postavljanje = () => {
    let pom = props.autorDjelo.filter(zapis => zapis.djelo == props.id);
    pom.forEach((clan) => {
        autoriDjela.value[autoriDjela.value.length] = clan.autor;
    })
    let pom2 = props.autori.filter(zapis => autoriDjela.value.includes(zapis.idautori));
    pom2.forEach((clan) => {
        naziviAutora.value[naziviAutora.value.length] = clan.naziv;
    })
    
    selectedGalerija.value = props.idGalerije;
    selectedVrsta.value = props.idVrsteDjela;
}

const removeAuthor = async (naziv) => {
    console.log(naziviAutora.value.indexOf(naziv));
    let pom = props.autorDjelo.findIndex(zapis => (zapis.autor == autoriDjela.value[naziviAutora.value.indexOf(naziv)]) && zapis.djelo == props.id);
    props.autorDjelo[pom].idautor_djela
    console.log(autoriDjela.value + naziviAutora.value)
    const response = await axios.delete('http://localhost:3000/autor_djela/autor/' + props.autorDjelo[pom].idautor_djela);
    naziviAutora.value.splice(naziviAutora.value.indexOf(naziv),1);
}

onMounted(() => {
    postavljanje();
})
</script>

<template>
    <div id="mainDiv">
        <div class="lapo">
            ID: <span >{{ id }}</span>
            Naziv: <span ref="nazivref" :class="'sranje'+id" :id="id + 1">{{ naziv }}</span>
            Galerija: <select :id="id + 5" v-model="selectedGalerija">
                <option v-for="g in galerije" :value="g.idgalerija">{{ g.naziv }}</option>
            </select>
        </div>
        <div class="lapo">
            Vrsta djela: <select :id="id + 6" v-model="selectedVrsta">
                <option v-for="v in vrsteDjela" :value="v.idvrsta_djela">{{ v.tip }}</option>
            </select>
            Status: <span ref="statusref" :id="id + 2" :class="'sranje' + id">{{ status }}</span>
            <button v-if="!editing" @click="edit(id)">Uredi</button>
            <button v-if="editing" @click="potvrdi()">Potvrdi</button>
            <button v-if="editing" @click="ponisti(id)">Ponisti</button>
            <button @click="izbrisi()">Izbrisi</button>
        </div>
        <div class="lapo">
            Lista autora: <span v-if="editing" v-for="aD in naziviAutora" class="authors" @click="removeAuthor(aD)">{{ aD }}</span>
            <span v-if="!editing"  v-for="aD in naziviAutora">{{ aD }}</span>
            <select v-if="editing"><option v-for="autor in autori.filter(autor => !naziviAutora.includes(autor.naziv))" :value="autor.idautori" @click="dodajAutora(autor.naziv, autor.idautori)">{{ autor.naziv }}</option></select>
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
.authors:hover {
    background-color: rgb(85, 17, 102);
}
</style>