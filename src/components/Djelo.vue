<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const autoriDjela = ref([]);
const dodaniAutori = ref([]);
const naziviAutora = ref([]);

const props = defineProps({
  id: String,
  naziv: String,
  status: String,
  idGalerije: String,
  idVrsteDjela: String,
  galerije: Array,
  autori: Array,
  autorDjelo: Array,
  vrsteDjela: Array,
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
    document.getElementById(props.id + 5).style.pointerEvents = "auto";
    document.getElementById(props.id + 6).style.pointerEvents = "auto";
}
const izbrisi = async () => {
    if(confirm("Jeste li sigurni da zelite izbrisati?")){
        const response = await axios.delete('http://localhost:5000/api/djela/' + props.id);
        console.log(response);
    }
}

const potvrdi = async () => {
    if(confirm("Jeste li sigurni da ste dobro unijeli?")){
        let idNovog = "nest";
        const response = await axios.patch('http://localhost:5000/api/djela/' + props.id, {
            "naziv": document.getElementById(props.id + 1).innerHTML,
            "status": document.getElementById(props.id + 2).innerHTML,
            "idGalerije": document.getElementById(props.id + 5).value,
            "idVrstaDjela": document.getElementById(props.id + 6).value,
        });
        dodaniAutori.value.forEach((idAutora) => {
            axios.post('http://localhost:5000/api/autorDjelo/', {
                idDjela: props.id,
                idAutora: idAutora
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
    let pom = props.autorDjelo.filter(zapis => zapis.idDjela == props.id);
    pom.forEach((clan) => {
        autoriDjela.value[autoriDjela.value.length] = clan.idAutora;
    })
    let pom2 = props.autori.filter(zapis => autoriDjela.value.includes(zapis._id));
    pom2.forEach((clan) => {
        naziviAutora.value[naziviAutora.value.length] = clan.naziv;
    })
    
    document.getElementById(props.id + 5).value = props.idGalerije;
    document.getElementById(props.id + 5).style.pointerEvents = "none";
    
    document.getElementById(props.id + 6).value = props.idVrsteDjela;
    document.getElementById(props.id + 6).style.pointerEvents = "none";
}

const removeAuthor = async (naziv) => {
    console.log(naziviAutora.value.indexOf(naziv));
    let pom = props.autorDjelo.findIndex(zapis => (zapis.idAutora == autoriDjela.value[naziviAutora.value.indexOf(naziv)]) && zapis.idDjela == props.id);
    props.autorDjelo[pom]._id
    console.log(autoriDjela.value + naziviAutora.value)
    const response = await axios.delete('http://localhost:5000/api/autorDjelo/' + props.autorDjelo[pom]._id);
    naziviAutora.value.splice(naziviAutora.value.indexOf(naziv),1);
}

onMounted(() => {
    postavljanje();
})
</script>

<template>
    <div id="mainDiv">
        <div class="lapo">
            ID: <span>{{ id }}</span>
            Naziv: <span :class="id" :id="id + 1">{{ naziv }}</span>
            Galerija: <select :id="id + 5"><option v-for="g in galerije" :value="g._id">{{ g.naziv }}</option> </select>
        </div>
        <div class="lapo">
            Vrsta djela: <select :id="id + 6"><option v-for="v in vrsteDjela" :value="v._id">{{ v.tip }}</option> </select>
            Status: <span :id="id + 2" :class="id">{{ status }}</span>
            <button v-if="!editing" @click="edit(id)">Uredi</button>
            <button v-if="editing" @click="potvrdi()">Potvrdi</button>
            <button v-if="editing" @click="ponisti(id)">Ponisti</button>
            <button @click="izbrisi()">Izbrisi</button>
        </div>
        <div class="lapo">
            Lista autora: <span v-if="editing" v-for="aD in naziviAutora" class="authors" @click="removeAuthor(aD)">{{ aD }}</span>
            <span v-if="!editing" v-for="aD in naziviAutora">{{ aD }}</span>
            <select v-if="editing"><option v-for="autor in autori.filter(autor => !naziviAutora.includes(autor.naziv))" :value="autor._id" @click="dodajAutora(autor.naziv, autor._id)">{{ autor.naziv }}</option></select>
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
.authors:hover {
    background-color: red;
}
</style>