const utils = {
  parseException (result) {
    // 判断异常结果信息
    let status, errorData, response

    try {
      response = result.response
      errorData = response.statusText
      status = response.status
      errorData = JSON.parse(errorData)
    } catch (e) {
      status = 500
    }

    // 打印错误的log信息
    console.log(result)

    let message = ''
    if (status >= 500) {
      message = '服务器暂时无法响应您的请求，请稍后再试'
    } else if (status === 401) {
      message = errorData.message
    } else if (status === 402) {
      message = '您无权限访问该页面'
    } else if (status === 403) {
      message = errorData.message
    } else if (status === 404) {
      message = '没有找到该链接'
    } else {
      message = '服务器无法连接，请稍后再试'
    }

    return {message, status}
  },
  generateRandomMixed (n) {
    var chars = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    var res = ''
    for (var i = 0; i < n; i++) {
      var id = this.generateRandomNum(35)
      res += chars[id]
    }
    return res
  },
  generateRandomNum (n) {
    return Math.ceil(Math.random() * n)
  },
  rc4Cipher (key, buf) {
    return this.cipher('rc4', key, buf)
  },
  rc4Decipher (key, encrypted) {
    return this.decipher('rc4', key, encrypted)
  },
  cipher (algorithm, key, buf) {
    var encrypted = ''
    var cip = crypto.createCipher(algorithm, key)
    encrypted += cip.update(buf, 'binary', 'hex')
    encrypted += cip.final('hex')
    return encrypted
  },
  decipher (algorithm, key, encrypted) {
    var decrypted = ''
    var decipher = crypto.createDecipher(algorithm, key)
    decrypted += decipher.update(encrypted, 'hex', 'binary')
    decrypted += decipher.final('binary')
    return decrypted
  },
  mnemonicRandomInputs (mnemonic, num) {
    var arr = []
    var arr2 = []
    for (var i = 0; i < mnemonic.length; i++) {
      var input = Math.ceil(Math.random() * (mnemonic.length - 1))
      arr.push(input)
    }
    for (var j = 0; j < arr.length; j++) {
      if (arr2.indexOf(arr[j]) === -1) {
        arr2.push(arr[j])
      }
    }
    let res = arr2.splice(0, 3)
    return res
  },
  // 获取当前域名
  getCurrentDomain () {
    return `${window.location.protocol}//${window.location.host}`
  },
  commentView () {
    setTimeout(function () {
      let commentArea = document.querySelector('.publish_com')
      // commentArea.scrollIntoView(true)
      // commentArea.scrollIntoViewIfNeeded()
      commentArea.style.bottom = `20px`
    }, 200)
  },
  commentViewCancel () {
    let commentArea = document.querySelector('.publish_com')
    commentArea.style.bottom = '0px'
  },
  commentShow () {
    let commentArea = document.querySelector('.publish_com')
    commentArea.onfocus = function () {
      setTimeout(function () {
        if (document.body.scrollTop) {
          document.body.scrollTop = document.body.scrollHeight
        } else {
          document.documentElement.scrollTop = document.documentElement.scrollHeight
        }
      }, 300)
    }
  },
  isIOS () {
    var userAgent = window.navigator.userAgent
    return userAgent.toLowerCase().indexOf('iphone') >= 0 || userAgent.toLowerCase().indexOf('ipad') >= 0
  },
  chunk (data) {
    let result = []
    for (var i = 0, len = data.length; i < len; i += 4) {
      result.push(data.slice(i, i + 4))
    }
    return result
  },
  compare (property) {
    return function (a, b) {
      let value1 = a[property]
      let value2 = b[property]
      return value2 - value1
    }
  },
  coppyArray (arr) {
    return arr.map((e) => {
      if (typeof e === 'object') {
        return Object.assign({}, e)
      } else {
        return e
      }
    })
  },
  getUrlQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = decodeURI(window.location.search.substr(1)).match(reg)
    if (r != null) {
      return unescape(r[2])
    } else {
      return null
    }
  },
  toLogin () {
    let newPage = window.open('', '_self')
    newPage.location.href = '/login'
  }
}

export default utils
