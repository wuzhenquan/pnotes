// 产生严格自增的序列号
var serialNum = {
	// 这个数据属性包含下一个序列号
	// $ 符号暗示这个属性是一个私有属性
	$n:1,
	// 返回当前的值, 然后自增
	get next() { return this.$n++ },
	// 给 serialNum.next 设置新的值, 但只有当它比当前值大时才能设置成功
	set next(n){ 
		if (n >= this.$n) this.$n = n;
		else throw "序列号的值不能比当前值小"
	}
}

// 不能改变 person 的 sex 属性
var  person = {
    name : 'ironMan',
    get sex(){
        return 'man';
    }
};
