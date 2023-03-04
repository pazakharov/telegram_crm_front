<template>
  <el-card shadow="always" style="width:450px" :body-style="{ padding: '0px' }">
    <div slot="header" style="display: flex;flex-direction: row-reverse;">
      <el-popconfirm
        title="Удалить пост?"
        confirm-button-text="Удалить"
        cancel-button-text="Отмена"
        confirm-button-type="primary"
        cancel-button-type="text"
        icon="el-icon-question"
        icon-color="#f90"
        :hide-icon="false"
        @onConfirm="onDeleteMessage"
      >
        <i slot="reference" class="el-icon-delete" />
      </el-popconfirm>

    </div>
    <img v-for="imageFile in imagesFiles" :key="imageFile.id" :src="imageFile.webPath" class="image">
    <div v-for="file in noImagesFiles" :key="file.id" class="file_link">
      <a :href="file.webPath">
        <b> {{ file.original_file_name }} </b>
      </a>
    </div>
    <div style="padding: 14px;">
      {{ message.template.text }}
    </div>
  </el-card>

</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageExtensions: ['jpg', 'png', 'gif']
    }
  },
  computed: {
    imagesFiles() {
      const files = this.message.template.messageTemplateFiles.filter(
        (item) => this.imageExtensions.includes(item.file_extension)
      )
      return files
    },
    noImagesFiles() {
      const images = this.message.template.messageTemplateFiles.filter(
        (item) => !this.imageExtensions.includes(item.file_extension)
      )
      return images
    }
  },
  mounted() {

  },

  methods: {
    onDeleteMessage() {
      this.$emit('delete-message', this.message)
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    width: 100%;
    display: block;
  }
  .file_link {
    padding: 7px 0 0 10px;
  }
</style>
