// function Spirit (name){
//     this.name = name;
// }

// Spirit.prototype.attack = function(type){
//     if (type === 'waveBoxing'){
//         console.log(this.name + ': 使用波动拳');
//     } else if (type === 'whirlKick'){
//         console.log(this.name + ': 使用旋风腿');
//     }
// }

// const spirit = new Spirit('waveBoxing');
// spirit.attack('waveBoxing');
// spirit.attack('whirlKick');

// 改正

// 后来发现， Spirit.prototype.attack 这个方法实在是太庞大了，
// 实际上它完全有必要作为一个单独的类的存在。
// 面向对象设计鼓励将行为分布在合理数量的更小对象之中

const Attack = function (spirit) {
  this.spirit = spirit;
};
Attack.prototype.start = function (type) {
  return this.list[type].call(this);
};

Attack.prototype.list = {
  waveBoxing: function () {
    console.log(this.spirit.name + ": 使用波动拳");
  },
  whirlKick: function () {
    console.log(this.spirit.name + ": 使用旋风腿");
  },
};
// 现在的 Spirit 类变得精简了很多，不再包括各种各样的攻击方法，而是把攻击动作委托给 Attack 类的对象来执行，这段代码也是策略模式的运用之一：
const Spirit = function (name) {
  this.name = name;
  this.attackObj = new Attack(this);
};

Spirit.prototype.attack = function (type) {
  this.attackObj.start(type);
};

const spirit = new Spirit("RYU");

spirit.attack("waveBoxing");
spirit.attack("whirlKick");
