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
      switchStatus: true
    };
  },
  mounted() {
    let map = new AMap.Map("container", {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 11, //初始化地图层级
      center: [104.065778, 30.657422] //初始化地图中心点
    });
  },
  methods: {
    simSwitch() {
      this.switchStatus = !this.switchStatus;
    }
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
