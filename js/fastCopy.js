const { execFile } = require('child_process')
const { SS, Document} = require('../ss.config')



/**
   * @author V
   * @description 调用FastCopy，将onedrive中的Note/Config文件夹备份到U盘
   * @param {Array} RemovableDisk 移动磁盘数组 每个磁盘是一个对象
   * @return void
   * @time 2022-04-21 16:12:55
   */
 function fastCopy_sync_config_note_ToMoveDisk(RemovableDisk) {
  RemovableDisk.forEach((v) => {
    console.log(`找到的磁盘移动磁盘:${v.mounted}`)
  })
  // return
  console.log('config/note拷贝到' + RemovableDisk[0].mounted)
  execFile(
    'FastCopy.exe',
    [
      '/cmd=sync',
      '/bufsize=128',
      '/speed=full',
      '/open_window',
      '/auto_close',
      `${Document}\\OneDrive\\Config`,
      `${Document}\\OneDrive\\Note`,
      `/to=${RemovableDisk[0].mounted}`
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

/**
   * @author V
   * @description 调用FastCopy，复制vscode的用户代码片段/键盘映射/json设置等至文档中的onedrive文件夹(onedrive可以上传至云)
   * @param {*} null
   * @return void
   * @time 2022-04-21 16:12:55
   */
 function fastCopy_sync_vscodeSettingsToOneDrive() {
  execFile(
    'FastCopy.exe',
    [
      '/cmd=sync',
      '/bufsize=128',
      '/speed=full',
      '/open_window',
      '/auto_close',
      `${SS}\\AppData\\Roaming\\Code\\User\\settings.json`,
      `${SS}\\AppData\\Roaming\\Code\\User\\keybindings.json`,
      `${SS}\\AppData\\Roaming\\Code\\User\\snippets\\`,
      `/to=${Document}\\OneDrive\\Config\\idea VSCode Settings\\vscodeSettings`
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


/**
 * @author V
 * @description 调用FastCopy，将onedrive中的Note/Config文件夹备份到某个磁盘（自选）
 * @param {string} disk 传入盘符
 * @return void
 * @time 2022-04-21 16:12:55
 */
function fastCopy_sync_config_note_ToChooseDisk(disk) {
  // console.log(disk.length);
  if (disk.length === 1) disk = disk + ':'
  console.log('config/note拷贝到' + disk);
  execFile(
    'FastCopy.exe',
    [
      '/cmd=sync',
      '/bufsize=128',
      '/speed=full',
      '/open_window',
      '/auto_close',
      `${Document}\\OneDrive\\Config`,
      `${Document}\\OneDrive\\Note`,
      `/to=${disk}`
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
  fastCopy_sync_vscodeSettingsToOneDrive,
  fastCopy_sync_config_note_ToMoveDisk,
  fastCopy_sync_config_note_ToChooseDisk,
 }