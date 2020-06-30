const {
  app,
  dialog,
  globalShortcut,
  clipboard
} = require('electron')

const pkg = require('./package.json');
const cmd = 'CommandOrControl+shift+V';

app.whenReady().then(() => {
  const ret = globalShortcut.register(cmd, () => {
    let str = clipboard.readText();
    str = str.replace(/\s/g, ' ');
    clipboard.writeText(str, 'selection');
  })

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
  globalShortcut.unregister(cmd)
  globalShortcut.unregisterAll()
})