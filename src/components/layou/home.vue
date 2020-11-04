<template>
  <div class="home-container">
    <van-nav-bar fixed />
    <div class="search" @click="search">
      <div>
        <i class="iconfont iconsousuo"></i>
        <span>搜索</span>
      </div>
    </div>

    <div class="footer">
      <van-tabs animated swipeable v-model="active" swipe-threshold="3">
        <van-tab v-for="item in channels" :key="item.id" :title="item.name">
          <home-list :aId="item.id"></home-list>
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div class="hambarger-btn" slot="nav-right" @click="showPopup">
          <i class="iconfont icongengduo"></i>
        </div>
      </van-tabs>
    </div>
    <!-- 汉堡弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <div class="content">
        <div class="wode">
          <div class="top">
            <span class="title">我的频道</span>
            <van-button
              type="default"
              color="red"
              round
              plain
              size="mini"
              @click="edit"
              >{{ isEdit ? "完成" : "编辑" }}</van-button
            >
          </div>
          <van-grid :gutter="10">
            <van-grid-item
              v-for="(value, index) in channels"
              :key="value.id"
              @click="setMyChannel(value.id, index)"
            >
              <van-icon
                slot="icon"
                name="clear"
                v-show="!fixedChanls.includes(index) && isEdit"
              />
              <span
                slot="text"
                class="van-grid-item__text text28"
                :class="index === active ? 'gridActive' : ''"
                >{{ value.name }}</span
              >
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 频道推荐 -->
        <div class="wode">
          <div class="top">
            <span class="title">频道推荐</span>
          </div>
          <van-grid :gutter="10" direction="horizontal">
            <van-grid-item
              v-for="value in recChannels"
              :key="value.id"
              icon="plus"
              :text="value.name"
              @click="delRecChannel(value)"
            />
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getChannels, getAllChannels, patchMyChannels, delMyChannel } from '@/api/user.js'
import List from '../home/list'

export default {
  data () {
    return {
      // 不能删除项，如推荐
      fixedChanls: [0],
      isEdit: false,
      active: 0,
      channels: [],
      allChannels: [],
      // 控制pop框
      show: false
    }
  },
  methods: {
    // 跳转search
    search () {
      this.$router.push('/search')
    },
    setMyChannel (id, index) {
      if (this.isEdit) {
        // 不能删除不允许删除的项
        if (this.fixedChanls.includes(index)) { return false }
        const delIndex = this.channels.findIndex((v) => {
          return v.id === id
        })
        this.channels.splice(delIndex, 1)
        if (this.active >= index) {
          this.active--
        }
      } else {
        this.active = index
        this.show = false
      }
      // 删除后数据持久化
      this.delMyChannels(id)
    },
    async delMyChannels (id) {
      if (this.$store.state.token) {
        try {
          await delMyChannel(id)
        } catch (e) {
          this.$toast.fail('删除频道失败！')
        }
      } else {
        window.localStorage.setItem('myChannels', JSON.stringify(this.channels))
      }
    },
    // 编辑状态切换
    edit () { this.isEdit = !this.isEdit },
    delRecChannel (value) {
      this.channels.push(value)
      this.patchMyChannels({ id: value.id, seq: this.channels.length })
    },
    // mychannels数据持久化
    async patchMyChannels (channel) {
      if (this.$store.state.token) {
        try {
          const { data: res } = await patchMyChannels([channel])
          console.log(res)
        } catch (e) {
          this.$toast.fail('添加失败！')
        }
      } else {
        window.localStorage.setItem('myChannels', JSON.stringify(this.channels))
      }
    },
    showPopup () {
      this.show = true
    },
    async getChannels () {
      // const { data: res } = await getChannels()

      // this.channels = res.data.channels
      // 如果有用户就去请求数据
      if (this.$store.state.token) {
        try {
          const { data: res } = await getChannels()
          this.channels = res.data.channels
        } catch (error) {
          this.$toast.fail('获取我的频道失败！')
        }
      } else { // 如果没有用户就先去本地存储找，没有再请求数据库默认数据
        if (window.localStorage.getItem('myChannels')) { this.channels = JSON.parse(window.localStorage.getItem('myChannels')) } else {
          try {
            const { data: res } = await getChannels()
            this.channels = res.data.channels
          } catch (error) {
            this.$toast.fail('获取我的频道失败！')
          }
        }
      }
    },
    async getAllChannels () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (e) {
        this.$toast.fail('获取全部列表失败！')
      }
    }

  },
  computed: {
    recChannels () {
      return this.allChannels.filter((allv) => {
        return !this.channels.find((v) => {
          return v.id === allv.id
        })
      })
    }
  },
  created () {
    this.getChannels()
    this.getAllChannels()
  },
  components: {
    'home-list': List
  }

}
</script>

<style lang="scss" scoped>
.placeholder {
  flex-shrink: 0;
  width: 72px;
  height: 84px;
}
.hambarger-btn {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  // top: 23px;
  right: 0px;
  width: 66px;
  height: 82px;
  background: #ffffff;
  opacity: 0.9;
  i {
    color: #333;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    width: 1px;
    height: 58px;
    background: url("../../assets/gradient-gray-line.png");
    background-size: contain;
  }
}
::v-deep .van-tab--active {
  font-size: 30px !important;
  color: #333333 !important;
}
::v-deep .van-tab {
  border-right: 1px solid #edeff3;
  border-bottom: 1px solid #edeff3;
  min-width: 200px;
  font-size: 28px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #777;
}

.search {
  position: fixed;
  top: 24px;
  left: 83px;
  width: 555px;
  height: 64px;
  background: #5babfb;
  border-radius: 32px;
  z-index: 1;
  div {
    position: absolute;
    left: 238px;
    top: 16px;
    width: 100px;
    display: flex;
    align-content: center;
    i {
      width: 32px;
      height: 32px;
      color: #ffffff;
    }
    span {
      width: 56px;
      height: 27px;
      font-size: 24px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.home-container {
  background: #ffffff;
}
::v-deep .van-tabs__line {
  bottom: 40px;
  width: 31px;
  height: 6px;
  background: #3296fa;
  border-radius: 3px;
}
::v-deep .van-tabs__wrap {
  position: fixed;
  top: 100px;
  z-index: 1;
  left: 0;
  right: 0;
}
.footer {
  padding-top: 188px;
}
::v-deep .content {
  padding-top: 109px;
  .title {
    margin-left: 24px;
  }
  .van-button {
    margin-right: 24px;
  }
  .wode {
    margin-bottom: 74px;
    .van-grid {
      margin-top: 45px;
      .van-grid-item__content {
        width: 156px;
        height: 84px;
        background: #f4f5f6;
        .van-icon-clear {
          position: absolute;
          top: -34px;
          right: -90px;
          z-index: 2;
          color: #bcbcbc;
        }
        .van-grid-item__icon {
          .van-icon-plus::before {
            font-size: 24px;
          }
          font-size: 24px;
        }
        .van-grid-item__text {
          font-size: 24px;
          color: #222;
          white-space: nowrap;
          margin-left: 6px;
        }
        .text28 {
          font-size: 28px;
        }
      }
    }
    .top {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 32px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #333333;
        line-height: 36px;
      }
      .van-button {
        width: 103px;
        height: 48px;
        font-size: 26px;
      }
    }
  }
}
.gridActive {
  color: red !important;
}
</style>
