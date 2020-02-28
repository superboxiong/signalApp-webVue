<template>
  <div class="modal-backdrop">
    <div class="modal" >
      <div class="modal-header" align="center">
       <span>区域名称</span>
      </div>
      <div class="modal-areaName-body">
        <p style="float: left;font-size: 0px"><input v-model="areaName" style="width: 340px;font-size: 17px" placeholder="输入区域名称"/></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <button type="button" class="btn-confirm" @click="confirm">确认</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
  @import "../../../assets/css/modal.css";
</style>

<script>
  import { EventBus } from "../../eventBus/event-bus.js";
  export default {
    name: 'Modal',
    props: {

    },
    data() {
      return {
        areaName:''
      }
    },
    methods: {
      closeSelf() {
        this.areaName=''
        this.$emit("closeme");
      },
      confirm(){
        if(this.areaName==''){
          alert("输入区域名称不能为空")
          return
        }
        EventBus.$emit("getAreaName",this.areaName);

      }
    }
  }
</script>
