<template>
  <el-card shadow="always" style="width:450px" :body-style="{ padding: '0px' }">
    <img v-for="imageFile in imagesFiles" :key="imageFile.id" :src="imageFile.webPath" class="image">
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

    }
  },
  computed: {
    imagesFiles() {
      const images = this.message.template.messageTemplateFiles.filter(
        (item) => ['jpg', 'png'].includes(item.file_extension)
      )
      return images
    }
  },
  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.image {
    width: 100%;
    display: block;
  }
</style>
