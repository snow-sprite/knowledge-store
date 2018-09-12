const utils = {
  // 获取播放随机数
  getRandomItem (arr) {
    return Math.floor(Math.random() * (arr.length))
  },
  playOrPause () {
    try {
      let _domEle = document.querySelector('audio')
      if (_domEle.paused) {
        _domEle.play()
      } else {
        _domEle.pause()
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export default utils
