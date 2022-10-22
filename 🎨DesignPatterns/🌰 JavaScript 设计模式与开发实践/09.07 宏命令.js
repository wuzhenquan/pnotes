const closeDoorCommand = {
  execute: function () {
    console.log("关门");
  },
};

const openPcCommand = {
  execute: function () {
    console.log("开电脑");
  },
};

const openQQCommand = {
  execute: function () {
    console.log("登录 QQ");
  },
};

// 定义宏命令
const MacroCommand = function () {
  return {
    commandsList: [],
    add(command) {
      this.commandsList.push(command);
    },
    execute() {
      for (let i = 0, command; (command = this.commandsList[i++]); ) {
        command.execute();
      }
    },
  };
};

const marcoCommand = MacroCommand();
marcoCommand.add(closeDoorCommand);
marcoCommand.add(openPcCommand);
marcoCommand.add(openQQCommand);
marcoCommand.execute();

// 总结：非常像策略模式
