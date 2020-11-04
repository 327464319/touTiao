import dayjs from 'dayjs'
import vue from 'vue'
import 'dayjs/locale/zh-cn' // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用
vue.filter('format', (date) => {
  return dayjs().from(dayjs(date))
})
vue.filter('formDate', (val) => {
  return dayjs(val).format('YYYY-MM-DD')
})
