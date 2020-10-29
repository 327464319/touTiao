<template>
  <div class="my-container">
    <header>
      <div class="user-info-wrap" v-if="!token">
        <img src="../../assets/mobile.png" alt="" class="myIcon" />
        <span @click="logReg">登录 / 注册</span>
      </div>

      <div class="user-info-avatar" v-if="token">
        <div class="info-left">
          <div class="leftimg">
            <van-image :src="user.photo" round fit="cover">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
          <span>{{ user.name }}</span>
        </div>
        <div class="info-right">
          <van-button type="default" round class="rightBtn"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="user-info" v-if="token">
        <div class="data-item">
          <span>{{ user.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ user.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ user.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ user.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </header>
    <!-- grid宫格 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item icon="photo-o" text="收藏">
        <i slot="icon" class="iconfont iconshoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont iconlishi"></i>
      </van-grid-item>
    </van-grid>
    <!--cell单元格 页面导航 -->
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="小智同学" is-link to="" />
    <van-cell
      title="退出登录"
      clickable
      class="logout"
      v-if="token"
      @click="logout"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/user'
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    logReg () {
      this.$router.push('/login')
    },
    logout () {
      this.$dialog.confirm({
        title: '标题',
        message: '确定退出?'
      })
        .then(() => {
          // on confirm
          this.$store.commit('logOut')
        })
        .catch(() => {
          // on cancel
          this.$toast.success('已取消！')
        })
    }
  },
  computed: {
    ...mapState(['token'])
  },
  async created () {
    if (!this.token) return false
    const { data: res } = await getUser()
    if (res.message !== 'OK') return false
    this.user = res.data
  }
}
</script>

<style lang="scss" scoped>
.myIcon {
  width: 132px;
  height: 132px;
}
.user-info {
  display: flex;
  justify-content: space-around;

  .data-item {
    font-size: 36px;
    color: #ffffff;
    margin-top: 46px;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: Arial;
    span {
      &:last-child {
        font-size: 23px;
        font-family: MicrosoftYaHei;
      }
    }
  }
}
.user-info-avatar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-right {
  .van-button {
    margin-right: 33px;
  }
}
.info-left {
  width: 344px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftimg {
    margin-left: 32px;
    .van-image {
      border: 1px solid #ffffff;
    }
  }
  span {
    font-size: 30px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #ffffff;
  }
}
.rightBtn {
  width: 115px;
  height: 32px;
  background: #ffffff;
  border-radius: 16px;
  font-size: 20px;
  padding: 0;
}

.leftimg {
  width: 132px;
  height: 132px;
  .van-image {
    width: 132px;
    height: 132px;
  }
}
.iconshoucang {
  color: #eb5253;
  font-size: 45px;
}
.iconlishi {
  color: #ff9d1d;
  font-size: 45px;
}
.van-grid {
  margin-bottom: 9px;
}
.logout {
  margin-top: 9px;
}
.user-info-wrap {
  width: 132px;
  height: 132px;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  left: 311px;
  top: 148px;
  font-size: 28px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-content: center;
  img {
    margin-bottom: 13px;
  }
  span {
    width: 150px;
  }
}
.user-info-avatar {
  height: 132px;

  margin-top: 116px;
}
header {
  overflow: hidden;
}
</style>
