const {
  app,
  dialog,
  globalShortcut,
  clipboard,
  Menu,
  Tray,
  Notification,
} = require('electron');

const os = require('os');
const pkg = require('./package.json');
var exec = require('child_process').exec;

// const sendkeys = require('sendkeys-js')

// for mac
// sendkeys.send('f5')

// for win
// sendkeys.send('{Ctrl+C}')
var robot = require("robotjs");

// Type user's password or something.
// robot.typeString("abc123");






// const { K, U } = require('win32-api');
// const user32 = U.load()  // load all apis defined in lib/{dll}/api from user32.dll

// const title = 'DeepL\0'    // null-terminated string
// // const lpszWindow = Buffer.from(title, 'ucs2');
// const lpszWindow = Buffer.from(title);
// const hWnd = user32.FindWindowExW(0, 0, lpszWindow, null);
// console.log(hWnd);
var child = require('child_process').execFile;

var user_name = os.userInfo().username;
var executablePath = "C:\\Users\\" + user_name + "\\AppData\\Local\\DeepL\\DeepL.exe";
var pastePath = ".\\node_modules\\clipboardy\\fallbacks\\windows\\clipboard_x86_64.exe";
var args = ["--paste"];

// console.log(executablePath);
const clipboardy = require('clipboardy');
// clipboardy.writeSync('copy shimasita');
// var ncp = require("copy-paste");
// ncp.copy("hello") // Asynchronously adds "hello" to clipbroad
// ncp.paste() // Synchronously returns clipboard contents

// tell application "System Events" to keystroke "a" using command down
// tell application "System Events" to keystroke "v" using command down






// const title = 'DeepL\0'    // null-terminated string

// // const title = '计算器\0'    // null-terminated string 字符串必须以\0即null结尾!
// const title = 'Google Chrome\0';
// const lpszWindow = Buffer.from(title, 'ucs2');
// const hWnd = user32.FindWindowExW(0, 0, lpszWindow, null);
// // const launch_ps1 = "launch.ps1";

// var spawn = require("child_process").spawn, child;
// child.stdout.on("data", function (data) {
//   console.log("Powershell Data: " + data);
// });
// // child.stderr.on("data", function (data) {
// //   console.log("Powershell Errors: " + data);
// // });
// child.on("exit", function () {
//   console.log("Powershell Script finished");
// });
// child.stdin.end(); //end input




// exec('./' + launch_ps1, {}, function (err, stdout, stderr) {
//   if (err != null) {
//     console.log("a");
//     // const response = dialog.showMessageBox(err2);
//   }
// });

// const hWnd = user32.FindWindow( null, lpszWindow);
// var process = user32.FindWindow(NULL,"Calculadora")
// var process = user32.FindWindowExW(null, null, lpszWindow, title);
// console.log(hWnd);
// console.log(hWnd);
// console.log(lpszWindow);

// if (typeof hWnd === 'number' && hWnd > 0
//   || typeof hWnd === 'bigint' && hWnd > 0
//   || typeof hWnd === 'string' && hWnd.length > 0
// ) {
//   console.log('buf: ', hWnd)

//   // Change title of the Calculator
//   // const res = user32.SetWindowTextW(hWnd, Buffer.from('Node-Calculator\0', 'ucs2'))

//   // if (!res) {
//   //   console.log('SetWindowTextW failed')
//   // }
//   // else {
//   //   console.log('window title changed')
//   // }
// }


const platforms = {
  WINDOWS: 'WINDOWS',
  MAC: 'MAC',
  LINUX: 'LINUX',
  SUN: 'SUN',
  OPENBSD: 'OPENBSD',
  ANDROID: 'ANDROID',
  AIX: 'AIX',
};

const platformsNames = {
  win32: platforms.WINDOWS,
  darwin: platforms.MAC,
  linux: platforms.LINUX,
  sunos: platforms.SUN,
  openbsd: platforms.OPENBSD,
  android: platforms.ANDROID,
  aix: platforms.AIX,
};

