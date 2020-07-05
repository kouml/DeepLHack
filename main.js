const {
  app,
  dialog,
  globalShortcut,
  clipboard,
  Notification
} = require('electron')

const pkg = require('./package.json');
const cmd = 'CommandOrControl+shift+V';

app.whenReady().then(() => {
  //二重起動の防止
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
  })

  if (!ret) {
    const response = dialog.showMessageBox(options);
  }
})

app.on('will-quit', () => {
  globalShortcut.unregister(cmd)
  globalShortcut.unregisterAll()
})