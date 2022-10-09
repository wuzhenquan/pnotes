let players = [];

function Player(name, teamColor) {
  this.partners = []; // 队友列表
  this.enemies = []; // 敌人列表
  this.state = "live"; // 玩家状态
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
}

Player.prototype.win = function () {
  console.log("winner: " + this.name);
};
Player.prototype.lose = function () {
  console.log("loser: " + this.name);
};
Player.prototype.die = function () {
  let all_dead = true;
  this.state = "dead";

  // 遍历队友列表
  for (let i = 0, partner; (partner = this.partners[i++]); ) {
    if (partner.state !== "dead") {
      // 如果还有一个队友还没有死亡，则游戏还未失败
      all_dead = false;
      break;
    }
  }

  if (all_dead === true) {
    // 如果队友全部死亡
    this.lose(); // 通知自己游戏失败
    for (let i = 0, partner; (partner = this.partners[i++]); ) {
      // 通知所有队友玩家游戏失败
      partner.lose();
    }
    for (let i = 0, enemy; (enemy = this.enemies[i++]); ) {
      // 通知所有敌人游戏胜利
      enemy.win();
    }
  }
};

// 定义一个工厂来创建玩家
const playerFactory = function (name, teamColor) {
  const newPlayer = new Player(name, teamColor); //创建新玩家

  // 通知所有玩家，有新角色加入
  for (let i = 0, player; (player = players[i++]); ) {
    // 如果是同一队的玩家，相互添加到队友列表
    if (player.teamColor === newPlayer.teamColor) {
      player.partners.push(newPlayer);
      newPlayer.partners.push(player);
    } else {
      // 如果不是同一队的玩家，相会添加到敌人列表
      player.enemies.push(newPlayer);
      newPlayer.enemies.push(player);
    }
  }
  players.push(newPlayer);

  return newPlayer;
};

// 红队
const player1 = playerFactory("皮蛋", "red");
const player2 = playerFactory("小乖", "red");
const player3 = playerFactory("宝宝", "red");
const player4 = playerFactory("小强", "red");

// 蓝队
const player5 = playerFactory("黑妞", "blue");
const player6 = playerFactory("葱头", "blue");
const player7 = playerFactory("胖墩", "blue");
const player8 = playerFactory("海盗", "blue");

// 让红队玩家全部死亡
player1.die();
player2.die();
player3.die();
player4.die();

/**
 * 总结
 * 问题：每个玩家和其他玩家都是紧紧耦合在一起的。
 * 比如：每个玩家都有两个属性，this.partners 和 this.enemies,
 *      用来保存其他玩家对象的引用。
 *      当每个对象的状态发生改变，比如角色移动、吃到道具或死亡时，
 *      都必须要显示地遍历通知其他对象。
 *      在这个例子中只创建了 8 个玩家，或许还没有对你产生足够多的困扰，
 *      而如果在一个大型网络游戏中，画面里有成百上千个玩家，几十支队伍在互相厮杀。
 *      如果有一个车玩家掉线，必须从所有玩家的其他队友列表和敌人列表中都移除这个玩家。
 *      游戏也许还有解除队伍和添加到别的队伍的功能，红色玩家可以突然变成蓝色玩家，
 *      这就不在仅仅是循环能够解决的问题了。
 */
