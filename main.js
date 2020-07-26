const {
  app,
  dialog,
  globalShortcut,
  clipboard,
  Menu,
  Tray,
  Notification,
} = require('electron');

const pkg = require('./package.json');
var exec = require('child_process').exec;

// var epath = require('electron-path');
// var unpackedPath = epath.getUnpackedPath();
// var launch = unpackedPath + 'launch.scpt';
var launch = 'launch.scpt';

const cmd = 'CommandOrControl+shift+V';
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
  const ret = globalShortcut.register(cmd, () => {
    let str = clipboard.readText();
    str = str.replace(/\s/g, ' ');
    // https: //github.com/electron/electron/issues/10864
    var myNotification = new Notification({
      title: 'DeepLHacked',
      body: 'remove redundant spaces from clipboard'
    })
    myNotification.show();
    clipboard.writeText(str, 'selection');
    exec('/usr/bin/osascript ' + launch, {}, function (err, stdout, stderr) {
      if (err != null) {
        const response = dialog.showMessageBox(err2);
      }
    });
  });

  appIcon = new Tray('assets/icon-16.png');
  // add icon: https://qiita.com/saki-engineering/items/203892838e15b3dbd300
  const contextMenu = Menu.buildFromTemplate([{
      label: 'Toggle',
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
            var myNotification = new Notification({
              title: 'DeepLHacked',
              body: 'remove redundant spaces from clipboard'
            })
            myNotification.show();
            clipboard.writeText(str, 'selection');
            exec('/usr/bin/osascript ' + launch, {}, function (err, stdout, stderr) {
              if (err != null) {
                dialog.showErrorBox('error occur', err);
              }
            });
          });
          ret;
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