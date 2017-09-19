class Tools {
  static timeout(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1)
            } catch (e) {
                reject(0)
            }
        }, delay)
    })
  }

  /**
   * [TimeTools description]
   * @param {[type]} timestamp   2017-09-09
   * @param {[type]} formatStr Y年M月D日
   *
   * M: month 1~12
   * Y: year 2017
   * D: date 0 ~ 31
   */
  static moment(timestamp, formatStr) {
    let date = new Date(timestamp)

    let M = date.getMonth() + 1

    let Y = date.getFullYear()

    let D = date.getDate()

    return formatStr.replace('M', M).replace('Y', Y).replace('D', D)
  }
}

module.exports = Tools;
