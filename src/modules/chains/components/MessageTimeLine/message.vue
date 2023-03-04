<template>
  <el-card shadow="always" style="width:450px" :body-style="{ padding: '14px' }">
    <div slot="header">
      <img :src="false" class="image">
    </div>
    {{ message.template.text }}
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
