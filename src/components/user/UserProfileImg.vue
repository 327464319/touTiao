<template>
  <div class="imgShowContain">
    <img :src="imgUrl" ref="imgShowRef" class="imgShow" />

    <div class="footer">
      <span @click="photoSetCancel">取消</span>
      <span @click="submit">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { setUserPhoto } from '@/api/user.js'

export default {
  props: {
    imgUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      cropper: ''
    }
  },
  methods: {
    photoSetCancel () {
      this.$emit('photoSetCancel')
    },
    submit () {
      this.cropper.getCroppedCanvas()

      this.cropper.getCroppedCanvas({
        width: 160,
        height: 90,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high'
      })

      // Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`.
      // The default value for the second parameter of `toBlob` is 'image/png', change it if necessary.
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData()

        // Pass the image file name as the third parameter if necessary.
        formData.append('photo', blob/*, 'example.png' */)
        try {
          this.$toast.loading({
            message: '上传中...',
            forbidClick: true
          })
          const { data: res } = await setUserPhoto(formData)
          console.log(res.data.photo)
          this.$emit('photoSubmit', res.data.photo)
        } catch (e) {
          this.$toast.fail('上传图片失败！')
        }
        // Use `jQuery.ajax` method for example
      }/*, 'image/png' */)
      // -------------------
    }
  },
  mounted () {
    // console.log('settimeout')
    // console.log(this.$refs.imgShowRef)
    const image = this.$refs.imgShowRef
    const cropper = new Cropper(image, {
      aspectRatio: 1,
      autoCropArea: 1,
      dragMode: 'move',
      viewMode: 1,
      background: false,
      cropBoxMovable: false,
      cropBoxResizable: false
    })
    this.cropper = cropper
  }

}
</script>

<style lang="scss" scoped>
.imgShowContain {
  position: relative;
  width: 750px;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .footer {
    position: absolute;
    color: #ffffff;
    font-size: 30px;
    width: 700px;
    display: flex;
    justify-content: space-between;
    bottom: 20px;
    left: 25px;
  }
}
</style>
