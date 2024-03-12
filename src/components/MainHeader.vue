<template>
  <!-- ヘッダー -->
  <div class="bg-dark">
    <div class="mw-xl mx-auto">
      <div class="p-3 hover pointer mw-logo" onclick="location.href=`/`">
        <img src="@/assets/portal2024_logo.svg" class="w-100">
      </div>
      <div v-if="!responsive" class="text-end">
        <span class="text-white hover pointer">トップ</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  data() { return {
    pages: [
      {
        title: "トップ",
        path: "/"
      }
    ]
  }}
}
</script>

<style>
.mw-logo {
  max-width: 180px;
}
</style>