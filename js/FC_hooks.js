const { execFile } = require('child_process');
/**
 * @author V
 * @description 封装FastCopy
 * @param {*} params 路径/ 更多参数(包括路径/ 更多参数 详情fastcopy help页 https://fastcopy.jp/help/fastcopy_eng.htm)
 * @return void
 * @time 2022-06-06 16:53:07
*/
function handleFC(params) {
  execFile(
    'FastCopy.exe',
    [
      '/cmd=sync',
      // '/bufsize=128',
      '/speed=full',
      '/open_window',
      '/auto_close',
      ...params
    ],
    (error, stdout, stderr) => {
      if (error) {
        throw error
      }
      console.log('执行成功 退出')
      process.exit()
    }
  )
}

module.exports = {
  handleFC
}
