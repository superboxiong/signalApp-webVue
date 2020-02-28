<template>
  <div class="modal-backdrop">
    <div class="modal" >
      <div class="modal-header" align="center">
        <span>楼层详情</span>
      </div>
      <div class="modal-areaName-body">
        <p style="float: left;font-size: 0px"><input v-model="buildingMessageInput" style="width: 340px;font-size: 17px" placeholder="请填写楼层与户号"/></p>
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
        buildingMessageInput:''
      }
    },
    methods: {
      closeSelf() {
        this.$emit("coverTest");
      },
      confirm(){
        EventBus.$emit("getBuildingMessage",this.buildingMessageInput);
      }
    }
  }
</script>
