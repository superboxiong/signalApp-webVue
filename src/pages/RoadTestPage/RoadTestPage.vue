<template>
  <div class="road-test-page">
    <div class="header">
      <button>暂停</button>
      <div class="switch-button-group">
        <p :class="{selected:switchStatus}" @touchstart="simSwitch">SIM1</p>
        <p :class="{selected:!switchStatus}" @touchstart="simSwitch">SIM2</p>
      </div>
      <svg viewBox="0 0 1024 1024" p-id="2014" width="22" height="22">
        <path
          d="M288.0192 18.608c12.28480001 0 24.56746667 4.68693333 33.94026667 14.05866667L767.36426667 478.05866666c9.0016 9.00053333 14.05973333 21.21066668 14.05973332 33.94133334s-5.05706667 24.93866667-14.05973332 33.94133334L321.96053334 991.3344c-18.7456 18.74453333-49.136 18.74453333-67.88266667-0.00106667-18.74453333-18.74453333-18.74453333-49.136 0.00106667-67.88266666L665.54026667 512 254.07786667 100.54933333c-18.7456-18.74453333-18.7456-49.13706667-0.00106667-67.88266666C263.45066667 23.29493333 275.7344 18.608 288.0192 18.608z"
          p-id="2015"
        ></path>
      </svg>
    </div>
    <div id="container"></div>
    <button class="road-test-start-test-button">开始检测</button>
    <SignalDisplayDownComponent/>
  </div>
</template>
<script>
import AMap from "AMap"; // 引入高德地图
import SignalDisplayDownComponent from "./../../components/SignalDisplayDownComponent/SignalDisplayDownComponent.vue";
export default {
  name: "RoadTestPage",
  components: { SignalDisplayDownComponent },
  data() {
    return {
      switchStatus: true,
    }
  },
  methods: {
    simSwitch() {
      this.switchStatus = !this.switchStatus;
    },
    setState(longitude,latitude){

    }
  },
  mounted() {
    let mapObj = new AMap.Map('container',{resizeEnable: true})
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
      mapObj.addControl(geolocation);
      geolocation.getCurrentPosition(
        (status, result) => {
          console.log(status)
          console.log(result)
        }
      )
      // location => {
      //   // this.setState({
      //   //   longitude: location.coords.longitude,//经度
      //   //   latitude: location.coords.latitude,//纬度
      //   //   })
      //   console.log(location.coords)
      //   }
      //
      // );
      // AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      // },
      /////////////////////////////////////////////////////////////////////
      // var _this = this;
      // if(navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(
      //     //locationSuccess 获取成功的话
      //     function(position) {
      //       _this.getLongitude = position.coords.longitude;
      //       _this.getLatitude = position.coords.latitude;
      //       alert(_this.getLongitude)　　　　　 //弹出经度测试
      //       alert(_this.getLatitude)
      //
      //     },
      //     //locationError  获取失败的话
      //     function(error) {
      //       var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
      //       alert(errorType[error.code - 1]);
      //     }
      //   );
      // }
      // let map = new AMap.Map("container", {
      //   resizeEnable: true, //是否监控地图容器尺寸变化
      //   zoom: 11, //初始化地图层级
      //   center: [108.546712, 34.313] //初始化地图中心点
      //   // center: [_this.getLongitude, _this.getLatitude]
      // });
      //////////////////////////////////////////////////////////////////////////////////////////////////
      // AMap.plugin('AMap.Geolocation', function() {
      //   var geolocation = new AMap.Geolocation({
      //     // 是否使用高精度定位，默认：true
      //     enableHighAccuracy: true,
      //     // 设置定位超时时间，默认：无穷大
      //     timeout: 10000,
      //     // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
      //     buttonOffset: new AMap.Pixel(10, 20),
      //     //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      //     zoomToAccuracy: true,
      //     //  定位按钮的排放位置,  RB表示右下
      //     buttonPosition: 'RB'
      //   })
      //
      //   geolocation.getCurrentPosition()
      //   // AMap.event.addListener(geolocation, 'complete', onComplete)
      //   // AMap.event.addListener(geolocation, 'error', onError)
      //
      //   function onComplete (data) {
      //     // data是具体的定位信息
      //   }
      //
      //   function onError (data) {
      //     // 定位出错
      //   }
      // })
      /////////////////////////////////////////////////////////////////////////////

    })
  }
};
</script>

<style lang="scss">
.road-test-page {
  #container {
    width: 100%;
    height: calc(100% - 30px - 25px);
  }
  // 头部样式
  .header {
    height: 30px;
    background-color: rgba(107, 107, 107, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: white;
    position: relative;
    z-index: 162;
    button {
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 12px;
    }
    .switch-button-group {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      padding: 1px;
      p {
        padding: 0 5px;
        color: rgba(107, 107, 107, 1);
        font-size: 12px;
      }
      p.selected {
        background-color: rgba(107, 107, 107, 1);
        color: white;
      }
    }
  }
  .road-test-start-test-button {
    width: 100%;
    height: 25px;
    border-radius: 3px;
    background-color: #cdcdcd;
    padding: 0;
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    position: relative;
    z-index: 161;
  }
}
</style>
