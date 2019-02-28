const program = require('commander')
const chalk = require('chalk')
const Table = require('cli-table3')
const CONSTANTS = require('./constants')
const {
  makeName,
  makeIdNo,
  makeBankCard,
  makePhone
} = require('./factory')
const {
  validatePhone,
  validateIdNo,
  validateBankCard,
  getAgeFromIdNo,
  getBirthdayFromIdNo,
  getSexFromIdNo,
  getRegionFromIdNo
} = require('./utils')

const { version } = require('../package.json')

program.version(version)
  .option('-q, --quantity [数量]', '数量', /\d+/, 10)
  .option('-i, --idno [身份证号]', '校验身份证号')
  .option('-c, --card [银行卡号]', '校验银行卡号')
  .option('-p, --phone [手机号]', '校验手机号')
  .parse(process.argv)

console.log('\n')

function makeInfoList() {
  const quantity = parseInt(program.quantity) || 10
  const head = ['姓名', '身份证号', '银行卡号', '手机号']
  const table = new Table({
    head,
    chars: {
      'top': '-',
      'top-mid': '-',
      'top-left': '-',
      'top-right': '-',
      'bottom': '-',
      'bottom-mid': '-',
      'bottom-left': '-',
      'bottom-right': '-',
      'left': '║',
      'left-mid': '-',
      'mid': '-',
      'mid-mid': '-',
      'right': '║',
      'right-mid': '-',
      'middle': '│'
    },
  })

  for (let i = 0; i < quantity; i++) {
    table.push([
      makeName(),
      makeIdNo(),
      makeBankCard(),
      makePhone()
    ])
  }

  console.log(table.toString())
  console.log('\n')
}

function checkIdNo(idNo) {
  if (!validateIdNo(idNo)) {
    console.log(chalk.red('✘ : 无效的身份证号'))
    return
  }

  const age = getAgeFromIdNo(idNo)
  const sex = getSexFromIdNo(idNo)
  const birthday = getBirthdayFromIdNo(idNo)
  const region = getRegionFromIdNo(idNo)

  console.log(chalk.green('✔︎ : 合法的身份证号'))
  console.log(`性别: ${sex === 'F' ? '女' : sex === 'M' ? '男'  : ''}`)
  console.log(`年龄: ${age}`)
  console.log(`生日: ${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`)
  console.log(`地区: ${region ? region.name : ''}`)
}

function checkBankCard(card) {
  if (!validateBankCard(card)) {
    console.log(chalk.red('✘ : 无效的银行卡号'))
    return
  }

  const bank = CONSTANTS.BANK_LIST.find(bank => card.startsWith(bank.prefix))

  console.log(chalk.green('✔︎ : 合法的银行卡号'))
  console.log(`银行名称: ${bank ? bank.name : ''}`)
}

function checkPhone(phone) {
  if (!validatePhone(phone)) {
    console.log(chalk.red('✘ : 无效的手机号'))
    return
  }

  console.log(chalk.green('✔︎ : 合法的手机号'))
}

if (program.idno) {
  checkIdNo(program.idno)
} else if (program.card) {
  checkBankCard(program.card)
} else if (program.phone) {
  checkPhone(program.phone)
} else {
  makeInfoList()
}