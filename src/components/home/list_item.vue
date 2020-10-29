<template>
  <div>
    <van-cell-group>
      <van-cell
        :to="{ name: 'articleRouter', params: { articleId: article.art_id } }"
      >
        <div slot="title" class="title van-multi-ellipsis--l2">
          {{ article.title }}
        </div>
        <div slot="label" class="label">
          <div v-if="article.cover.images.length === 3" class="top">
            <van-image
              v-for="(image, index) in article.cover.images"
              :key="index"
              fit="cover"
              :src="image"
            />
          </div>

          <div class="bottom">
            <span>{{ article.aut_name }}</span>
            <span> {{ article.comm_count }} 评论</span>
            <span>{{ article.pubdate | format() }}</span>
          </div>
        </div>

        <div
          slot="default"
          v-if="article.cover.images.length === 1"
          class="default"
        >
          <van-image
            fit="cover"
            :src="article.cover.images[0]"
            class="oneImg"
          />
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import '../../utils/dayjs'
export default {
  props: {
    article: {
      type: Object, required: true
    }
  },
  created () {

  }

}
</script>

<style lang="scss" scoped>
.oneImg {
  height: 146px;
  width: 232px;
}
::v-deep .van-cell__value {
  top: 23px;
  left: 23px;
}
::v-deep [class*="van-hairline"]::after {
  border: 0;
}
.title {
  font-size: 32px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #3a3a3a;
}
.label {
  .top {
    display: flex;
    .van-image {
      flex: 1;
      height: 146px;
      margin-bottom: 83px;
      margin-top: 29px;
    }
  }
}
::v-deep .van-cell__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bottom {
  font-size: 23px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999;
  span {
    margin-right: 24px;
  }
}
</style>
