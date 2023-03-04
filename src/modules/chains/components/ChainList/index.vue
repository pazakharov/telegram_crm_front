<template>
  <div class="board-column">
    <div class="board-column-header">
      <el-row :gutter="20">
        <el-col :span="20" :offset="0">Цепочки сообщений</el-col>
        <el-col :span="4" :offset="0">
          <el-button v-loading="loading" title="Добавить цепочку" type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="addChain" /></el-col>
      </el-row>
    </div>
    <draggable
      :list="chains"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
      handle=".handle"
    >
      <div v-for="chain in chains" :key="chain.id" class="board-item" @click="setCurrentChain(chain)">
        <el-row :gutter="0">
          <el-col :span="20" :offset="0">
            <div v-if="!chain.edit" @dblclick="chain.edit = true">
              {{ chain.title }}
            </div>
            <div v-if="chain.edit">
              <el-row :gutter="0">
                <el-col :span="20" :offset="0"> <el-input v-model="chain.title" size="mini" /></el-col>
                <el-col :span="4" :offset="0"><el-button style="margin-left: 5px;" type="primary" size="mini" @click="updateChain(chain)">OK</el-button></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="3" :offset="0">
            <el-popconfirm
              title="Удалить?"
              confirm-button-text="ok"
              cancel-button-text="cancel"
              confirm-button-type="primary"
              cancel-button-type="text"
              icon="el-icon-question"
              icon-color="#f90"
              :hide-icon="false"
              @onConfirm="deleteChain(chain)"
            >
              <i slot="reference" class="el-icon-delete support_buttons button_delete" />
            </el-popconfirm>

          </el-col>
          <el-col :span="1" :offset="0">
            <i class="el-icon-menu handle button_drag support_buttons" />
          </el-col>

        </el-row>

      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ChainList',
  components: {
    draggable
  },
  data() {
    return {
      options: { }
    }
  },
  computed: {
    ...mapState('chains', [
      'loading',
      'currentChain',
      'chains'
    ])
  },
  mounted() {
    this.fetch()
  },
  methods: {
    ...mapActions(
      {
        fetch: 'chains/fetch',
        create: 'chains/create',
        delete: 'chains/delete',
        update: 'chains/update',
        setCurrentChain: 'chains/setCurrentChain'
      }
    ),
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
      console.log(dataTransfer)
    },
    addChain() {
      this.create().then(
        () => this.fetch()
      )
    },
    deleteChain(chain) {
      this.delete(chain).then(
        () => this.fetch()
      )
    },
    updateChain(chain) {
      chain.edit = false
      this.update(chain).then(
        () => this.fetch()
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
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

