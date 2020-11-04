<template>
  <div class="profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <van-cell title="头像" is-link center @click="showPhotoPop">
      <van-image round fit="cover" :src="userInfo.photo"
    /></van-cell>
    <van-cell title="昵称" is-link @click="showNamePop">
      <span>{{ userInfo.name }}</span>
    </van-cell>
    <van-cell title="性别" is-link @click="showGenderPop">
      <span>{{ userInfo.gender === 0 ? "男" : "女" }}</span>
    </van-cell>
    <van-cell title="生日" is-link @click="showBirthDayPop">
      <span>{{ userInfo.birthday }}</span>
    </van-cell>
    <!-- 姓名修改弹出 -->
    <van-popup
      v-model="namePopShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="nameSetCancel"
        @click-right="nameSubmit"
      />
      <div style="padding: 0.26667rem">
        <van-field
          v-model="userInfo.name"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
        />
      </div>
    </van-popup>
    <!-- 性别Pop -->
    <van-popup v-model="genderPopShow" position="bottom">
      <van-picker
        ref="genderRef"
        title="修改性别"
        show-toolbar
        :default-index="userInfo.gender"
        :columns="columns"
        @confirm="genderSubmit"
        @cancel="genderSetCancel"
      />
    </van-popup>
    <!-- 出生日期 -->
    <van-popup v-model="birthDayPopShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="birthDaySetCancel"
        @confirm="birthDaySubmit"
      />
    </van-popup>
    <input
      type="file"
      name=""
      id=""
      ref="imgFileRef"
      @change="onFileChange"
      v-show="false"
    />

    <van-popup
      v-model="isPhotoPopShow"
      :style="{ height: '100%' }"
      v-if="isPhotoPopShow"
    >
      <user-profile-img
        :imgUrl="imgUrl"
        @photoSubmit="photoSubmit"
        @photoSetCancel="photoSetCancel"
      ></user-profile-img>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, setUserInfo } from '@/api/user.js'
import dayjs from 'dayjs'

import UserProfileImg from './UserProfileImg'
export default {
  name: 'userProfiel',
  components: {
    UserProfileImg
  },
  data () {
    return {
      userInfo: {},
      oldUserinfo: {},
      namePopShow: false,
      genderPopShow: false,
      columns: ['男', '女'],
      birthDayPopShow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      isPhotoPopShow: false,
      imgUrl: ''

    }
  },
  computed: {
    currentDate: {
      get: function () {
        return new Date(this.userInfo.birthday)
      },
      set: function (val) {
        // console.log(dayjs(val).format('YYYY-MM-DD'))
        this.userInfo.birthday = dayjs(val).format('YYYY-MM-DD')
      }
    }
  },
  created () {
    this.getInfo()
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getInfo () {
      try {
        const { data: res } = await getUserInfo()
        console.log('getInfo ->  res', res)
        this.userInfo = res.data
      } catch (e) {
        this.$toast.fail('获取数据失败！')
      }
    },
    async nameSubmit () {
      try {
        const { data: res } = await setUserInfo({ name: this.userInfo.name })
        this.userInfo.name = res.data.name
        this.namePopShow = false
      } catch (e) {
        this.$toast.fail('修改昵称失败！')
        this.userInfo = this.oldUserinfo
      }
    },
    showNamePop () {
      this.namePopShow = true
      this.oldUserinfo = { ...this.userInfo }
    },
    nameSetCancel () {
      this.namePopShow = false
      this.userInfo = this.oldUserinfo
    },
    showGenderPop () {
      this.genderPopShow = true
      // this.oldUserinfo = { ...this.userInfo }
    },
    genderSetCancel () {
      this.genderPopShow = false
      // this.userInfo = this.oldUserinfo
    },
    async genderSubmit () {
      try {
        await setUserInfo({ gender: this.$refs.genderRef.getIndexes()[0] })
        this.userInfo.gender = this.$refs.genderRef.getIndexes()[0]
        this.genderPopShow = false
      } catch (e) {
        this.$toast.fail('修改昵称失败！')
      }
    },
    showBirthDayPop () {
      this.birthDayPopShow = true
      this.oldUserinfo = { ...this.userInfo }
    },
    birthDaySetCancel () {
      this.birthDayPopShow = false
      this.userInfo = this.oldUserinfo
    },
    async birthDaySubmit () {
      try {
        await setUserInfo({ birthday: this.userInfo.birthday })
        this.birthDayPopShow = false
      } catch (e) {
        this.$toast.fail('修改昵称失败！')
      }
    },
    showPhotoPop () {
      this.$refs.imgFileRef.click()
    },
    photoSetCancel () {
      this.isPhotoPopShow = false
      this.imgUrl = ''
    },
    photoSubmit (even) {
      this.isPhotoPopShow = false
      this.userInfo.photo = even
      this.$toast.success('上传成功！')
    },
    onFileChange () {
      // console.log(this.$refs.imgFileRef.files[0])
      // console.log(window.URL.createObjectURL(this.$refs.imgFileRef.files[0]))
      // console.log(this.$refs.imgShowRef)
      // 点击图片van-cell，弹出file表单的点击事件，如果没有图片，直接返回，有图片，也就是this.$refs.imgFileRef.files.length不为0，就弹出图片pop框，然后给pop框的图片的src赋值，直接赋值会发生错误，所以这里的src属性绑定一个数据，然后修改的是这个data里面的这个数据，取消时，关闭popup，清空这个数据，避免下次修改图片，缺取消了后会有数据而导致的popup显示
      if (this.$refs.imgFileRef.files.length === 0) {
        return
      }
      this.isPhotoPopShow = true
      this.imgUrl = window.URL.createObjectURL(this.$refs.imgFileRef.files[0])
    }
  }

}
</script>

<style lang="scss" scoped>
.van-image {
  width: 60px;
  height: 60px;
}
::v-deep .van-popup {
  background-color: #f5f7f9;
  .van-nav-bar {
    background: #ffffff;
  }
  .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #323233;
    font-weight: 500;
    font-size: 0.42667rem;
  }
  .van-nav-bar__text {
    display: inline-block;
    margin: 0 -0.42667rem;
    padding: 0 0.42667rem;
    color: #1989fa !important;
    vertical-align: middle;
  }
  .van-field {
    padding: 0.26667rem;
  }
  .imgShow {
    width: 750px;
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
