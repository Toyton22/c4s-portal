<template>
  <h1 class="mt-5 text-center">{{ pagename }}</h1>

  <div @click="login" class="w-100 py-3">ログイン</div>
  <div @click="logout" class="w-100 py-3">ログアウト</div>

  {{ hoge }}
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default {
  name: "MyPage",
  data() {
    return {
      pagename: "マイページ"
    }
  },
  methods: {
    login () {
      signInWithPopup(auth, provider)
      .catch((error) => {
        (error.message == "Firebase: Error (auth/unauthorized-domain).")
          ? alert("不正なドメインです") : alert(error.message);
      });
    },
    logout () {
      signOut(auth).then(() => {});
    }
  }
}
</script>

<style>

</style>