<template>
  <div>
    <el-form ref="form" size="mini" :model="form" :rules="rules" label-width="0" :inline="false">
      <el-form-item>
        <el-upload
          :multiple="true"
          :action="`${baseApi}/messages/upload`"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="uploads"
          :http-request="uploadRequest"
          list-type="picture-card"
        >
          <el-button size="small" type="primary">Click to upload</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="">
        <el-input v-model="form.text" type="textarea" rows="6" />
      </el-form-item>
      <el-collapse-transition>
        <el-row :gutter="0">
          <el-col :span="12" :offset="0">
            <el-checkbox v-model="form.compressImage" label="Сжать картинки" :indeterminate="false">Сжать картинки</el-checkbox>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-checkbox v-model="form.groupImage" label="Группировать картинки" :indeterminate="false">Группировать картинки</el-checkbox>
          </el-col>
        </el-row>
      </el-collapse-transition>
      <el-form-item>
        <el-button size="mini" @click="onCancel">Отмена</el-button>
        <el-button size="mini" type="primary" @click="onSubmit">Сохранить</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'AddMessageForm',
  data() {
    return {
      form: {
        text: null,
        compressImage: true,
        groupImage: true,
        shouldBePublishedAt: null
      },
      rules: {},
      uploads: [],
      uploadFileNames: []
    }
  },
  computed: {
    ...mapState('settings', [
      'baseApi'
    ])
  },
  mounted() {
    this.reset()
  },
  methods: {
    reset() {
      this.form = {
        text: null,
        compressImage: true,
        groupImage: true,
        shouldBePublishedAt: null
      }
      this.uploads = []
      this.uploadFileNames = []
    },
    onSubmit() {
      const data = {
        text: this.form.text,
        compress_image: this.form.compressImage,
        group_image: this.form.groupImage,
        files: this.uploadFileNames,
        should_be_published_at: this.form.shouldBePublishedAt,
        priority: 0
      }
      this.$emit('submit', { ...data })
    },
    onCancel() {
      this.$emit('cancel')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleUploadResponse(xhr, req) {
      console.log(this)
      if (xhr.status >= 200 && xhr.status < 300) {
        var response = JSON.parse(xhr.responseText)
        this.uploadFileNames.push(response.uploadedFile)
        console.log(response)
        req.onSuccess(xhr.responseText)
      } else {
        this.$message.error(xhr.responseText)
      }
    },
    uploadRequest(req) {
      const token = getToken()
      const xhr = new XMLHttpRequest()
      xhr.open('POST', req.action)
      xhr.withCredentials = req.withCredentials
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      console.log(this.files)
      xhr.onload = this.handleUploadResponse.bind(this, xhr, req)

      xhr.onerror = function() {
        req.onError(xhr.responseText)
      }

      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          req.onProgress(e.loaded, e.total)
        }
      }

      const formData = new FormData()

      if (req.data) {
        Object.keys(req.data).forEach(key => {
          formData.append(key, req.data[key])
        })
      }

      formData.append(req.filename, req.file)

      xhr.send(formData)
    }

  }

}
</script>

<style lang="scss" scoped>

</style>
