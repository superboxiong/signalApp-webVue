
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
      let tdata = []
      tdata.push({label:"预设路径",value:1},{label:"传感器",value:2})

      return {
        pickerVisible: true,
        pickData: [ tdata ],
        result: ''
      }
    },
    methods: {
      cancel () {
        this.$emit("closeme4");
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
