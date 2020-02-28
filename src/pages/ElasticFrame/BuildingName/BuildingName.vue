<template>
  <div class="modal-backdrop">
    <div class="modal" >
      <div class="modal-header" align="center">
        <span>楼宇名称</span>
      </div>
      <div class="modal-areaName-body">
        <p style="float: left;font-size: 0px"><input v-model="buildingNameInput" style="width: 340px;font-size: 17px" placeholder="输入楼宇名称"/></p>
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
        buildingNameInput:''
      }
    },
    methods: {
      closeSelf() {
        this.$emit("closeme1");
      },
      confirm(){
        if(this.buildingNameInput==''){
          alert("输入楼宇名称不能为空")
          return
        }
        EventBus.$emit("getBuildingName",this.buildingNameInput);
      }
    }
  }
</script>
