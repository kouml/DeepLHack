const {
  app,
  globalShortcut,
  clipboard
} = require('electron')

const pkg = require('./package.json');
// const cmd = 'CommandOrControl+C';
const cmd = 'CommandOrControl+shift+V';
var ks = require('node-key-sender');
var robot = require("robotjs");

app.whenReady().then(() => {
  console.log(robot);
  console.log(robot.keyboard);
  let firstClick = null;
  let secondClick = null;

  const ret = globalShortcut.register(cmd, () => {
    let str = clipboard.readText();
    str = str.replace(/\s/g, ' ');
    clipboard.writeText(str, 'selection');
    // console.log("a");

    // 1. find invoke original behavior (impossible)
    // 2. tap one and send to deepL (may not possible)
    // 3. other shortcut command
    // go with 3

    // function sleep(ms) {
    //   return new Promise((resolve) => {
    //     setTimeout(resolve, ms);
    //   });
    // }

    // globalShortcut.unregister(cmd);
    // console.log("out1");

    // Press enter.
    // robot.keyTap("enter");
    // robot.typeString("command+v");
    // robot.typeString("Hello World");
    // robot.typeString("abc123");
    // robot.keyTap("enter");
    // robot.keyTap("enter");
    // robot.keyTap("enter");

    // function alertMsg() {
    //     console.log("out10");
    //     // ks.sendCombination(['aaaa'])
    //     ks.sendCombination(['cmd', 'c']);
    //     // setTimeout(alertMsg, 3000);
    //     sleep(100);
    //     ks.sendCombination(['cmd', 'c']);
    //     // ks.sendKey('a');
    //     console.log("out100");

    //     // robot.keyToggle("shift", "down", "command");
    //     // console.log("out3");
    //     // // robot.keyTap('v');
    //     // // robot.keyTap('v');
    //     // var twoPI = Math.PI * 2.0;
    //     // var screenSize = robot.getScreenSize();
    //     // var height = (screenSize.height / 2) - 10;
    //     // var width = screenSize.width;

    //     // for (var x = 0; x < width; x++) {
    //     //   y = height * Math.sin((twoPI * x) / width) + height;
    //     //   robot.moveMouse(x, y);
    //     // }
    //     // robot.keyTap('[', ['command', 'v']);
    // }
    // setTimeout(alertMsg, 3000);
    // console.log("out3");
    // robot.keyTap("v");
    // robot.keyTap("command");
    // robot.keyTap("v");

    // keyboard.press(robot.KEY_W);
    // keyboard.click(robot.KEY_S);
    // keyboard.release(robot.KEY_W);


    // var twoPI = Math.PI * 2.0;
    // var screenSize = robot.getScreenSize();
    // var height = (screenSize.height / 2) - 10;
    // var width = screenSize.width;

    // for (var x = 0; x < width; x++) {
    //   y = height * Math.sin((twoPI * x) / width) + height;
    //   robot.moveMouse(x, y);
    // }

    // console.log("a");
    // robot.typeString("");
    // robot.keyTap("enter");

    // let str = clipboard.readText();
    // str = str.replace(/\s/g, ' ');
    // clipboard.writeText(str, 'selection');
    // console.log("a");

    // let firstClick = null;
    // console.log(firstClick);

    // if (firstClick == null){
    //   // console.log("first click");
    //   firstClick = Date.now();
    // } else{
    //   // console.log("second click");
    //   secondClick = Date.now();
    //   if (secondClick - firstClick < 200){
    //     console.log("double tap success!!");
    //     let str = clipboard.readText();
    //     // console.log(str);
    //     str = str.replace(/\s/g, ' ');
    //     // console.log(str);
    //     clipboard.writeText(str, 'selection');
    // ks.sendCombination(['aaaa']);
    // ks.sendCombination(['cmd', 'c']);
    //     firstClick = null;
    //   } else{
    //     firstClick = null;
    //   }
    // }

    // secondClick = Date.now();

    // console.log(firstClick);
    // const onCmdPress = () => {
    //   if (firstClick && Date.now() - firstClick < 200) {
    //     console.log('Cmd Double Pressed!');
    //     // let str = clipboard.readText();
    //     // console.log(str);
    //     // str = str.replace(/\s/g, ' ');
    //     // console.log(str);
    //     // clipboard.writeText(str, 'selection');
    //     firstClick = null;
    //   } else {
    //     firstClick = Date.now();
    //   }
    // };
    // console.log(firstClick);
    // onCmdPress();
  })

  if (!ret) {
    console.log('registration failed')
  }

  console.log(globalShortcut.isRegistered(cmd))
})

app.on('will-quit', () => {
  globalShortcut.unregister(cmd)
  globalShortcut.unregisterAll()
  // ioHook.unregisterShortcut([3675]);
  // ioHook.unregisterShortcut([3676]);
})