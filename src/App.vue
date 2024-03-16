<template>
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from "@/components/MainHeader.vue"

export default {
  name: "IndexPage",
  components: {
    MainHeader
  },
  data() {
    return { hoge: "something" }
  }
}
</script>

<style>

</style>
