<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="头条新闻"
      @click-left="back"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleDatil.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDatil.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDatil.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleDatil.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleDatil.pubdate | format }}
          </div>
          <!-- 这里是自己定义的关注按钮 -->
          <attention-button
            class="follow-btn"
            :is_followed="articleDatil.is_followed"
            :followed_id="articleDatil.aut_id"
            @setIsFollowed="articleDatil.is_followed = $event"
          ></attention-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="contentRef"
          class="article-content markdown-body"
          v-html="articleDatil.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" info="123" color="#777" />
          <my-collect
            v-model="articleDatil.is_collected"
            :followed_id="articleDatil.art_id"
          ></my-collect>
          <my-liking
            v-model="articleDatil.attitude"
            :followed_id="articleDatil.art_id"
          ></my-liking>
          <van-icon name="share" color="#777777" @click="share"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getDatil">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleDatil } from '@/api/article.js'
import { ImagePreview } from 'vant'
import attention from '../mycomponent/attention'
import collect from '../mycomponent/collect'
import liking from '../mycomponent/liking'

export default {

  components: {
    'attention-button': attention,
    'my-collect': collect,
    'my-liking': liking

  },
  props: {
    articleId: {
      // 加载log显示
      loading: false,
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      // 错误模块显示
      status: 0,
      // 加载log显示
      loading: false,
      articleDatil: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDatil()
  },
  mounted () {

  },
  methods: {
    share () {
      this.$toast.fail('该功能尚未开发!')
    },
    back () {
      this.$router.push('/home')
    },
    async  getDatil () {
      this.loading = true
      try {
        // if (Math.random() > 0.5) {
        //   JSON.parse('11111a')
        // }
        const { data: res } = await getArticleDatil(this.articleId.toString())
        console.log(res)
        const images = []

        setTimeout(() => {
          const imgs = this.$refs.contentRef.querySelectorAll('img')

          imgs.forEach((v, i) => {
            images.push(v.src)
            v.addEventListener('click', function () {
              ImagePreview({
                images,
                startPosition: i,
                closeable: true
              })
            })
          })
        }, 0)

        this.articleDatil = res.data
      } catch (e) {
        console.log(e)
        if (e.response?.status === 404) {
          this.status = 404
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      ::v-deep p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
