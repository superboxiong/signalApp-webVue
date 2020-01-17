<template>
  <v-touch v-on:swipeup="showHideSignalPanelUp" v-on:swipedown="showHideSignalPanelDown">
    <div class="signal-display-down-box" :class="signalPanelShow">
      <div class="down-handler">
        <svg viewBox="0 0 1024 1024" p-id="2743" width="18" height="18" v-html="handlerIcon">
          <path
            fill="#333333"
            d="M511.66031316 356.51594248l403.42645486 403.41955066c16.9429169 16.95396363 44.44374273 16.95396364 61.38804047 0 16.95396363-16.9429169 16.95396364-44.44374273 0-61.38804047l-434.12116552-434.11840383c-16.9429169-16.95810615-44.44374273-16.95810615-61.38804047 0l-434.11978467 434.11978467c-8.47836265 8.47422013-12.71892482 19.58446539-12.71892482 30.69332982s4.24056217 22.22049052 12.71892482 30.69332982c16.9429169 16.95810615 44.44374273 16.95810615 61.38804047 0l403.4278357-403.42231235z"
            p-id="2744"
          ></path>
        </svg>
      </div>
      <div class="title">信号质量[中国移动]</div>
      <div class="signal-quality-box">
        <ul class="signal-quality-controller">
          <li
            :class="currentTarget.toLowerCase() === 'rssi'?'selected':''"
            @click="()=>{switchSignamLineTarget('rssi')}"
          >RSSI</li>
          <li
            :class="currentTarget.toLowerCase() === 'rsrp'?'selected':''"
            @click="()=>{switchSignamLineTarget('rsrp')}"
          >RSRP</li>
          <li
            :class="currentTarget.toLowerCase() === 'rsrq'?'selected':''"
            @click="()=>{switchSignamLineTarget('rsrq')}"
          >RSRQ</li>
        </ul>
        <div class="signal-quality-chart">
          <div id="signal-echarts-id"></div>
        </div>
      </div>
      <div class="title">服务小区</div>
      <ul class="service-cell-box">
        <li>
          <div class="service-name">BAND</div>
          <div class="service-value">{{mainCellSignalInfo.band}}</div>
        </li>
        <li>
          <div class="service-name">TAC</div>
          <div class="service-value">{{mainCellSignalInfo.tac}}</div>
        </li>
        <li>
          <div class="service-name">ECI</div>
          <div class="service-value">{{mainCellSignalInfo.eci}}</div>
        </li>
        <li>
          <div class="service-name">PCI</div>
          <div class="service-value">{{mainCellSignalInfo.pci}}</div>
        </li>
        <li>
          <div class="service-name">EARFCN</div>
          <div class="service-value">{{mainCellSignalInfo.earfcn}}</div>
        </li>
        <li>
          <div class="service-name">FREQUENCY</div>
          <div class="service-value">{{mainCellSignalInfo.frequency}}</div>
        </li>
        <!-- <li>{{mainCellSignalInfo}}</li> -->
        <!-- <li>{{nearCellSignalInfo}}</li> -->
        <!-- <li>{{signalInfo}}</li> -->
      </ul>
      <div class="title">邻小区</div>
      <div class="neighborhood-box-wrap">
        <table class="neighborhood-box" cellspacing="0">
          <thead>
            <tr class="neighborhood-header">
              <td v-for="(item,index) in neighborhoodHeader" :key="index">
                <p>{{item.header}}</p>
              </td>
            </tr>
          </thead>
          <tbody class="neighborhood-body">
            <tr
              class="neighborhood-rows"
              v-for="(item,index) in nearCellSignalInfo"
              :key="index"
              v-if="!!nearCellSignalInfo"
            >
              <td>
                <p>{{item.band}}</p>
              </td>
              <td>
                <p>{{item.tac}}</p>
              </td>
              <td>
                <p>{{item.eci}}</p>
              </td>
              <td>
                <p>{{item.pci}}</p>
              </td>
              <td>
                <p>{{item.earfcn}}</p>
              </td>
              <td>
                <p>{{item.frequency}}</p>
              </td>
            </tr>
            <tr
              class="neighborhood-rows"
              v-if="!nearCellSignalInfo || nearCellSignalInfo.length === 0"
            >
              <td colspan="6">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-touch>
