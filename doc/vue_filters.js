import Vue from 'vue'

// 时间格式化
Vue.filter('formatTime', (value) => {
  let now
  let oldTime
  let difference
  let result
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let month = day * 30
  let year = month * 12

  now = new Date().getTime()
  if (typeof value === 'string' && value.indexOf('-') > 0) {
    value = value.replace(/-/g, '/')
    oldTime = new Date(value).getTime()
  } else {
    oldTime = value * 1000
  }
  difference = now - oldTime

  let _year = difference / year
  let _month = difference / month
  let _week = difference / (7 * day)
  let _day = difference / day
  let _hour = difference / hour
  let _min = difference / minute

  if (_year >= 1) {
    result = ~~_year + ' 年前'
  } else if (_month >= 1) {
    result = ~~_month + ' 月前'
  } else if (_week >= 1) {
    result = ~~(_week) + ' 星期前'
  } else if (_day >= 1) {
    result = ~~_day + ' 天前'
  } else if (_hour >= 1) {
    result = ~~_hour + ' 小时前'
  } else if (_min >= 1) {
    result = ~~(_min) + ' 分钟前'
  } else {
    result = ' 刚刚'
  }

  return result
})

Vue.filter('formatAvatarSrc', (value) => {
  // 判断图片连接开头没有/的情况
  if (value && value.indexOf('http') < 0 && value.substr(0, 1) !== '/') {
    value = `/${value}`
    // 判断是否带static
    if (value.substr(0, 7) === '/static') {
      value = `https://resource.jinse.com${value.substr(7)}`
    }
  }

  return value
})

// 处理千分位
Vue.filter('formatThousands', (value = '0', currencyType = '') => {
  let res
  res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return res
})

// 处理货币
Vue.filter('formatCurrency', (value = '0', currencyType = '') => {
  let res
  if (value.toString().indexOf('.') === -1) {
    res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.00'
  } else {
    let prev = value.toString().split('.')[0]
    let next = value.toString().split('.')[1] < 10 ? value.toString().split('.')[1] + '0' : value.toString().split('.')[1]
    res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + next
  }
  return currencyType + res
})

// 保留小数点(会四舍五入)
Vue.filter('toFixed', (value, pos) => {
  // 小数点不够要用0补齐
  value = parseFloat(value)
  if (!value) {
    return value
  }

  return value.toFixed(pos)
})

// 获取时间中的月
Vue.filter('formatTimeGetMounth', (value) => {
  let time
  if (typeof value === 'string' && value.indexOf('-') > 0) {
    value = value.replace(/-/g, '/')
    time = new Date(value).getTime()
  } else {
    time = value * 1000
  }
  let date = new Date(time)
  return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
})

// 获取时间中的日
Vue.filter('formatTimeGetDay', (value) => {
  let time
  if (typeof value === 'string' && value.indexOf('-') > 0) {
    value = value.replace(/-/g, '/')
    time = new Date(value).getTime()
  } else {
    time = value * 1000
  }
  let date = new Date(time)
  return date.getDate()
})

// 获取时间中的星期
Vue.filter('formatTimeGetWeek', (value) => {
  let time
  if (typeof value === 'string' && value.indexOf('-') > 0) {
    value = value.replace(/-/g, '/')
    time = new Date(value).getTime()
  } else {
    time = value * 1000
  }
  let date = new Date(time)
  switch (date.getDay()) {
    case 0: return '星期日'
    case 1: return '星期一'
    case 2: return '星期二'
    case 3: return '星期三'
    case 4: return '星期四'
    case 5: return '星期五'
    case 6: return '星期六'
  }
})

// 获取时间中的小时和分钟
Vue.filter('formatTimeGetHAndM', (value) => {
  let time
  if (typeof value === 'string' && value.indexOf('-') > 0) {
    value = value.replace(/-/g, '/')
    time = new Date(value).getTime()
  } else {
    time = value * 1000
  }
  let date = new Date(time)
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return hour + ':' + min
})

// 获取月份
Vue.filter('getMonth', (value) => {
  if (value) {
    value = new Date(value.toString()).getMonth() + 1
  }
  return value
})
// 获取日期
Vue.filter('getDate', (value) => {
  if (value) {
    value = new Date(value.toString()).getDate()
  }
  if (value < 10) {
    value = '0' + value
  }
  return value
})
// 获取“昨天”日期
Vue.filter('getDay', (value) => {
  if (value) {
    let tempValue = value.replace(/-/g, '/')
    var oldTime = new Date(tempValue).getTime() / (1000 * 3600 * 24)

    var y = new Date().getFullYear()
    var m = new Date().getMonth() + 1
    var d = new Date().getDate()

    var tempNewDate = y + '/' + m + '/' + d + ' ' + '00:00'
    var time = new Date(tempNewDate).getTime() / (1000 * 3600 * 24)

    if (time - oldTime > 0 && time - oldTime <= 1) {
      value = '昨天'
    } else if (time - oldTime <= 0) {
      value = '今天'
    } else {
      value = ''
    }
  }
  return value
})

// 获取星期
Vue.filter('getWeek', (value) => {
  if (value) {
    var oneDay = 1000 * 3600 * 24
    var time = new Date().getTime()
    var oldTime = new Date(value.toString()).getTime()
    if (time - oldTime > 0 && time - oldTime > oneDay) {
      let tempVal = new Date(value.toString()).getDay()
      switch (tempVal) {
        case 0:
          value = '星期日'
          break
        case 1:
          value = '星期一'
          break
        case 2:
          value = '星期二'
          break
        case 3:
          value = '星期三'
          break
        case 4:
          value = '星期四'
          break
        case 5:
          value = '星期五'
          break
        case 6:
          value = '星期六'
          break
      }
    } else {
      let tempVal = new Date(value.toString()).getDay()
      switch (tempVal) {
        case 0:
          value = '星期日'
          break
        case 1:
          value = '星期一'
          break
        case 2:
          value = '星期二'
          break
        case 3:
          value = '星期三'
          break
        case 4:
          value = '星期四'
          break
        case 5:
          value = '星期五'
          break
        case 6:
          value = '星期六'
          break
      }
    }
  }
  return value
})

// 将时间戳转 小时分钟
Vue.filter('timestampFormate', (value) => {
  var hour = new Date(value * 1000).getHours()
  var minute = new Date(value * 1000).getMinutes()
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  value = hour + ':' + minute
  return value
})

// 将时间戳转 年月日
Vue.filter('timeGetYearMonthDate', (value) => {
  var myDate = new Date(value * 1000)
  var Y = myDate.getFullYear() + '.'
  var M = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1 + '.') : myDate.getMonth() + 1 + '.')
  var D = myDate.getDate()
  // var h = myDate.getHours() + ':'
  // var m = myDate.getMinutes() + ':'
  // var s = myDate.getSeconds()
  return Y + M + D
})

// 将时间戳转 月日
Vue.filter('timeGetMonthDate', (value) => {
  var myDate = new Date(value * 1000)
  var M = (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1 + '.') : myDate.getMonth() + 1 + '.')
  var D = myDate.getDate()
  return M + D
})
