<script>
import AppHeader from "./components/global/AppHeader.vue";
import AppFooter from "./components/global/AppFooter.vue";
export default {
  components: {AppFooter, AppHeader}
}
</script>

<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view />
    <AppFooter></AppFooter>
  </div>
</template>

<style >

</style>
