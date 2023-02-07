var Calculator = {
	init: function () {
		var that = this;
		if (!that.isInited) {
			that.isInited = true;
			// 保存操作信息
			// total: Number, 总的结果
			// next: String, 下一个和 total 进行运算的数据
			// action: String, 操作符号
			that.data = { total: 0, next: "", action: "" };
			that.bindEvent();
		}
	},
	bindEvent: function () {
		var that = this;
		// 请补充代码：获取 .cal-keyboard 元素
		var keyboardEl = document.querySelector(".cal-keyboard");
		keyboardEl &&
			keyboardEl.addEventListener("click", function (event) {
				// 请补充代码：获取当前点击的dom元素
				var target = event.target;
				// 请补充代码：获取target的 data-action 值
				var action = target.dataset.action;
				// 请补充代码：获取target的内容
				var value = target.innerText;
				if (action === "num" || action === "operator") {
					that.result(value, action === "num");
				}
			});
	},
	result: function (action, isNum) {
		var that = this;
		var data = that.data;
		if (isNum) {
			data.next = data.next === "0" ? action : data.next + action;
			!data.action && (data.total = 0);
		} else if (action === "清空") {
			// 请补充代码：设置清空时的对应状态
			data.total = 0;
			data.next = "";
			data.action = "";
		} else if (action === "=") {
			if (data.next || data.action) {
				data.total = that.calculate(data.total, data.next, data.action);
				data.next = "";
				data.action = "";
			}
		} else if (!data.next) {
			data.action = action;
		} else if (data.action) {
			data.total = that.calculate(data.total, data.next, data.action);
			data.next = "";
			data.action = action;
		} else {
			data.total = +data.next || 0;
			data.next = "";
			data.action = action;
		}

		// ���补充代码：获取 .origin-value 元素
		var valEl = document.querySelector(".origin-value");
		valEl && (valEl.innerHTML = data.next || data.total || "0");
	},
	calculate: function (n1, n2, operator) {
		n1 = +n1 || 0;
		n2 = +n2 || 0;
		if (operator === "÷") {
			// 请补充代码：获取除法的结果
			return n2 === 0 ? 0 : Math.floor((n1 / n2) * 100) / 100;
		} else if (operator === "x") {
			// 请补充代码：获取乘法的结果
			return Math.floor(n1 * n2 * 100) / 100;
		} else if (operator === "+") {
			// 请补充代码：获取加法的结果
			return Math.floor((n1 + n2) * 100) / 100;
		} else if (operator === "-") {
			// 请补充代码：获取减法的结果
			return Math.floor((n1 - n2) * 100) / 100;
		}
	},
};
Calculator.init();
