<template>
  <div>
    <el-button type="primary" size="mini" @click="showForm = true">
      Добавить сообщение
    </el-button>
    <el-dialog
      title=""
      :visible.sync="showForm"
      width="600px"
    >
      <addMessageForm ref="MessageForm" @cancel="showForm = false" @submit="onSubmit" />
    </el-dialog>

  </div>
</template>

<script>
import addMessageForm from './addMessageForm.vue'
export default {
  name: 'AddMessage',
  components: { addMessageForm },
  data() {
    return {
      showForm: false
    }
  },

  mounted() {

  },

  methods: {
    onSubmit(data) {
      this.$emit('new-message', data)
      this.showForm = false
    },
    resetForm() {
      this.$refs.MessageForm.reset()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
