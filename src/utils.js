const CONSTANTS = require('./constants')

/**
 * 校验手机号格式
 *
 * @param {String} phone
 * @return {Object}
 */
function validatePhone(phone) {
  return CONSTANTS.REG_PHONE.test(phone)
}

/**
 * 校验身份证号
 *
 * @param {String} idNo
 * @return {Object}
 */
function validateIdNo(idNo) {
  let valid = false

  if (idNo.length === 15) {
    valid = CONSTANTS.REG_IDNO_15.test(idNo)
  } else {
    valid = CONSTANTS.REG_IDNO_18.test(idNo)
    if (valid) {
      // 校验码
      const vs = CONSTANTS.IDNO_VS
      // 加权因子
      const ps = CONSTANTS.IDNO_PS
      const ss = idNo.toLocaleLowerCase()
      let r = 0
      for (let i = 0; i < 17; i++) {
        r += ps[i] * ss[i]
      }
      valid = vs[r % 11] === ss[17]
    }
  }

  return valid
}

function validateBankCard(card) {
  return CONSTANTS.REG_BANKCARD.test(card)
}

/**
 * 从身份证中获取性别
 * 
 * @param {String} idNo
 * @return {String}
 */
function getSexFromIdNo(idNo) {
  if (idNo.length === 15) {
    return parseInt(idNo.substr(13, 1), 10) % 2 ? 'M' : 'F';
  } else {
    return parseInt(idNo.substr(16, 1), 10) % 2 ? 'M' : 'F';
  }
}

/**
 * 从身份证中获取生日
 *
 * @param {String} idNo
 * @return {Date}
 */
function getBirthdayFromIdNo(idNo) {
  let birthday = ''
  if (idNo.length === 15) {
    birthday = '19' + idNo.substr(6, 6);
  } else if (idNo.length === 18) {
    birthday = idNo.substr(6, 8);
  }

  birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')

  return new Date(birthday)
}

/**
 * 从身份证中获取年龄
 * 
 * @param {String} idNo
 * @return {Number}
 */
function getAgeFromIdNo(idNo) {
  const birthday = getBirthdayFromIdNo(idNo)
  const today = new Date()
  let age = today.getFullYear() - birthday.getFullYear()

  if (today.getMonth() > birthday.getMonth()) {
    age += 1
  } else if (today.getMonth() === birthday.getMonth()) {
    if (today.getDate() >= birthday.getDate()) {
      age += 1
    } else {
      age -= 1
    }
  } else {
    age -= 1
  }

  return age
}

/**
 * 从身份证众获取地区
 *
 * @param {String} idNo
 * @return {Object}
 */
function getRegionFromIdNo(idNo) {
  return CONSTANTS.REGION_LIST.find(region => region.code.substr(0, 2) === idNo.substr(0, 2))
}

/**
 * 随机一个区间内的整数
 *
 * @param {Number} max
 * @param {Number} min
 * @return {Number}
 */
function random(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 字符填充至指定长度
 *
 * @param {String} str
 * @param {Number} [len=0]
 * @param {String} [holder=' ']
 * @param {Boolean} [start=true]
 */
function pad(str, len = 0, holder = ' ', start = true) {
  len = Math.max(str.length, len)
  const fix = holder.repeat(len - str.length)

  if (start) {
    return fix + str
  } else {
    return str + fix
  }
}

module.exports = {
  validateIdNo,
  validateBankCard,
  validatePhone,
  getAgeFromIdNo,
  getBirthdayFromIdNo,
  getAgeFromIdNo,
  getSexFromIdNo,
  getRegionFromIdNo,
  random,
  pad
}