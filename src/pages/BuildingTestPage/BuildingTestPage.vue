<template>
  <div class="building-test-page">
    <div class="header">
      <div class="time-box">楼宇测试设置</div>
      <svg viewBox="0 0 1024 1024" p-id="2014" width="22" height="22">
        <path
          d="M288.0192 18.608c12.28480001 0 24.56746667 4.68693333 33.94026667 14.05866667L767.36426667 478.05866666c9.0016 9.00053333 14.05973333 21.21066668 14.05973332 33.94133334s-5.05706667 24.93866667-14.05973332 33.94133334L321.96053334 991.3344c-18.7456 18.74453333-49.136 18.74453333-67.88266667-0.00106667-18.74453333-18.74453333-18.74453333-49.136 0.00106667-67.88266666L665.54026667 512 254.07786667 100.54933333c-18.7456-18.74453333-18.7456-49.13706667-0.00106667-67.88266666C263.45066667 23.29493333 275.7344 18.608 288.0192 18.608z"
          p-id="2015"
        ></path>
      </svg>
    </div>
    <div class="title">
      <span style="font-size: 11px">楼宇测试信息填写</span>
    </div>
    <div class="select-div">
      <div class="message-div"><span class="span-message">地理位置测试</span><span class="selected-message" ref="signalDom">{{geographicalMessage}}</span></div>
      <div class="icon-div" @click="geographical"><span style="float: right;margin-top: 8px"><img  src="../../assets/site.png" width="24" height="24"></span></div>
      <!--width="24" height="24"-->
    </div>
    <div class="select-div"   @click="areaTypeModal">
      <!--id="trigger4"-->
      <div class="message-div"><span class="span-message">区域类型</span><span class="selected-message">{{areaTypeMessage}}</span></div>
      <div class="icon-div" ><span style="float: right;margin-top: 8px"><img  src="../../assets/right.png" width="24" height="24"></span></div>
      <!--<span style="float: right"></span>-->
    </div>
    <div class="select-div" @click="areaNameModal">
      <div class="message-div"><span class="span-message">区域名称</span><span class="selected-message">{{AreaName}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/edit.png" width="24" height="24"></span></div>
    </div>
    <div class="select-div" @click="BuildingNameModal">
      <div class="message-div"><span class="span-message">楼宇名称</span><span class="selected-message">{{buildingName}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/edit.png" width="24" height="24"></span></div>
    </div>
    <div class="select-div"  @click="BuildingStoreysModal">
      <div class="message-div"><span class="span-message">楼宇层数</span><span class="selected-message">{{buildingStoreysMessage}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/right.png" width="24" height="24"></span></div>
    </div>
    <div class="select-div"  @click="TestTypeModal">
      <div class="message-div"><span class="span-message">测试方式</span><span class="selected-message">{{testTypeMessage}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/right.png" width="24" height="24"></span></div>
    </div>
    <!--区域类型选择器-->
    <!--////////////////////////////////////////////////////////////////////////-->
    <div>
      <vuePickers :data="showAreaTypeData"
                  @cancel="areaCancel"
                  @confirm="areaConfirm"
                  :showToolbar="true"
                  :maskClick="false"
                  :defaultIndex="1"
                  :visible.sync="showAreaType"/>
    </div>
    <!--楼宇层数选择器-->
    <div>
      <vuePickers :data="showBuildingStoreysData"
                  @cancel="buildingStoreysCancel"
                  @confirm="buildingStoreysConfirm"
                  :showToolbar="true"
                  :defaultIndex="[5,5]"
                  :maskClick="false"
                  :visible.sync="showBuildingStoreys"/>
    </div>
    <!--测试类型模态框-->
    <div>
      <vuePickers :data="showTestTypeData"
                  @cancel="testTypeCancel"
                  @confirm="testTypeConfirm"
                  :defaultIndex="0"
                  :showToolbar="true"
                  :maskClick="false"
                  :visible.sync="showTestType"/>
    </div>
    <!--////////////////////////////////////////////////////////////////////////-->
    <!--区域名称模态框-->
    <areaNameModal v-show="showAreaName" v-on:closeme="closeme"></areaNameModal>
    <!--楼宇名称模态框-->
    <BuildingNameModal v-show="showBuildingName" v-on:closeme1="closeme1"></BuildingNameModal>
    <!--地理位置模态框-->
    <geographical v-show="showGeographical" v-on:closeme2="closeme2"></geographical>
    <button class="start-test-button" @click="startTestBuilding">前往测试</button>
  </div>
</template>
<script>
  import AMap from "AMap"; // 引入高德地图
  import areaNameModal from '../ElasticFrame/area/areaName';
  import BuildingNameModal from '../ElasticFrame/BuildingName/BuildingName'
  import Geographical from '../ElasticFrame/geographical/Geographical'
  //  //////////////////////////////////////////////////////
  import vuePickers from 'vue-pickers'
  //  /////////////////////////////////////////////////////
  import { EventBus } from "../eventBus/event-bus.js";
  export default {
    name:'BuildingTestPage',
    data() {
      ////////////////////////区域类型数据
      let areaTypeData = []
      areaTypeData.push({label:"商业楼宇",value:1},{label:"学校校区",value:2},{label:"住宅小区",value:3},{label:"酒店宾馆",value:4},{label:"事业单位",value:5},)
      /////////////////楼层数数据
      let minBuildingStoreysData=[]
      let maxBuildingStoreysData=[]
      for(var i=-5;i<=50;i++){
        minBuildingStoreysData.push({label:i,value:i})
      }
      for (var j=-5;j<=50;j++){
        maxBuildingStoreysData.push({label:j,value:j})
      }
      /////////////////////测试类型数据
      let testTypeData=[]
      testTypeData.push({label:'智能推荐',value:1},{label:'手动设置',value:2})
      return {
        showAreaTypeData: [ areaTypeData ], //区域类型数据
        showBuildingStoreysData:[minBuildingStoreysData,maxBuildingStoreysData],//楼层数数据
        showTestTypeData:[testTypeData], //测试方式数据
        result: '',
        showAreaName:false,
        showBuildingName:false,
        showGeographical:false,
        showAreaType:false,
        showBuildingStoreys:false,
        showTestType:false,
        areaTypeMessage:'',
        buildingStoreysMessage:'',
        testTypeMessage:'',
        AreaName:'',
        buildingName:'',
        geographicalMessage:'',
        maxFloorNumber: '',
        minFloorNumber:''
      }
    },
    components:{
      areaNameModal,
      BuildingNameModal,
      Geographical,
      vuePickers
    },
    methods:{
      areaNameModal:function(){
        this.showAreaName = !this.showAreaName;
      },
      geographical:function(){
        this.showGeographical=!this.showGeographical
        AMap.plugin("AMap.CitySearch", function() {
          var citySearch = new AMap.CitySearch();
          citySearch.getLocalCity(function(status, result) {
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
              console.log(result)
            }
          });
        });

      },
      BuildingNameModal:function(){
        this.showBuildingName = !this.showBuildingName;
      },
      areaTypeModal:function(){
        this.showAreaType=!this.showAreaType
      },
      BuildingStoreysModal:function(){
        this.showBuildingStoreys=!this.showBuildingStoreys
      },
      TestTypeModal:function(){
        this.showTestType=!this.showTestType
      },
      closeme:function(){
        this.showAreaName = !this.showAreaName;
      },
      closeme1:function(){
        this.showBuildingName=!this.showBuildingName
      },
      closeme2:function(){
        this.showGeographical=!this.showGeographical
      },
      //////////////////////区域类型
      areaConfirm (res) {
        this.areaTypeMessage=res[0].label
        // alert(res[0].label)
      },
      areaCancel:function(){
      },
      ////////////////////楼层数模块
      buildingStoreysConfirm(res){
        this.buildingStoreysMessage=res[0].label+' 至 '+res[1].label
        this.minFloorNumber=res[0].value  //楼层开始
        this.maxFloorNumber=res[1].value  //楼层结束
        // alert(res[0].label +'>>>>'+res[1].label)
      },
      buildingStoreysCancel(){
      },
      ///////////////////测试类型
      testTypeConfirm:function(res){
        this.testTypeMessage=res[0].label
      },
      testTypeCancel(){
      },
      //测试提交按钮
      startTestBuilding:function () {
        let resultData=[
          {startFloorNumber:this.minFloorNumber}, //楼层开始数
          {endFloorNumber:this.maxFloorNumber}, //楼层结束
           ];
        alert(this.minFloorNumber+'>>'+this.maxFloorNumber)
        if(this.testTypeMessage=='智能测试' || this.testTypeMessage==''){
          //跳转到智能测试页面
          this.$router.push({
            path:'/FloorTestPage',//跳转页面路径
            query:{  //传递参数
              resultData
            }
          })
        }else{
          this.$router.push({
            path:'/FloorTestPage',
            query:{
              resultData
            }
          })//跳转到手动测试页面
        }
        // alert(this.areaTypeMessage+'>>'+this.buildingStoreysMessage+'>>'+this.testTypeMessage+'>>'+this.AreaName+'>>'+this.buildingName)
      }
    },
    mounted:function(){
      var __this = this;
      AMap.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        // mapObj.addControl(geolocation);
        geolocation.getCurrentPosition(
          (status, result) => {
            if(result.status==0){//获取地理位置失败
              __this.$refs.signalDom.style.color='red'
              __this.geographicalMessage='获取失败'
            }

            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>'+status)
            console.log(result)
          }
        )})
      EventBus.$on("getAreaName",(name)=>{
        this.showAreaName=!this.showAreaName
        this.AreaName=name
      });
      EventBus.$on("getBuildingName",(name)=>{
        this.showBuildingName=!this.showBuildingName
        this.buildingName=name
      })
    },
  }
</script>

<style lang="scss">
  @import "../../assets/css/common.scss";
</style>
