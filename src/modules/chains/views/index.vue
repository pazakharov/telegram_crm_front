<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" style="padding:20px"><chain-list /></el-col>
      <el-col :span="18" :offset="0" style="padding:20px"><message-time-line /></el-col>
    </el-row>
  </div>
</template>

<script>
import ChainList from '../components/ChainList'
import MessageTimeLine from '../components/MessageTimeLine'

export default {
  name: 'Chains',
  components: { ChainList, MessageTimeLine },
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>
