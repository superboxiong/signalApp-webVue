import Vue from 'vue';
import VueRouter from 'vue-router';
import BuildingTestPage from "./../pages/BuildingTestPage/BuildingTestPage.vue";
import RoadTestPage from "./../pages/RoadTestPage/RoadTestPage.vue";
import DataAnalysisPage from "./../pages/DataAnalysisPage/DataAnalysisPage.vue";
import DataManagePage from "./../pages/DataManagePage/DataManagePage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RoadTestPage',
    component: RoadTestPage
  },
  {
    path: '/buildingTest',
    name: 'BuildingTestPage',
    component: BuildingTestPage
  },{
    path: '/dataAnalysis',
    name: 'DataAnalysisPage',
    component: DataAnalysisPage
  },{
    path: '/dataManage',
    name: 'DataManagePage',
    component: DataManagePage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