</template>
<script>
import echarts from "echarts";
import moment from "moment";
import { MessageBox } from "mint-ui";
import { StringToJson } from "./../../utils/Utils-Tool.js";
let handlerIconM = `<path d="M128 576h768V448H128z" fill="#767D87" p-id="11497"></path>`;
let handlerIconS = `<path d="M511.867 399.019l292.16 292.155c12.27 12.28 32.186 12.28 44.457 0 12.28099999-12.27 12.281-32.186 0-44.457l-314.388-314.388c-12.27-12.28-32.186-12.28-44.457 0l-314.387 314.388c-6.14 6.136-9.211 14.183-9.211 22.228s3.071 16.092 9.21099999 22.228c12.27 12.28 32.186 12.28 44.45700001 1e-8l292.159-292.15500001z" p-id="4663"></path>`;
let handlerIconB = `<path d="M512.133 624.982l-292.16-292.15500001c-12.27-12.28-32.186-12.28-44.45700001 1e-8-12.28099999 12.27-12.281 32.186 0 44.457l314.38800001 314.388c12.27 12.28 32.186 12.28 44.45699999 0l314.38700002-314.388c6.14-6.136 9.211-14.183 9.21099999-22.228s-3.071-16.092-9.211-22.228c-12.27-12.28-32.186-12.28-44.457 0l-292.159 292.15499999z" p-id="4528"></path>`;
export default {
  name: "SignalDisplayDown",
  data() {
    return {
      UA: window.navigator.userAgent,
      signalPanelLen: 0,
      //  全 85 半 -290 无 -415
      signalPanelShow: "bottom",
      currentTarget: "rssi",
      handlerIconM: handlerIconM,
      handlerIconS: handlerIconS,
      handlerIconB: handlerIconB,
      handlerIcon: handlerIconS,
      swipeDirection: "",
      showHideSignalStartPositionY: 0,
      neighborhoodHeader: [
        { header: "BAND", width: 12 },
        { header: "TAC", width: 12 },
        { header: "ECI", width: 12 },
        { header: "PCI", width: 12 },
        { header: "EARFCN", width: 24 },
        { header: "FREQUENCY", width: 28 }
      ],
      neighborhoodData: [
        {
          band: "BAND",
          tac: "",
          eci: -15,
          pci: "PCI",
          earfcn: "EARFCN",
          frequency: -15
        },
        {
          band: "BAND",
          tac: "",
          eci: -20,
          pci: "PCI",
          earfcn: "EARFCN",
          frequency: -20
        },
        {
          band: "BAND",
          tac: "",
          eci: -25,
          pci: "PCI",
          earfcn: "EARFCN",
          frequency: -25
        },
        {
          band: "BAND",
          tac: "",
          eci: -29,
          pci: "PCI",
          earfcn: "EARFCN",
          frequency: -29
        },
        {
          band: "BAND",
          tac: "",
          eci: -30,
          pci: "PCI",
          earfcn: "EARFCN",
          frequency: -30
        }
      ],
      mainCellSignalInfo: {
        band: "",
        tac: "",
        eci: 0,
        pci: "",
        earfcn: "",
        frequency: ""
      },
      nearCellSignalInfo: [],
      signalInfo: null,
      lineData: {
        xData: [],
        showData: [],
        target: "RSSI"
      },
      lineChart: null,
      timmer: null
    };
  },
  beforeCreate() {
    this.lineData = [];
    if (this.lineChart) {
      this.lineChart.clear();
      this.lineChart.dispose();
    }
  },
  mounted() {
    this.lineData = { xData: [], showData: [], target: "RSSI" };
    this.nearCellSignalInfo = [];
    clearInterval(this.timmer);
    this.timmer = setInterval(this.updateSignal, 3000);
    // this.updateSignal();
  },
  destroyed() {
    clearInterval(this.timmer);
    this.nearCellSignalInfo = [];
    this.lineData = { xData: [], showData: [], target: "RSSI" };
  },
  methods: {
    updateSignal() {
      let result =
        window.navigator.userAgent.indexOf("DSignalApp") > -1
          ? prompt("js://webview_getSignal?arg1=111&arg2=222")
          : null;
      // result = `{"main":[{"band":2147483647,"earfcn":1850,"eci":"242710193(948086-177)","frequency":0,"net_type":"4G","operator":"中国电信","pci":58,"rsrp":"-74","rsrq":"-10","rssi":"-51","tac":39697,"time":"2020-01-16 10:51:00"}],"near":[{"band":2147483647,"earfcn":1850,"eci":"2147483647(8388607-255)","frequency":0,"net_type":"4G","operator":"未知","pci":57,"rsrp":"-79","rsrq":"-12","rssi":"-55","tac":2147483647,"time":"2020-01-16 10:51:00"}]}`;
      result = `{
        "main":[{"band":2147483647,"earfcn":38950,"eci":"195079047(762027-135)","frequency":0,"net_type":"4G","operator":"中国移动","pci":448,"rsrp":"-86","rsrq":"-10","rssi":"-10mRssi","tac":32812,"time":"${moment().format(
          "YYYY-MM-DD HH:mm:ss"
        )}"}],
        "near":[{"band":2147483647,"earfcn":100,"eci":"2147483647(8388607-255)","frequency":0,"net_type":"4G","operator":"中国移动","pci":483,"rsrp":"-88","rsrq":"-7","rssi":"-7mRssi","tac":2147483647,"time":"${moment().format(
          "YYYY-MM-DD HH:mm:ss"
        )}"}]
        }`;
      this.signalInfo = StringToJson(result);

      if (this.signalInfo !== null) {
        this.mainCellSignalInfo = this.signalInfo.main[0];
        this.nearCellSignalInfo = this.signalInfo.near;
        this.updateSignalLineData(this.mainCellSignalInfo);
      }
    },
    // 更新折线图数据
    updateSignalLineData(sourceData) {
      // MessageBox.alert(`${sourceData.time},${sourceData.rsrp}`);
      this.lineData.xData.push(sourceData.time);
      this.lineData.showData.push(sourceData.rsrp);
      this.initChart(this.lineData);
    },
    // 切换折线图展示指标
    switchSignamLineTarget(target) {
      this.currentTarget = target;
      this.lineData.target = target;
      this.initChart(this.lineData);
    },
    // 向上滑动
    showHideSignalPanelUp() {
      console.log(`上 滑动`);
      this.swipeDirection = `上 滑动`;
      switch (this.signalPanelShow) {
        case "top":
          // this.signalPanelShow
          // this.handlerIcon = this.handlerIconB;
          break;
        case "middle":
          this.signalPanelShow = "top";
          this.handlerIcon = this.handlerIconB;
          break;
        case "bottom":
          this.signalPanelShow = "middle";
          this.handlerIcon = this.handlerIconM;
          break;
      }
    },
    // 向下滑动
    showHideSignalPanelDown() {
      console.log(`下 滑动`);
      this.swipeDirection = `下 滑动`;
      switch (this.signalPanelShow) {
        case "top":
          this.signalPanelShow = "middle";
          this.handlerIcon = this.handlerIconM;
          break;
        case "middle":
          this.signalPanelShow = "bottom";
          this.handlerIcon = this.handlerIconS;
          break;
        case "bottom":
          // this.signalPanelShow = -290;
          break;
      }
    },
    initChart(sourceData) {
      // console.log(sourceData.showData);
      // console.log(`--------------------------------`);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          },
          formatter: function(params) {
            let str = ``;
            for (let i = 0, len = params.length; i < len; i++) {
              str += `${params[i].name} <br /> ${
                params[i].marker
              } ${sourceData.target.toUpperCase()} : ${params[i].value}`;
            }
            return str;
          }
        },
        axisPointer: {
          lineStyle: {
            color: "#c9c9c9",
            type: "dashed"
          }
        },
        xAxis: {
          type: "category",
          position: "bottom",
          data: sourceData.xData,

          axisTick: {
            length: 0
          },
          axisLine: {
            lineStyle: {
              color: "#3e3e3e",
              width: 1
            }
          },
          splitLine: {
            show: false
          }
        },
        grid: {
          top: "10%",
          left: "10%",
          right: "5%",
          bottom: "15%"
        },
        dataZoom: [
          {
            type: "slider",
            show: false,
            bottom: 0
          }
        ],
        yAxis: {
          type: "value",
          inverse: true,
          axisTick: {
            length: 0
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#3e3e3e"
            }
          }
        },
        series: [
          {
            data: sourceData.showData,
            type: "line",
            name: sourceData.target.toUpperCase(),
            smooth: true,
            showSymbol: false,
            emphasis: {
              itemStyle: {
                opacity: 0
              }
            }
          }
        ]
      };
      this.lineChart = echarts.init(
        document.getElementById("signal-echarts-id")
      );
      this.lineChart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
