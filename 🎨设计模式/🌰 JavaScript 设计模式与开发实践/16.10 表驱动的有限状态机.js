// 库: https://github.com/jakesgordon/javascript-state-machine

const fsm = StateMachine.create({
  initial: 'off',
  events: [
    { name: 'buttonWasPressed', from: 'off', to: 'on'},
    { name: 'buttonWasPressed', from: 'on', to: 'off'},
  ],
  callbacks: {
    onButtonWasPressed: function (event, from, to) {
      console.log(arguments);
    },
  },
  error: function (eventName, from, to, errorCode, errorMessage) {
    console.log(arguments); // 从一种状态试图切换到另一种不可能达到的状态的时候
  },
});

button.onclick  = function () {
  fsm.buttonWasPressed();
}
