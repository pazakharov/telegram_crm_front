<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" style="padding:20px"><chain-list /></el-col>
      <el-col :span="18" :offset="0">сообщения</el-col>
    </el-row>
  </div>
</template>

<script>
import ChainList from '../components/ChainList'

export default {
  name: 'Chains',
  components: { ChainList },
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
