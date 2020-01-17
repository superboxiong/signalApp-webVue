<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>


<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
