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
        <span class="text-light hover pointer mx-3" v-for="page in pages" :key="page.path" v-on:click="go(page.path)">
          {{ page.title }}
        </span>
      </div>
    </div>
  </div>
  <input type="checkbox" id="menuBtn" />
  <!-- スマホ用メニュー -->
  <div class="menu mw-xl mx-auto">
    <div v-for="page in pages" :key="page.path" class="menu_content"><h4 class="menu_text pointer hover" @click="go(page.path)">{{ page.title }}</h4></div>
  </div>

  <h2 class="mt-5">{{ pagename }}</h2>
</template>

<script>
export default {
  name: "MainHeader",
  data() { return {
    pages: [
      {
        title: "トップ",
        path: "/"
      },
      {
        title: "イベント",
        path: "/events"
      },
      {
        title: "記事",
        path: "/members"
      },
      {
        title: "備品一覧",
        path: "/equips"
      },
      {
        title: "マイページ",
        path: "/mypage"
      }
    ]
  }},
  created() {
    
  },
  methods: {
    go(path) { location.href = path }
  },
  computed: {
    responsive() {
      return (window.innerWidth < 750)
    },
    pagename() {
      if(location.pathname == "/") return ""
      let pagename = ""
      this.pages.forEach(page => {
        if (location.pathname == page.path) pagename = page.title
      })
      return pagename
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
  color: whitesmoke;
}
</style>