
<template>
  <div>
    <vuePickers :data="pickData"
                @cancel="cancel"
                @confirm="confirm"
                :showToolbar="true"
                :maskClick="false"
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
      let minData = []
      let maxData=[]
      for(var i=-5;i<=50;i++){
        minData.push({label:i,value:i})
      }
      for (var j=-5;j<=50;j++){
        maxData.push({label:j,value:j})
      }

      return {
        pickerVisible: true,
        pickData: [minData,maxData],
        result: ''
      }
    },
    methods: {
      cancel () {
        alert("aaaa")
        this.$emit("closeme");
        console.log('cancel')
        this.result = 'click cancel result: null'
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
