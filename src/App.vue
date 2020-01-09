<template>
  <div id="app">
    <router-link to="/">道路测试</router-link>

    <router-link to="/buildingTest">楼宇测试</router-link>
    <router-link to="/dataManage">数据管理</router-link>
    <router-link to="/dataAnalysis">数据分析</router-link>
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
