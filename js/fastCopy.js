const { execFile } = require('child_process');
const { SS, Document } = require('../ss.config');
const { handleFC } = require('./FC_hooks');

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
  console.log('config/note拷贝到' + RemovableDisk[0].mounted)
  handleFC([
    `${Document}\\OneDrive\\Config`,
    `${Document}\\OneDrive\\Note`,
    `/to=${RemovableDisk[0].mounted}`])
  // execFile(
  //   'FastCopy.exe',
  //   [
  //     '/cmd=sync',
  //     '/bufsize=128',
  //     '/speed=full',
  //     '/open_window',
  //     '/auto_close',
  //   ],
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       throw error
  //     }
  //     console.log('执行成功 退出')
  //     process.exit()
  //   }
  // )
}

/**
 * @author V
 * @description 调用FastCopy，将onedrive中的Note/Config文件夹备份到Google Drive
 * @param {*} null
 * @return void
 * @time 2022-06-06 17:23:32
 */
function fastCopy_sync_config_note_ToGoogleDisk() {
  console.log('config/note拷贝到Z:\\我的云端硬盘')
  handleFC([
    `${Document}\\OneDrive\\Config`,
    `${Document}\\OneDrive\\Note`,
    `/to=${'Z:\\我的云端硬盘'}`])
}

/**
 * @author V
 * @description 调用FastCopy，复制vscode的用户代码片段/键盘映射/json设置等至文档中的onedrive文件夹(onedrive可以上传至云)
 * @param {*} null
 * @return void
 * @time 2022-04-21 16:12:55
 */
function fastCopy_sync_vscodeSettingsToOneDrive() {
  handleFC([
    `${SS}\\AppData\\Roaming\\Code\\User\\settings.json`,
    `${SS}\\AppData\\Roaming\\Code\\User\\keybindings.json`,
    `${SS}\\AppData\\Roaming\\Code\\User\\snippets\\`,
    `/to=${Document}\\OneDrive\\Config\\idea VSCode Settings\\vscodeSettings`
  ])
}

/**
 * @author V
 * @description 调用FastCopy，复制onedrive文件夹Note/config -> SyncThing
 * @param {*} null
 * @return void
 * @time 2022-04-21 16:12:55
 */
function fastCopy_sync_config_note_ToSyncThing() {
  handleFC([
    `${Document}\\OneDrive\\Config`,
    `${Document}\\OneDrive\\Note`,
    `/to=${Document}\\Syncthing\\.files`
  ])
}

/**
 * @author V
 * @description 调用FastCopy，将onedrive中的Note/Config文件夹备份到某个磁盘（自选）
 * @param {string} disk 传入盘符
 * @return void
 * @time 2022-04-21 16:12:55
 */
function fastCopy_sync_config_note_ToChooseDisk(disk) {
  // XXX 对路径做个简单处理
  // console.log(disk.length);
  if (disk.length === 1) disk = disk + ':\\'
  else if (disk.length > 1) {
    if (disk.includes('/')) {
      // 用于windows， 把所有的/改为\
      disk = disk.replace(new RegExp('/', 'gm'), '\\')
    }
    if (!disk.includes(':')) {
      // 如果没有':' 则在第一个字母上加上':'
      // console.log(disk.length);
      const driveLetter = disk.substring(0, 1)
      const drivePath = disk.substring(1, disk.length)
      disk = driveLetter + ':' + drivePath
    }
  }
  console.log('config/note拷贝到' + disk)
  // return
  
  handleFC([
    `${Document}\\OneDrive\\Config`,
    `${Document}\\OneDrive\\Note`,
    `/to=${disk}`
  ])
}

module.exports = {
  fastCopy_sync_vscodeSettingsToOneDrive,
  fastCopy_sync_config_note_ToMoveDisk,
  fastCopy_sync_config_note_ToChooseDisk,
  fastCopy_sync_config_note_ToGoogleDisk,
  fastCopy_sync_config_note_ToSyncThing
}