// var epath = require('electron-path');
// var unpackedPath = epath.getUnpackedPath();
// var launch = unpackedPath + 'launch.scpt';
var launch = 'launch.scpt';

const cmd = 'CommandOrControl+shift+V';
var is_notify = true;
let appIcon = null;
let toggled = true;

const err1 = {
  type: 'error',
  title: 'Alert',
  message: 'Registration is failed',
  detail: 'It may conflict with other keyboard shortcut key.'
};

const err2 = {
  type: 'error',
  title: 'Alert',
  message: 'applescript is not executed',
  detail: 'It may not possible to use /usr/bin_osascript.'
};

const err3 = {
  type: 'error',
  title: 'Alert',
  message: 'Double launch',
  detail: 'It may already launched.'
};

app.whenReady().then(() => {
  const currentPlatform = platformsNames[os.platform()];
  var myNotification = new Notification({
    title: 'DeepLHack',
    body: 'Paste to DeepL'
  })
  const ret = globalShortcut.register(cmd, () => {
    let str = clipboard.readText();
    str = str.replace(/\s/g, ' ');
    // https: //github.com/electron/electron/issues/10864
    if (is_notify){
      myNotification.show();
    }
    clipboard.writeText(str, 'selection');
    if (currentPlatform == 'MAC'){
      exec('/usr/bin/osascript ' + launch, {}, function (err, stdout, stderr) {
        if (err != null) {
          const response = dialog.showMessageBox(err2);
        }
      });
    } else if(currentPlatform == 'WINDOWS'){
      console.log("this is windows");
      child(executablePath, function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        // clipboardy.readSync();
        // robot.typeString(str);
        robot.keyTap('v', 'control');
        // robot.keyToggle('control', 'down');
        // robot.keyTap('v');

        console.log("paste 1");
      });
      // paste
      // child(pastePath, args, function (err, data) {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      // });
      // clipboardy.readSync();
      console.log("paste 2");
    }
  });

  // icon: https://qiita.com/saki-engineering/items/203892838e15b3dbd300
  appIcon = new Tray('assets/icon-16.png');
  const contextMenu = Menu.buildFromTemplate([{
      label: 'Turn on/off',
      type: 'checkbox',
      click() {
        if (toggled) {
          globalShortcut.unregisterAll();
          toggled = false;
        } else {
          // console.log("ret");
          const ret = globalShortcut.register(cmd, () => {
            let str = clipboard.readText();
            str = str.replace(/\s/g, ' ');
            // https: //github.com/electron/electron/issues/10864
            if (is_notify) {
              myNotification.show();
            }
            clipboard.writeText(str, 'selection');
            if (currentPlatform == 'MAC') {
              exec('/usr/bin/osascript ' + launch, {}, function (err, stdout, stderr) {
                if (err != null) {
                  const response = dialog.showMessageBox(err2);
                }
              });
            } else if (currentPlatform == 'WINDOWS') {
              console.log("this is windows");
              child(executablePath, function (err, data) {
                if (err) {
                  console.error(err);
                  return;
                }
                clipboardy.readSync();
                console.log("paste 1");
              });
              clipboardy.readSync();
              console.log("paste 2");
            }
          });
          ret;
        }
      }
    },
    {
      label: 'Notification',
      type: 'checkbox',
      click() {
        if (is_notify == true){
          is_notify = false;
        } else {
          is_notify = true;
        }
      }
    },
    {
      label: 'Quit',
      type: 'normal',
      click() {
        app.quit();
      }
    }
  ]);

  contextMenu.items[0].checked = true;
  contextMenu.items[1].checked = true;
  appIcon.setContextMenu(contextMenu);

  // prevent from double exectuion
  const doubleboot = app.requestSingleInstanceLock();
  if (!doubleboot) {
    const response = dialog.showMessageBox(err3);
    app.quit();
  }

  if (!ret) {
    const response = dialog.showMessageBox(err1);
    app.quit();
  }
})

app.on('will-quit', () => {
  globalShortcut.unregister(cmd);
  globalShortcut.unregisterAll();
})