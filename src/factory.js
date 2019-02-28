const CONSTANTS = require('./constants')
const {
  random,
  pad
} = require('./utils')

/**
 * 生成身份证号
 * 
 * @return {String}
 */
function makeIdNo() {
  const age = 20
  const now = new Date()
  const address = CONSTANTS.REGION_LIST[random(CONSTANTS.REGION_LIST.length - 1)].code;
  var birthday = '' + (now.getFullYear() - age)  + pad(now.getMonth() + 1, 2, '0') + pad(now.getDate(), 2, '0')

  const s = '' + random(001, 999)
  const d = (address + birthday + s).split('')
  let t = 0
  for (let i = 0; i < d.length; i++) {
    t += parseInt(d[i]) * parseInt(CONSTANTS.IDNO_PS[i])
  }
  const v = CONSTANTS.IDNO_VS[parseInt(t % 11)]

  return address + birthday + s + v
}

/**
 * 生成姓名
 * 
 * @return {String}
 */
function makeName() {
  const familyName = CONSTANTS.FAMILY_NAME_LIST[random(CONSTANTS.FAMILY_NAME_LIST.length - 1)]
  const givenName = CONSTANTS.GIVEN_NAME_LIST[random(CONSTANTS.GIVEN_NAME_LIST.length - 1)]
  const name = familyName + givenName

  return name
}

/**
 * 生成银行卡号
 * 
 * @return {String}
 */
function makeBankCard() {
  let bankCard = CONSTANTS.BANK_LIST[random(CONSTANTS.BANK_LIST.length - 1)].prefix
  for (let i = 0; i < 13; i++) {
    bankCard += random(9)
  }

  return bankCard
}

/**
 * 生成手机号
 * 
 * @return {String}
 */
function makePhone() {
  const s = ['3','4','5','7','8']
  const phone = '1' + s[random(s.length - 1)] + random(899999999, 100000000)

  return phone
}

module.exports = {
  makeName,
  makeIdNo,
  makeBankCard,
  makePhone
}