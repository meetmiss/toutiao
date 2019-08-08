<template>
  <el-select clearable :value="value" @change="fn" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
    //   myValue: null,
      channelOptions: []
    }
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  },
  /* watch: {
    // if (!this.reqParams.channel_id) this.reqParams.channel_id = null
    'reqParams.channel_id': function (newVal, oldVal) {
      if (newVal === '') {
        this.reqParams.channel_id = null
      }
    }
  }, */
  created () {
    this.getChannelOptions()
  }
}
</script>

<style lang="less" scoped>
</style>
