<template>
  <div class="save-page-box">
    <div class="title">
      <svg viewBox="0 0 1024 1024" width="22" height="22">
        <path
          d="M348.99379407 517.68945384l422.93654668-422.9437849c17.77417782-17.76259666 17.77417782-46.59388232 1e-8-64.35792663-17.76259666-17.77417782-46.59388232-17.77417782-64.35792664 0l-455.12057675 455.12347204c-17.77852076 17.76259666-17.77852076 46.59388232 0 64.35792662l455.1220244 455.12202442c8.88419362 8.88853654 20.53194038 13.33425247 32.17823949 13.33425246s23.29549351-4.44571592 32.17823949-13.33425246c17.77852076-17.76259666 17.77852076-46.59388232 0-64.35792664l-422.93944197-422.94523255z"
          fill="#515151"
          p-id="12226"
        ></path>
      </svg>
      <span>楼宇测试</span>
    </div>
    <div class="save-info-box">
      <div class="save-tag-rows">
        <div class="save-tag">楼层窜测测试生成文件</div>
      </div>

      <div class="save-tag-rows">
        <div class="save-tag-name">文件命名</div>
        <div class="save-tag-input">
          <input type="text">
        </div>
        <div class="save-tag-icon">
          <svg viewBox="0 0 1024 1024" p-id="12360" width="22" height="22">
            <path
              d="M886.4 441.6c-32 0-54.4 22.4-54.4 54.4v329.6c0 32-25.6 57.6-57.6 57.6h-576c-32 0-57.6-25.6-57.6-57.6v-576c0-32 25.6-57.6 57.6-57.6h358.4c32 0 54.4-22.4 54.4-54.4s-22.4-54.4-54.4-54.4H198.4C108.8 83.2 35.2 160 35.2 249.6v576c0 89.6 73.6 166.4 166.4 166.4h576c89.6 0 166.4-73.6 166.4-166.4V496c-3.2-28.8-25.6-54.4-57.6-54.4z"
              fill="#333333"
              p-id="15152"
            ></path>
            <path
              d="M972.8 51.2c-22.4-22.4-54.4-22.4-73.6 0L422.4 528c-22.4 22.4-22.4 54.4 0 73.6 9.6 9.6 25.6 16 38.4 16 9.6 0 25.6-6.4 38.4-16L972.8 124.8c22.4-22.4 22.4-54.4 0-73.6z"
              fill="#333333"
              p-id="15153"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="save-button-box">
      <button>保存并返回</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FloorSavePage"
    }
</script>

<style lang="scss" scoped>
  .save-page-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: column;
  .title {
    width: 100%;
    display: flex;
    height: 25px;
    padding: 5px 0;
    justify-content: left;
    align-items: center;
    background-color: #6b6b6b;
  svg {
    width: 25px;
  }

  }
  .save-info-box {
    width: 100%;
    height: calc(100% - 60px - 50px);
  .save-tag-rows {
    width: calc(100% - 20px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    margin: 0 10px;
    border-bottom: 1px solid #e3e3e3;
    .save-tag{
      padding-top: 30px;
      color: darkgrey;
    }
  .save-tag-name {

    flex: 1;
  }
  .save-tag-input {
    flex: 3;
  input {
    width: 90%;
    padding: 0 10px;
    font-size: 16px;
  }
  }
  .save-tag-value {
    flex: 1;
  }
  }
  }
  .save-button-box {
    width: calc(100% - 20px);
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  button {
    width: calc(100% - 20px);
    height: 25px;
    border-radius: 3px;
    padding: 3px 0;
    background-color: rgba(201, 201, 201, 1);
  }
  }
  }

</style>
