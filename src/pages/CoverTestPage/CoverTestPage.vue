<template>
  <div class="building-test-page">
    <div class="header">
      <div class="time-box">室内覆盖测试设置</div>
      <svg viewBox="0 0 1024 1024" p-id="2014" width="22" height="22">
        <path
          d="M288.0192 18.608c12.28480001 0 24.56746667 4.68693333 33.94026667 14.05866667L767.36426667 478.05866666c9.0016 9.00053333 14.05973333 21.21066668 14.05973332 33.94133334s-5.05706667 24.93866667-14.05973332 33.94133334L321.96053334 991.3344c-18.7456 18.74453333-49.136 18.74453333-67.88266667-0.00106667-18.74453333-18.74453333-18.74453333-49.136 0.00106667-67.88266666L665.54026667 512 254.07786667 100.54933333c-18.7456-18.74453333-18.7456-49.13706667-0.00106667-67.88266666C263.45066667 23.29493333 275.7344 18.608 288.0192 18.608z"
          p-id="2015"
        ></path>
      </svg>
    </div>
    <div class="title">
      <span style="font-size: 11px">室内覆盖测试信息填写</span>
    </div>
    <div class="select-div">
      <div class="message-div"><span class="span-message">地理位置</span><span class="selected-message" ref="signalDom">{{geographicalMessage}}</span></div>
      <div class="icon-div" @click="geographical"><span style="float: right;margin-top: 8px"><img  src="../../assets/site.png" width="24" height="24"></span></div>
      <!--width="24" height="24"-->
    </div>
    <div class="select-div"  id="trigger4"  @click="areaTypeModalCover">
      <div class="message-div"><span class="span-message">区域类型</span><span class="selected-message">{{areaTypeMessage}}</span></div>
      <div class="icon-div" ><span style="float: right;margin-top: 8px"><img  src="../../assets/right.png" width="24" height="24"></span></div>
      <!--<span style="float: right"></span>-->
    </div>
    <div class="select-div" @click="areaNameModalCover">
      <div class="message-div"><span class="span-message">区域名称</span><span class="selected-message">{{areaNameMessage}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/edit.png" width="24" height="24"></span></div>
    </div>
    <div class="select-div" @click="buildingModal">
      <div class="message-div"><span class="span-message">楼宇名称</span><span class="selected-message">{{buildingNameMessage}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/right.png" width="24" height="24"></span></div>
    </div>
    <div class="select-div" id="trigger2" @click="buildingModalCover">
      <div class="message-div"><span class="span-message">楼宇详情</span><span class="selected-message">{{buildingMessage}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/edit.png" width="24" height="24"></span></div>
    </div>
    <div class="select-div" id="trigger3" @click="TypeModal">
      <div class="message-div"><span class="span-message">测试方式</span><span class="selected-message">{{testType}}</span></div>
      <div class="icon-div"><span style="float: right;margin-top: 8px"><img  src="../../assets/right.png" width="24" height="24"></span></div>
    </div>

    <!--区域类型选择器-->
    <!--////////////////////////////////////////////////////////////////////////-->
    <div>
      <vuePickers :data="showAreaTypeData"
                  @cancel="areaCancel11"
                  @confirm="areaConfirm11"
                  :showToolbar="true"
                  :maskClick="false"
                  :defaultIndex="1"
                  :visible.sync="showAreaType"/>
    </div>
    <!--楼宇名称选择器-->
    <!--/////////////////////////////////////////////////////////////////////////////-->
    <div>
      <vuePickers :data="showBuildingNameData"
                  @cancel="buildingNameCancel"
                  @confirm="buildingNameConfirm"
                  :showToolbar="true"
                  :defaultIndex="[0,0]"
                  :maskClick="false"
                  :visible.sync="showBuildingNameTest"/>
    </div>
    <!--测试类型模态框-->
    <!--//////////////////////////////////-->
    <div>
      <vuePickers :data="showTypeData"
                  @cancel="TypeCancel"
                  @confirm="TypeConfirm"
                  :showToolbar="true"
                  :maskClick="false"
                  :visible.sync="showType"/>
    </div>
    <!--区域名称模态框-->
    <areaNameModalCover v-show="showAreaNameCover" v-on:closeme="closeme"></areaNameModalCover>
    <!--楼层详情-->
    <!--楼宇名称模态框-->
    <BuildingMessage v-show="showBuildingMessage" v-on:coverTest="coverTest"></BuildingMessage>
    <!--地图测试-->
    <geographical v-show="showGeographical1" v-on:closeme2="closeme2"></geographical>
    <button class="start-test-button" @click="startTestCover">前往测试</button>
  </div>

</template>

<style lang="scss">
  @import "../../assets/css/common.scss";
</style>

<script>
  import AMap from "AMap"; // 引入高德地图
  import areaNameModalCover from '../ElasticFrame/area/areaName';
  import BuildingNameModal from '../ElasticFrame/BuildingName/BuildingName';
  import Geographical from '../ElasticFrame/geographical/Geographical';
  import BuildingMessage from '../ElasticFrame/buildingMessage/BuildingMessage'
  //  //////////////////////////////////////////////////////
  import vuePickers from 'vue-pickers'
  //  /////////////////////////////////////////////////////
  import { EventBus } from "../eventBus/event-bus.js";
    export default {
      data() {
        ////////////////////////区域类型数据
        let areaTypeData = []
        areaTypeData.push({label:"商业楼宇",value:1},{label:"学校校区",value:2},{label:"住宅小区",value:3},{label:"酒店宾馆",value:4},{label:"事业单位",value:5},)
       //楼宇信息
        let buildingNameData=[]
        let buildingUnitData=[]
        for(var i=1;i<13;i++){
            buildingNameData.push({label:i+'栋',value:i})
        }
        for(var j=1;j<5;j++){
          buildingUnitData.push({label:j+'单元',value:j})
        }
        //测试方式
        let TypeData=[]
        TypeData.push({label:'智能推荐',value:1},{label:'手动设置',value:2})
        return {
          showAreaTypeData: [ areaTypeData ], //区域类型数据
          showBuildingNameData:[buildingNameData,buildingUnitData],//楼宇名称
          showTypeData:[TypeData],
          showGeographical1:false,
          showAreaType:false,
          showBuildingNameTest:false,
          showType:false,
          showAreaNameCover:false,
          showBuildingMessage:false,
          showGeographical:false,
          areaNameMessage:'',
          geographicalMessage:'',
          buildingMessage:'',
          buildingNameMessage:'',
          areaTypeMessage:'',
          testType:''
        }
      },
      components:{
        areaNameModalCover,
        BuildingNameModal,
        Geographical,
        BuildingMessage,
        vuePickers
      },
      methods:{
        geographical:function(){
          this.showGeographical1=!this.showGeographical1
          // 调用高德js 获取当前地理位置
          // 高德JS
          let mapObj = new AMap.Map('geographical')
          mapObj.plugin('AMap.Geolocation', function () {
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
                console.log(status)
                console.log(result)
              }
            )
          })
        },
        closeme2:function(){
          this.showGeographical1=!this.showGeographical1
        },
        //////////////////////区域类型
        areaTypeModalCover:function(){
          this.showAreaType=!this.showAreaType
        },
        areaConfirm11(res) {
          this.areaTypeMessage=res[0].label
          // alert(res[0].label)
        },
        areaCancel11:function(){
        },
        ///////////////////////楼宇名称
        buildingModal:function(){
           this.showBuildingNameTest=!this.showBuildingNameTest
        },
        buildingNameCancel:function(){

        },
        buildingNameConfirm(res) {
          this.buildingNameMessage=res[0].label+' '+res[1].label
        },
        ///////////////////////测试方式
        TypeModal:function () {
          this.showType=!this.showType
        },
        TypeCancel:function () {
        },
        TypeConfirm(res){
          this.testType=res[0].label
        },
        /////////////////////////区域名称
        areaNameModalCover:function () {
          this.showAreaNameCover=!this.showAreaNameCover
        },
        closeme:function () {
          this.showAreaNameCover=!this.showAreaNameCover
        },
        ////////////////////////////楼层详情
        buildingModalCover:function(){
          this.showBuildingMessage=!this.showBuildingMessage
        },
        coverTest:function () {
            this.showBuildingMessage=!this.showBuildingMessage
        },
        //开始测试
        startTestCover:function () {
          if(this.testType=='预设路径' || this.testType==''){
            this.$router.push({
              path:'/',//跳转路径
              query:{  //数据

              }
            })
          }else{
            this.$router.push({//传感器方式
              path:'/',
              query:{
              }
            })

          }
        }
      },
      mounted(){
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
          this.showAreaNameCover=!this.showAreaNameCover
          this.areaNameMessage=name
        });
        EventBus.$on("getBuildingMessage",(name)=>{
          this.showBuildingMessage=!this.showBuildingMessage
          this.buildingMessage=name
        })
      }
    }
</script>
