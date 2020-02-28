
<template>
  <div>
    <vuePickers :data="pickData"
                @cancel="cancel"
                @confirm="confirm"
                :showToolbar="true"
                :maskClick="false"
                :defaultIndex="1"
                :visible.sync="pickerVisible"/>
  </div>
</template>

<script>
  import vuePickers from 'vue-pickers'
  export default {
    components: {
      vuePickers
    },
    data () {
      let tdata = []
        tdata.push({label:"商业楼宇",value:1},{label:"学校校区",value:2},{label:"住宅小区",value:3},{label:"酒店宾馆",value:4},{label:"事业单位",value:5},)

      return {
        pickerVisible: true,
        pickData: [ tdata ],
        result: ''
      }
    },
    methods: {
      cancel:function (){
        this.$emit("closeme4");
      },
      confirm (res) {
        this.result = JSON.stringify(res)
        console.log("aaaaaaaaaaaaaaa")
        console.log(res[0].value)
        console.log("aaaaaaaaaaaaaaaa")
      }
    },
  }
</script>
