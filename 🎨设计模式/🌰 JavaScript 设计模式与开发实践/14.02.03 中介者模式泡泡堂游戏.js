/**
 * 中介者对象
 * @returns {object} obj = { ReceiveMessage }
 * @returns {function} obj.ReceiveMessage - 负责接收 player 对象发送的消息
 */
const playerDirector = (function () {
  let players = {};
  let operations = {};

  /********** 新增一个玩家 **********/
  operations.addPlayer = function (player) {
    const teamColor = player.teamColor; // 玩家的队伍颜色
    players[teamColor] = players[teamColor] || []; // 如果未成立队伍则新成立一个
    players[teamColor].push(player); // 添加玩家进队伍
  };

  /********** 移除一个玩家 **********/
  operations.removePlayer = function (player) {
    const teamColor = player.teamColor; // 玩家的队伍颜色
    const teamPlayers = players[teamColor] || []; // 该队伍所有成员
    for (let i = teamPlayers.length - 1; i >= 0; i--) {
      // 遍历删除
      if (teamPlayers[i] === player) teamPlayers.splice(i, 1);
    }
  };

  /********** 玩家换队 **********/
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player); // 从原队伍中删除
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer(player); // 增加到新队伍中
  };

  /********** 玩家死亡 **********/
  operations.playerDead = function (player) {
    const teamColor = player.teamColor;
    const teamPlayers = players[teamColor]; // 玩家所在队伍

    let all_dead = true;

    for (let i = 0, player; (player = teamPlayers[i++]); ) {
      if (player.state !== "dead") {
        all_dead = false;
        break;
      }
    }

    if (all_dead === true) {
      // 全部死亡
      for (let i = 0, player; (player = teamPlayers[i++]); ) {
        player.lose(); // 本队所有玩家 lose
      }

      for (let color in players) {
        if (color !== teamColor) {
          const teamPlayers = players[color]; // 其他队伍玩家
          for (let i = 0, player; (player = teamPlayers[i++]); ) {
            player.win(); // 其他队伍所有玩家 win
          }
        }
      }
    }
  };

  const ReceiveMessage = function () {
    const message = Array.prototype.shift.call(arguments); // 第一个参数为消息名称
    operations[message].apply(this, arguments);
  };

  return { ReceiveMessage };
})();

/**
  玩家对象构造函数
*/
function Player(name, teamColor) {
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
  this.state = "alive"; // 玩家生存状态
}
Player.prototype.win = function () {
  console.log(this.name + " won");
};
Player.prototype.lose = function () {
  console.log(this.name + " lost");
};
Player.prototype.die = function () {
  this.state = "dead";
  playerDirector.ReceiveMessage("playerDead", this); // 给中介者发送消息，玩家死亡
};
Player.prototype.remove = function () {
  playerDirector.ReceiveMessage("removePlayer", this); // 给中介者发送消息，移除一个玩家
};
Player.prototype.changeTeam = function () {
  playerDirector.ReceiveMessage("changeTeam", this); // 给中介者发送消息，玩家换队
};

/**
 * 玩家对象工厂函数（改造后的这个工厂函数几乎失去了意义）
 * @param {string} name
 * @param {string} teamColor
 * @returns {object} newPlayer - 玩家实例
 */
const playerFactory = function (name, teamColor) {
  const newPlayer = new Player(name, teamColor); // 创造一个新的玩家对象
  playerDirector.ReceiveMessage("addPlayer", newPlayer); // 给中介者发消息，新增玩家

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

// 测试 1: 让红队玩家全部死亡
// player1.die();
// player2.die();
// player3.die();
// player4.die();
// 结果
// 皮蛋 lost
// 小乖 lost
// 宝宝 lost
// 小强 lost
// 黑妞 won
// 葱头 won
// 胖墩 won
// 海盗 won

// 测试 2:
// player1.remove();
// player2.remove();
// player3.die();
// player4.die();
// 结果
// 宝宝 lost
// 小强 lost
// 黑妞 won
// 葱头 won
// 胖墩 won
// 海盗 won

// 测试 3
player1.changeTeam("blue");
player2.die();
player3.die();
player4.die();
// 小乖 lost
// 宝宝 lost
// 小强 lost
// 黑妞 won
// 葱头 won
// 胖墩 won
// 海盗 won
// 皮蛋 won
