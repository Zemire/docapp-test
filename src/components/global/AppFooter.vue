<template>
  <footer>
    <div class="container">
      <div class="col-sm-12">
        <p>All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
}
</script>

<style lang="scss" scoped>
footer {
  background-color: $main-bg-color;
  padding: 10px 0;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  p {
    text-align: right;
    margin: 0;
    font-size: 12px;
    line-height: 1;
    color: $sub-text-color;
    font-weight: 600;
  }
}
</style>