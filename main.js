const fs = require('fs')
const { exec, execFile } = require('child_process')
var diskInfo_package = require('diskinfo') // diskinfo包
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const { fastCopy_sync_vscodeSettingsToOneDrive,
  fastCopy_sync_config_note_ToMoveDisk,
  fastCopy_sync_config_note_ToChooseDisk,
  fastCopy_sync_config_note_ToGoogleDisk,
  fastCopy_sync_config_note_ToSyncThing,
  } = require('./js/fastCopy.js')

// TODO 等着研究环境变量
const {SS, Document} = require('./ss.config')

/**
 * @author V
 * @description 遍历电脑硬盘
 * @param {*} null
 * @return void
 * @time 2022-04-21 16:23:55
 */
diskInfo_package.getDrives(function (err, aDrives) {
  if (err) {
    // 如果遍历硬盘出错, 抛出
    throw err
  }
  // 移动磁盘数组
  const RemovableDisk = []
  for (var i = 0; i < aDrives.length; i++) {
    // console.log('Drive ' + aDrives[i].filesystem);
    // console.log('blocks ' + aDrives[i].blocks);
    // console.log('used ' + aDrives[i].used);
    // console.log('available ' + aDrives[i].available);
    // console.log('capacity ' + aDrives[i].capacity);
    // console.log('mounted ' + aDrives[i].mounted);
    // console.log('-----------------------------------------');
    const diskType = aDrives[i].filesystem === 'Removable Disk'
    if (diskType) {
      RemovableDisk.push(aDrives[i])
    }
    console.log(
      `查询到磁盘 ${aDrives[i].mounted}`,
      diskType ? 'Removable Disk' : 'Local Fixed Disk'
    )
  }

  console.log('1: vscodeSettings -> OneDrive')
  console.log('2: Note/Config -> USB')
  console.log('4: Note/Config -> SyncThing')
  console.log('5: Note/Config -> Google Drive')
  console.log('9: Note/Config -> chooseDisk')
  console.log('0: 退出')
  enterChoose() // 进入选择

  /**
   * @author V
   * @description 入口选择事件
   * @param {*} null
   * @return void
   * @time 2022-04-21 16:31:29
   */
  function enterChoose() {
    readline.question(`请选择:`, (choose) => {
      switch (choose) {
        case '0':
          console.log('选择了退出')
          process.exit()
        case '1':
          console.log('1: vscodeSettings -> OneDrive')
          fastCopy_sync_vscodeSettingsToOneDrive()
          break
        case '2':
          console.log('2: Note/Config -> USB')
          fastCopy_sync_config_note_ToMoveDisk(RemovableDisk)
          break
        case '4':
          console.log('4: Note/Config -> SyncThing')
          fastCopy_sync_config_note_ToSyncThing()
          break
        case '5':
          console.log('5: Note/Config -> Google Drive')
          fastCopy_sync_config_note_ToGoogleDisk()
          break
        case '9':
          console.log('9: Note/Config -> chooseDisk')
          chooseDisk() // 选择磁盘
          break
        default:
          console.log('选择失败')
          enterChoose()
      }
      // readline.close()
    })
  }

  /**
   * @author V
   * @description 将本地Onedrive中的Note/Config备份到某个磁盘(自选，进入选择)
   * @param {*} null
   * @return void
   * @time 2022-04-21 16:20:47
   */
  function chooseDisk() {
    console.log('目前所有磁盘:')
    aDrives.forEach((v) => {
      console.log(v.mounted)
    })
    readline.question(`复制到哪个磁盘？`, (choose) => {
      console.log(`选择了 ${choose}!`)
      fastCopy_sync_config_note_ToChooseDisk(choose)
      // readline.close()
    })
  }

})

// 退出node
// process.exit();
