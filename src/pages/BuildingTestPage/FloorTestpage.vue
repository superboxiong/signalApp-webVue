<template>
<div class="out_box">

  <div class="dialog_box" ref="dialog_box">
    <div class="dialog_win">

      <div style="text-align: center">
        <p>当前待测楼层未全部检测完成</p>
        <p>是否返回/保存？</p>
      </div>


        <button class="btn">保存</button>
        <button class="btn" @click="btn_return">返回</button>

    </div>
  </div>

  <div class="floor_test_page">
    <div class="header">
      <div class="return">
        <div>
          <img src="./../../assets/image/return.png" class="image">
        </div>
        <div class="text">
          <span>楼层测试</span>
        </div>
      </div>
      <div class="save" @click="save">保存</div>
    </div>

    <div class="floor">
      <div class="scroll" :style="height_width">

        <!--      <div class="floor_num" v-for="(index,num) in floor_count" :key="index" :class="{Even_numbers:index%2==0,odd_numbers:index%2!=0}" >-->
        <!--            {{index+1}}F-->
        <!--      </div>-->

        <div class="floor_num" v-for="(index,num) in floor_count" :key="index"
             :class="{selects:yes[index],not_selects:no[index]}" @click="selection(index)">
          {{index+1}}F
        </div>
        <div class="floor_num">
          -1F
        </div>
      </div>
    </div>

    <div class="inputNum" v-if="flag">
      <div class="inputNum_text">
        <div >
         测试次数
        </div>
        <input type="text"  class="t" v-model="floorNum"/>
        <div >
          次/层
        </div>
      </div>
      <button class="floor-test-start-button" @click="flag=!flag">开始测试</button>
    </div>

    <div v-else style="padding-top: 3%">
      <button class="floor-test-end-button" >结束检测</button>
      <SignalDisplayDownComponent/>
    </div>
  </div>




</div>
</template>

<script>
  import SignalDisplayDownComponent from "../../components/SignalDisplayDownComponent/SignalDisplayDownComponent";
    export default {
        name: "FloorTestpage",
        components: { SignalDisplayDownComponent },
        data() {
            return {
                height_width: {
                    height: '',
                    width: ''
                },
                floorNum: 0,
                count: [],
                yes: [],
                no: [],
                flag:true,
               finish:false,
                success:true,
                //view:false
            }
        },
        created() {
            this.hw()

        },
        methods: {
            hw() {
                this.height_width.height = window.innerHeight * 0.74 + 'px';
                this.height_width.width = (window.innerWidth *0.5) + 'px';
            },
            selection(index) {
                console.log('1111111111111'+this.yes.length)
                if (this.yes.length == 0 || this.no.length == 0) {
                    for (let i = 0; i < this.count.length; i++) {
                        this.yes.splice(i, 0, false)
                        this.no.splice(i, 0, true)
                    }

                        this.yes.splice(index, 1, true)
                        this.no.splice(index, 1, false)

                } else {
                    for (let i = 0; i < this.count.length; i++) {
                        this.yes.splice(index, 1, !this.yes[index])
                        this.no.splice(index, 1, !this.no[index])
                    }
                }
                console.log('yes['+index+']'+this.yes[index]+'=======no['+index+']'+this.no[index])
            },
            save(){
                if (this.finish==true){
                  this.$toast("正在保存")
                        if (this.success==true){
                            this.$toast("保存成功")
                        }
                }else {
                    this.$refs.dialog_box.style.cssText=' display: block';
                }
            },
            btn_return(){
                this.$refs.dialog_box.style.cssText=' display: none;';
            }


        },
        computed: {
            floor_count() {
                for (let i = 0; i < this.floorNum - 1; i++) {
                    this.count[i] = i
                }
                console.log(this.count)
                return this.count.reverse()
            }
        }


    }


</script>

<style lang="scss" scoped>
  @import "./../../assets/scss/definedFunction.scss";
  @import "./../../assets/scss/definedGlobalVar.scss";
.out_box{
  height: 100%;
  width: 100%;
  //position: absolute;
  .floor_test_page {
    /*height: 100%;*/
    /*width: 100%;*/
    z-index: 160;
    position: relative;
    .header {
      height: $title-height;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 $left-right-margin;
      background-color: $title-background-color;

      .return {
        display: inline;
        width: 70px;

        .image {
          float: left;
          width: 25px;
          height: 25px;
        }

        .text {
          float: left;
          margin-top: 6px;
        }
      }
    }

    .floor {
      // border: 1px solid red;
      position: relative;
      display: flex;
      justify-content: center;
     // z-index: 150;

      padding: 0 $left-right-margin;

      .scroll {
        //border: 1px solid darkgrey;
        // border: 1px solid black;
        overflow-y: auto;
        overflow-x: hidden;

        .floor_num {
          text-align: center;
          height: 20px;
          padding-top: 10px;
          border: 0.1px solid darkgrey;
        }

      }

    }

    .inputNum {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: $left-right-margin;
      height: 80px;

      .inputNum_text {

        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 3px;
        margin-left: 10%;
        margin-right: 10%;
        margin-bottom: 10px;
        background-color: darkgrey;

        .t {
          width: 50%;
          height: 23px;
          margin: 0;
          border: 1px solid darkgrey;
          float: left;
          text-align: center;
          font-size: 13px;
        }
      }

      .floor-test-start-button {
        width: 80%;
        height: 25px;
        border-radius: 3px;
        background-color: #cdcdcd;
        padding: 0;
        margin-left: 10%;
        margin-right: 10%;
        font-size: 12px;
        font-weight: 500;
        position: relative;
        z-index: 161;
      }
    }

    .floor-test-end-button {
      width: 100%;
      height: 30px;
      border-radius: 10px;
      background-color: #cdcdcd;
      padding: 0;
      margin: 0;
      font-size: 12px;
      font-weight: 500;
      position: absolute;
      bottom: 0px;
      z-index: 161;
    }
  }
  .dialog_box {
    position: absolute;
    display: none;
    z-index: 162;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.5);
    .dialog_win {
      opacity: 1;
      height: 30%;
      width: 80%;
      margin: 30% auto;
      background-color: white;
      border-radius: 20px;
      display: flex;
      justify-content: space-around;
      .btn{
        margin-top: 87px;
        height: 20%;
        width: 30%;
        background-color: darkgrey;
        border-radius: 5px
      }

    }
  }



}

  .Even_numbers {
    background-color: darkgrey;
  }

  .odd_numbers {
    background-color: white;
  }

  .selects {
    background-color: darkgrey;
  }

  .not_selects {
    background-color: white;
  }



</style>
