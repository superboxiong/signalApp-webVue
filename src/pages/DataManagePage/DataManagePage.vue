<template>
  <div class="data-mange-page">
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
      <div class="editor-box">编辑</div>
    </div>
    <div class="data-file-list-wrap" ref="scroll-box">
      <ul class="data-file-list">
        <li class="day-list" v-for="(dayFile,dayFileIndex) in fileData" :key="dayFileIndex">
          <div class="day-time-title">{{dayFile.time}}</div>
          <ul class="day-file-list">
            <li class="day-file" v-for="(file,fileIndex) in dayFile.fileList" :key="fileIndex">
              <div class="day-file-name">{{file.fileName}}</div>
              <div class="day-file-desc">{{file.fileDesc}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "DataMangePage",
  data() {
    return {
      fileData: [
        {
          time: "2019/12/14",
          fileList: [
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            },
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            },
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            }
          ]
        },
        {
          time: "2019/12/13",
          fileList: [
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            },
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            }
          ]
        },
        {
          time: "2019/12/12",
          fileList: [
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            },
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            }
          ]
        },
        {
          time: "2019/12/11",
          fileList: [
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            },
            {
              fileName: "文件名称",
              fileDesc: "文件简介"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.initScroll();
  },
  methods: {
    initScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs["scroll-box"], {});
      });
    }
  }
};
</script>

<style lang="scss">
@import "./../../assets/scss/definedGlobalVar.scss";
@import "./../../assets/scss/definedFunction.scss";
.data-mange-page {
  .header {
    height: $title-height;
    background-color: $title-background-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 $left-right-margin;
    position: relative;
    z-index: 161;
    .time-box {
      width: 50px;
    }
    .search-box {
      width: 120px;
      @include horizontalVerticalCenter;
      background-color: white;
      & > input {
        width: calc(100% - 22px); /*no*/
        height: 25px; /*no*/
        padding: 0 10px; /*no*/
      }
    }
    .editor-box {
      width: 20px;
      text-align: center;
    }
  }
  .data-file-list-wrap {
    height: calc(100% - #{$title-height});
    .data-file-list {
      .day-list {
        .day-time-title {
          height: 15px;
          background-color: rgba(242, 242, 242, 1);
          padding: 0 $left-right-margin;
        }
        .day-file-list {
          .day-file {
            padding: 5px $left-right-margin + ($left-right-margin/3);
            border-bottom: 1px solid rgba(201, 201, 201, 1); /*no*/
            &:last-of-type {
              border: none;
            }
            .day-file-name {
              height: 20px;
              font-size: 10px;
            }
            .day-file-desc {
              height: 20px;
              font-size: 6px;
            }
          }
        }
      }
    }
  }
}
</style>
