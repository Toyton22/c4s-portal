<template>
  <!-- ヘッダー -->
  <div class="header bg-dark">
    <div class="mw-xl mx-auto row">
      <div class="py-3 hover pointer mw-logo" onclick="location.href=`/`">
        <img src="@/assets/portal2024_logo.svg" class="w-100 mx-3">
      </div>
      <div v-if="responsive" class="w-100 mw-menu p-0 ms-auto me-3 my-auto pointer hover">
        <label for="menuBtn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" class="w-100 bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </label>
      </div>
      <div v-else class="w-auto py-3 ms-auto my-auto text-end">
        <router-link
          class="hover pointer mx-3 text-decoration-none"
          v-for="page in pages"
          :key="page.path"
          :to="page.path"
          style="color: lightgray">
          {{ page.title }}
        </router-link>
        <router-link
          class="hover pointer mx-3 text-decoration-none"
          v-for="page in pages_adminonly"
          :key="page.path"
          :to="page.path"
          style="color: darkorchid">
          {{ page.title }}
        </router-link>
      </div>
    </div>
  </div>
  <input type="checkbox" id="menuBtn" />
  <!-- スマホ用メニュー -->
  <div class="menu mw-xl mx-auto">
    <div v-for="page in pages" :key="page.path" class="menu_content">
      <router-link
        class="menu_text pointer hover h4 text-decoration-none"
        :to="page.path"
        @click="handleMenu(false)"
        style="color: lightgray">
        {{ page.title }}
      </router-link>
    </div>
    <div v-for="page in pages_adminonly" :key="page.path" class="menu_content">
      <router-link
        class="menu_text pointer hover h4 text-decoration-none"
        :to="page.path"
        @click="handleMenu(false)"
        style="color: darkorchid">
        {{ page.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
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
  name: "MainHeader",
  data() { return {
    // main.jsとは異なり公開しているページのみ表示
    pages: [
      {
        title: "イベント",
        path: "/events"
      },
      {
        title: "マイページ",
        path: "/mypage"
      }
    ],
    pages_adminonly: [],
    pagename: "",
    admin: false
  }},
  created() {
    onAuthStateChanged(auth, snapshot => {
      const user = snapshot
      if (user) {
        get(ref(db, `admin-users/${user.uid}`)).then(snapshot => this.admin = snapshot ? true : false )
      } else {
        this.admin = false
      }
      if (this.admin) {
        // 非公開・管理者専用のページは認証してから追加
        this.pages_adminonly = [
          {
            title: "トップ",
            path: "/"
          },
          {
            title: "備品一覧",
            path: "/equips"
          },
          {
            title: "記事",
            path: "/members"
          }
        ]
      }
    })
  },
  methods: {
    go(path) { location.href = path },
    handleMenu(bool) { document.getElementById("menuBtn").checked = bool; },
    getPagename() {
      this.pages.forEach(page => {
        if (location.pathname == page.path) this.pagename = page.title
      })
      return this.pagename
    },
    getPathname() { return location.pathname }
  },
  computed: {
    responsive() {
      return (window.innerWidth < 750)
    }
  }
}
</script>

<style>
.mw-logo {
  max-width: 180px;
}
.mw-menu {
  max-width: 40px;
}
#menuBtn {
  display: none;
}
.menu {
  width: 100vw;
  height: 0vh;
  background: #444444;
  visibility: collapse;
  opacity: 0;
  transition: all 0.5s ease;
}
#menuBtn:checked ~ .menu {
  visibility: visible;
  opacity: 1;
  height: 100vh;
}
.menu_content {
  text-align: right;
  padding: 2em 1.5em 0 0;
}
.menu_text {
  font-weight: bold;
}
</style>