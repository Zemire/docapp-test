<template>
  <header>
    <div class="container">
      <div class="col-sm-12">
        <p @click="goHome">DocApp</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    goHome() {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    background-color: $main-bg-color;
    padding: 10px 0;
    margin: 0 0 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    p {
      margin: 0;
      font-size: 16px;
      line-height: 1;
      color: $sub-text-color;
      font-weight: 600;
      cursor: pointer;
    }
  }

</style>