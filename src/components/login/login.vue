<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      @click-left="onClickLeft"
      left-arrow
    />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="验证码"
        :rules="userRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="right-icon" class="shuxian"></i>
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss 秒后重发"
            v-if="isCount"
            @finish="countFinish"
            class="daojishi"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            class="yanzhengma"
            native-type="button"
            @click="onVerify"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login">
        <van-button block type="info" native-type=" submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  data () {
    return {
      isCount: false,
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userRules: {
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确手机号' }],
        code: [{ required: true, message: '请填写验证码' }, {
          pattern: /\d{6}/, message: '验证码需要6位'
        }]
      }

    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 倒计时结束
    countFinish () {
      this.isCount = false
    },
    // 短信验证
    async onVerify () {
      try { await this.$refs.loginForm.validate('mobile') } catch (e) {
        return false
      }
      this.isCount = true
      try {
        await getSmsCode(this.user.mobile)
      } catch (e) {
        if (e.response.status === 429) {
          this.$toast.fail('发送太频繁了！')
        }
      }
    },
    // 登录
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login(this.user)
        this.$store.commit('setToken', res.data)

        this.$toast.success('登录成功！')
        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) return this.$toast.fail('账号或验证码出错！')
        this.$toast.fail('登录失败！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-field__error-message {
  position: absolute;
  right: 210px;
  top: 0px;
}
// .van-cell {
//   height: 91px;
// }
.login {
  margin: 53px 28px 0 28px;
  font-size: 29px;
  .van-button--info {
    background: #6db4fb;
    border: 0.02667rem solid #56b3f5;
  }
}
.yanzhengma,
.daojishi {
  background: #ededed;
  border: 0;
  width: 152px;
  height: 46px;
  border-radius: 23px;
  font-size: 22px;
  color: #666666;
  text-align: center;
  line-height: 50px;
}
.shuxian {
  display: block;
  width: 2px;
  background: #eee;
  height: 46px;
  position: absolute;
  top: 0;
  right: 176px;
}
.iconfont {
  margin-right: 20px;
}
</style>
