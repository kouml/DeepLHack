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

var robot = require("robotjs");
var exec = require('child_process').exec;
var child = require('child_process').execFile;

// Default executablePath
// TODO: fix more flexible
var user_name = os.userInfo().username;
var executablePath = "C:\\Users\\" + user_name + "\\AppData\\Local\\DeepL\\DeepL.exe";
console.log(executablePath);

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

const launch = 'launch.scpt';
const cmd = 'CommandOrControl+shift+V';

var is_notify = true;
let appIcon = null;
let toggled = true;

// err messages
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
  detail: 'It may not possible to use /usr/bin_osascript or DeepL is not installed.'
};

const err3 = {
  type: 'error',
  title: 'Alert',
  message: 'Double launch',
  detail: 'It may already launched.'
};


const err4 = {
  type: 'error',
  title: 'Alert',
  message: 'DeepLApplication is not exist in your local.',
  detail: `Please confirm your application is installed at ${executablePath}`
};

app.whenReady().then(() => {
  const currentPlatform = platformsNames[os.platform()];

  var myNotification = new Notification({
    title: 'DeepLHack',
    body: 'Paste to DeepL'
  })


  function macLaunchScript(){
    exec('/usr/bin/osascript ' + launch, {}, function (err, stdout, stderr) {
      if (err != null) {
        const response = dialog.showMessageBox(err2);
      }
      if (is_notify) {
        myNotification.show();
      }
    });
  };

  function winLaunchScript() {
    console.log("this is windows");
    child(executablePath, function (err, data) {
      if (err) {
        const response = dialog.showMessageBox(err4);
        console.error(err);
        return;
      }
      if (is_notify) {
        myNotification.show();
      }
      robot.keyTap('v', 'control');
    });
  };

  const ret = globalShortcut.register(cmd, () => {
    let str = clipboard.readText();
    str = str.replace(/\s/g, ' ');
    // https: //github.com/electron/electron/issues/10864
    clipboard.writeText(str, 'selection');
    if (currentPlatform == 'MAC'){
      macLaunchScript();
    } else if(currentPlatform == 'WINDOWS'){
      winLaunchScript();
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
            const ret = globalShortcut.register(cmd, () => {
              let str = clipboard.readText();
              str = str.replace(/\s/g, ' ');
              // https: //github.com/electron/electron/issues/10864
              clipboard.writeText(str, 'selection');
              if (currentPlatform == 'MAC') {
                macLaunchScript();
              } else if (currentPlatform == 'WINDOWS') {
                winLaunchScript();
              }
            });
          };
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