@import "./../../assets/css/config.scss";
@import "./../../assets/scss/definedFunction.scss";
.signal-display-down-box.top {
  bottom: 65px;
  bottom: 14vh;
}
.signal-display-down-box.middle {
  bottom: -129px;
  bottom: -38vh;
}
.signal-display-down-box.bottom {
  bottom: -240px;
  // bottom: -61.5vh;
  bottom: -57.5vh;
}
.signal-display-down-box {
  width: 100%;
  height: calc(100% - 30px - 40px - 25px);
  position: fixed;
  bottom: 85px;
  z-index: 160;
  background-color: white;
  transition: bottom 0.5s;
  .down-handler {
    width: 100%;
    height: 18px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    padding: 2px $left-right-margin;
    font-size: 8px;
    background-color: rgba(242, 242, 242, 1);
    height: 10px;
  }
  .signal-quality-box {
    width: 100%;
    // width: calc(100% - 2 * $left-right-margin);
    // padding: 0 $left-right-margin;
    font-size: 10px;
    .signal-quality-controller {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 15px;
      & > li {
        flex: 1;
        text-align: center;
        background-color: rgba(201, 201, 201, 1);
        color: white;
        border-left: 1px solid white; /*no*/
      }
      & > li.selected {
        background-color: rgb(117, 116, 116);
      }
      & > li:first-of-type {
        border-left: none;
      }
    }
    .signal-quality-chart {
      width: 100%;
      height: 80px;
      #signal-echarts-id {
        width: 100%;
        height: 100%;
      }
    }
  }
  .service-cell-box {
    width: 100%;
    // width: calc(100% - 2 * $left-right-margin);
    // padding: 0 $left-right-margin;
    height: 88px;
    font-size: 10px;
    & > li {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      & > .service-name {
        flex: 1;
        background-color: rgba(201, 201, 201, 1);
        border-bottom: 1px solid white; /*no*/
        height: 14px;
      }
      & > .service-value {
        flex: 2;
        border-bottom: 1px solid rgba(201, 201, 201, 1); /*no*/
        height: 14px;
      }
    }
  }
  .neighborhood-box-wrap {
    width: 100%;
    height: calc(100% - 18px - 42px - 95px - 88px);
    font-size: 10px;
    background-color: white;
    .neighborhood-box {
      // margin: 0 $left-right-margin;

      border-collapse: collapse;
      thead,
      tbody,
      .neighborhood-header,
      .neighborhood-rows {
        width: 100%;
      }
      // 设置表格 单元格尺寸
      .neighborhood-header,
      .neighborhood-rows {
        td {
          &:nth-of-type(1) {
            & > p {
              width: 30px;
              @include singleRowEllipsis;
            }
          }
          &:nth-of-type(2) {
            & > p {
              width: 30px;
              @include singleRowEllipsis;
            }
          }
          &:nth-of-type(3) {
            & > p {
              width: 30px;
              @include singleRowEllipsis;
            }
          }
          &:nth-of-type(4) {
            & > p {
              width: 30px;
              @include singleRowEllipsis;
            }
          }
          &:nth-of-type(5) {
            & > p {
              width: 50px;
            }
          }
          &:nth-of-type(6) {
            & > p {
              width: 60px;
            }
          }
        }
      }
      tbody td {
        font-size: 4px;
      }
      .neighborhood-header {
        & > td {
          text-align: center;
          background-color: rgba(201, 201, 201, 1);
          border-left: 1px solid white; /*no*/
        }
        & > td:first-of-type {
          border-left: none;
        }
      }
      .neighborhood-body {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
      .neighborhood-rows {
        & > td {
          text-align: center;
          border: 1px solid rgba(201, 201, 201, 1); /*no*/
        }
        & > td:first-of-type {
          border-left: none;
        }
      }
    }
  }
}
</style>
