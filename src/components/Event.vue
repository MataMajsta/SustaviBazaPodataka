<script setup>
import { ref } from 'vue';

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
const izbrisi = () => {
    alert('hi');
}

const potvrdi = () => {
    alert('Podatak azuriran!');
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
        Naziv: <span :class="id">{{ naziv }}</span>
        Cijena ulaza: <span :class="id">{{ cijena }}</span>
        Info: <span :class="id">{{ info }}</span>
        Galerija: <span :class="id">{{ galerija }}</span>
        Vrsta eventa: <span :class="id">{{ vrstaEventa }}</span>
        <span v-if="novaLokacija">Adresa: <span :class="id">{{ novaLokacija }}</span></span>
        <button v-if="!editing" @click="edit(id)">Uredi</button>
        <button v-if="editing" @click="potvrdi()">Potvrdi</button>
        <button v-if="editing" @click="ponisti(id)">Ponisti</button>
        <button @click="izbrisi()">Izbrisi</button>
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