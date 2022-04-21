// XXX 此处先查询系统环境变量
const SS = process.env.ss || 'C:\\Users\\ss'
const Document = process.env.Document || 'C:\\Users\\ss\\Documents' || 'D:\\Users\\ss\\Documents'

module.exports = {
  SS,
  Document
}
