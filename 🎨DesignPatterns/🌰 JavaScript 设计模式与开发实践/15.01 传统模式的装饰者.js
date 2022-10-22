// 原始的飞机类
var Plane = function(){};
Plane.prototype.file = function(){ 
  console.log('发射子弹');
}

// 装饰类一
var MissileDecorator = function(){
  this.plane = plane;
}
MissileDecorator.prototype.fire = function(){
  this.plane.fire();
  console.log('发射导弹');
}

// 装饰类二
var MissileDecorator = function(){
  this.plane = plane;
}
MissileDecorator.prototype.fire = function(){
  this.plane.fire();
  console.log('发射原子弹');
}

// test
var plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire(); // 分别输出 发射普通子弹 发射导弹 发射原子弹
