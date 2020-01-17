<template>
  <div class="data-analysis-page">
    <div class="header">
      <div class="time-box">时间选择</div>
      <div class="search-box">
        <input type="text">
        <svg viewBox="0 0 1024 1024" width="22" height="22">
          <path
            d="M947.480232 894.270357 710.948121 658.925281c51.28299-62.794162 82.046644-143.002948 82.046644-230.40046 0-201.309912-163.193803-364.504738-364.505761-364.504738S63.981197 227.214908 63.981197 428.52482s163.193803 364.504738 364.505761 364.504738c86.105077 0 165.233252-29.859052 227.603765-79.782068l236.989529 235.799424c7.537673 7.475252 17.337877 11.181667 27.199479 11.181667 9.925047 0 19.787672-3.768837 27.387767-11.369955C962.682469 933.782256 962.619024 909.345704 947.480232 894.270357zM141.17123 428.52482c0-158.426219 128.888486-287.315728 287.315728-287.315728s287.315728 128.890532 287.315728 287.315728S586.916247 715.841571 428.487981 715.841571 141.17123 586.951039 141.17123 428.52482z"
          ></path>
        </svg>
      </div>
      <div class="location-icon-box">
        <svg viewBox="0 0 1024 1024" width="22" height="22">
          <path
            d="M512.09668625 332.11341781a99.58288406 99.58288406 0 1 1-70.78783313 29.39494782A99.58288406 99.58288406 0 0 1 512.09668625 332.11341781m0-59.98968937a160.17247031 160.17247031 0 1 0 113.38051313 46.79195812A158.97267656 158.97267656 0 0 0 512.09668625 272.12372844z"
            fill="#8a8a8a"
            p-id="17340"
          ></path>
          <path
            d="M786.84946344 148.54496844a382.13432062 382.13432062 0 0 0-549.50555344 0 404.33050594 404.33050594 0 0 0 0 562.10338875L512.09668625 992l274.75277719-281.35164281a404.33050594 404.33050594 0 0 0 0-562.10338875z m-41.39288532 522.51019406l-233.35989187 239.95875656-233.35989094-239.95875656a342.54112594 342.54112594 0 0 1 0-476.91802969 325.14411562 325.14411562 0 0 1 466.71978282 0 342.54112594 342.54112594 0 0 1 0 476.91802969z"
          ></path>
        </svg>
      </div>
      <div class="arraw-icon-box">
        <svg viewBox="0 0 1024 1024" p-id="2014" width="22" height="22">
          <path
            d="M288.0192 18.608c12.28480001 0 24.56746667 4.68693333 33.94026667 14.05866667L767.36426667 478.05866666c9.0016 9.00053333 14.05973333 21.21066668 14.05973332 33.94133334s-5.05706667 24.93866667-14.05973332 33.94133334L321.96053334 991.3344c-18.7456 18.74453333-49.136 18.74453333-67.88266667-0.00106667-18.74453333-18.74453333-18.74453333-49.136 0.00106667-67.88266666L665.54026667 512 254.07786667 100.54933333c-18.7456-18.74453333-18.7456-49.13706667-0.00106667-67.88266666C263.45066667 23.29493333 275.7344 18.608 288.0192 18.608z"
            p-id="2015"
          ></path>
        </svg>
      </div>
    </div>
    <div class="show-data-box">
      <div class="switch-data-type">
        <p class="selected">道路测试</p>
        <p>楼宇测试</p>
      </div>
      <div class="map-box">
        <div class="map-box-class" id="data-analysis-map"></div>
      </div>
    </div>
  </div>
</template>
<script>
import AMap from "AMap"; // 引入高德地图
export default {
  name: "DataAnalysisPage",
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let map = new AMap.Map("data-analysis-map", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始化地图层级
        center: [104.065778, 30.657422] //初始化地图中心点
      });
    }
  }
};
</script>

<style lang="scss">
@import "./../../assets/scss/definedGlobalVar.scss";
@import "./../../assets/scss/definedFunction.scss";
.data-analysis-page {
  .header {
    height: $title-height;
    background-color: $title-background-color;
    @include horizontalVerticalCenter;
    padding: 0 $left-right-margin;
    .time-box {
      width: 50px;
    }
    .search-box {
      width: 100px;
      @include horizontalVerticalCenter;
      background-color: white;
      & > input {
        width: calc(100% - 22px); /*no*/
        height: 25px; /*no*/
        padding: 0 10px; /*no*/
      }
    }
    .location-icon-box,
    .arraw-icon-box {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .show-data-box {
    height: calc(100% - #{$title-height});
    .switch-data-type {
      height: 20px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      & > p {
        text-align: center;
        height: 20px;
        line-height: 20px;
        flex: 1;
        border-top: 1px solid $border-color-main; /*no*/
        border-bottom: 1px solid $border-color-main; /*no*/
        &:last-of-type {
          border-left: 1px solid $border-color-main; /*no*/
        }
      }
      & > p.selected {
        background-color: $border-color-main;
      }
    }
    .map-box {
      height: calc(100% - 20px);
      .map-box-class {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
