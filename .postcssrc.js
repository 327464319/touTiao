module.exports = {
  plugins: {
   
    'postcss-pxtorem': {
      rootValue ({ file }) {
      return file.indexOf('vant')===-1?75:37.5
      
      },
      propList: ['*'],
      // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
     exclude:'github-markdown'
    },
    
  },
};