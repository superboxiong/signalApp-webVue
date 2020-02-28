<template>
  <div class="overridePage">
    <div class="context">

      <div class="info">
        <span>室内信号测试填写</span>


      </div>

      <div class="geographical_position public">
<!--        <span>室内信号测试填写</span>-->
<!--        <img src="./../../assets/image/location.gif" style="heigth:5px;width: 5px">-->
<!--      </div>-->
      <mt-cell title="室内信号测试填写">
        <span>icon 是图片</span>
        <img slot="icon" src="./../../assets/image/location.gif" width="24" height="24">
      </mt-cell>
        <mt-cell title="室内信号测试填写" icon="more" value="带 icon"></mt-cell>
      </div>
      <div class="region_type public">
        <span>室内信号测试填写</span>

      </div>

      <div class="region_name public">
        <span>室内信号测试填写</span>

      </div>

      <div class="bulid_name public">
        <span>室内信号测试填写</span>

      </div>

      <div class="floor public">
        <span>室内信号测试填写</span>

      </div>

      <div class="test_type public">
        <span>室内信号测试填写</span>

      </div>


    </div>

  </div>

</template>

<script>
    export default {
        name: "OverrideTestPage"
    }
</script>

<style scoped>

  .overridePage{
    position: relative;
  }
  .context{
    padding: 5% 5%;
  }
  .public{
    padding-top: 10px;
    font-size: x-large;
    padding-bottom: 10px;
    border-bottom: 0.1px solid darkgrey;
  }
  .info{
    padding-top: 20px;
    color: darkgrey;
    border-bottom: 0.1px solid darkgrey;
  }

</style>
