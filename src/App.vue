<template>
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from "@/components/MainHeader.vue"

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBE60G8yImWlENWpCnQZzqqVUrwWa_torg",
  authDomain: "c4s-portal.firebaseapp.com",
  databaseURL: "https://c4s-portal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "c4s-portal",
  storageBucket: "c4s-portal.appspot.com",
  messagingSenderId: "863775995414",
  appId: "1:863775995414:web:82eb9557a13a099dfbe737",
  measurementId: "G-K2SR1WSNRC"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getDatabase(app)

export default {
  name: "IndexPage",
  components: {
    MainHeader
  },
  created() {
    onAuthStateChanged(auth, snapshot => {
      if (snapshot) {
        this.$store.commit('setUser', snapshot)
        onValue(ref(db, `users/${snapshot.uid}`), snapshot => { this.$store.commit('setC4sUser', snapshot.val()) })
        onValue(ref(db, `admin-users/${snapshot.uid}`), snapshot => { this.$store.commit('setStatus', snapshot.val() ? 'admin': 'member') })
      } else {
        this.$store.commit('setStatus', 'logout')
      }
      console.log(`now your status: ${this.$store.state.status}`)
      console.log(`now your ID: ${this.$store.state.user.uid}`)
    })
  }
}
</script>

<style>

</style>
