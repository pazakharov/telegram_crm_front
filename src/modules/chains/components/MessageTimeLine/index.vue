<template>
  <div>
    <div class="board-column">
      <div class="board-column-header">
        <el-row :gutter="20">
          <el-col :span="20" :offset="0">
            Сообщения: {{ currentChain.title }}
          </el-col>
          <el-col :span="4" :offset="0"><AddMessage ref="addMessage" @new-message="onNewMessage" /></el-col>
        </el-row>
      </div>
      <el-card v-loading="loadingMessages" shadow="never" :body-style="{ padding: '15px' }" style="margin:10px;min-height:700px;max-height:700px;overflow-y: auto; overflow-x: hidden;">
        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="message in messages"
            :key="message.id"
            :timestamp="message.updated_at"
            placement="top"
            type="primary"
            size="normal"
          >
            <Message :message="message" @delete-message="onDeleteMessage" />
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddMessage from './addMessage.vue'
import Message from './message.vue'
export default {
  name: 'MessageTimeLine',
  components: { AddMessage, Message },
  data() {
    return {

    }
  },
  computed: {
    ...mapState('chains', [
      'loading',
      'loadingMessages',
      'currentChain',
      'chains',
      'messages'
    ])
  },
  watch: {
    currentChain: function() {
      this.updateMessages()
    }
  },

  mounted() {
  },

  methods: {
    ...mapActions({
      fetchMessages: 'chains/fetchMessages',
      createMessage: 'chains/createMessage',
      deleteMessage: 'chains/deleteMessage'
    }),
    updateMessages() {
      this.fetchMessages({ filter: { chain_id: this.currentChain.id }})
    },
    onNewMessage(data) {
      this.createMessage({ ...data, chain_id: this.currentChain.id })
        .then(() => {
          this.$refs.addMessage.resetForm()
          this.updateMessages()
        })
    },
    onDeleteMessage(message) {
      this.deleteMessage(message).then(
        this.updateMessages()
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 800px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #fff;
    color: #4A9FF9;
    border-radius: 3px 3px 0 0;
    border: solid 1px #f0f0f0 ;
    border-bottom: none;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      overflow: hidden;
      .support_buttons{
        color:#cac9c9;
      }
      .button_delete:hover{
        color:#fd6464;
      }
      .button_drag:hover{
        color:#64fd7d;
      }
    }
  }
}
</style>
