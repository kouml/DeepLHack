const {
  app,
  dialog,
  globalShortcut,
  clipboard,
  Menu,
  Tray,
  Notification
} = require('electron')

const pkg = require('./package.json');
const cmd = 'CommandOrControl+shift+V';
let appIcon = null;
let toggled = true;

app.whenReady().then(() => {
  const ret = globalShortcut.register(cmd, () => {
    // console.log("ok");
    let str = clipboard.readText();
    str = str.replace(/\s/g, ' ');
    // https: //github.com/electron/electron/issues/10864
    var myNotification = new Notification({
      title: 'DeepLHacked',
      body: 'remove redundant spaces from clipboard'
    })
    myNotification.show();
    clipboard.writeText(str, 'selection');
  });


  // appIcon = new Tray('23252616.jpeg');
  appIcon = new Tray('icon/com_93620.png');
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
            // console.log("ok");
            let str = clipboard.readText();
            str = str.replace(/\s/g, ' ');
            // https: //github.com/electron/electron/issues/10864
            var myNotification = new Notification({
              title: 'DeepLHacked',
              body: 'remove redundant spaces from clipboard'
            })
            myNotification.show();
            clipboard.writeText(str, 'selection');
          });
          ret;
        }
      }
    },
    {
      label: 'Quit',
      type: 'normal',
      click() {
        app.quit()
      }
    }
  ]);

  console.log("first");
  contextMenu.items[0].checked = true;
  appIcon.setContextMenu(contextMenu);
  console.log("end");

  // prevent from double exectuion
  const doubleboot = app.requestSingleInstanceLock();
  if (!doubleboot) {
    app.quit();
  }

  const options = {
    type: 'error',
    title: 'Alert',
    message: 'Registration is failed',
    detail: 'It may conflict with other keyboard shortcut key.'
  };


  if (!ret) {
    const response = dialog.showMessageBox(options);
  }
})

app.on('will-quit', () => {
  globalShortcut.unregister(cmd);
  globalShortcut.unregisterAll();
})