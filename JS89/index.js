/**
本题展示了一个简化版的标签输入框，功能如下：
1、当用户输入内容并敲回车键时，将输入框的内容在输入框前显示成标签，并清空输入框内容
2、当用户敲删除键时，如果输入框当前没有内容，则删除前一个标签
3、标签需要去掉字符串两端的多余的空格
4、标签不能为空字符串
5、标签不能重复，如果输入已存在的内容相同的标签，则不添加，并清空输入框
6、请补充完成tagInput.init、tagInput.bindEvent、tagInput.addTag、tagInput.removeTag函数，实现上面的需求
7、相关键码值，回车键=13，删除键=8
8、请不要手动修改html和css
9、不要使用第三方插件
10、请使用ES5语法
 */

var tagInput = {
	isInited: false,
	init: init,
	bindEvent: bindEvent,
	addTag: addTag,
	removeTag: removeTag,
};

tagInput.init();

function init() {
	var that = this;
	if (that.isInited) return;
	that.isInited = true;
	// 请修改这一行代码，保存class为js-input的输入框的dom元素引用
	that.input = document.querySelector(".js-input");
	that.bindEvent();
}

function bindEvent() {
	var that = this;
	var input = that.input;
	if (!input) return;
	input.addEventListener("keydown", function (event) {
		// 请修改这一行代码，判断用户是否按了回车键
		var isEnter = event.keyCode === 13;
		// 请修改这一行代码，判断用户是否按了删除键
		var isDelete = event.keyCode === 8;

		(isEnter || isDelete) && event.preventDefault();
		isEnter && that.addTag();
		isDelete && that.removeTag();
	});
	input.parentNode.addEventListener("click", function () {
		input.focus();
	});
}

function addTag() {
	const text = this.input.value.trim();
	if (text === "") {
		this.input.value === "";
		return;
	}
	const spans = this.input.parentNode.querySelectorAll(".tag");
	const isFound = Array.from(spans).find((ele) => ele.textContent === text);
	if (isFound) {
		this.input.value === "";
		return;
	}
	const span = document.createElement("span");
	span.setAttribute("class", "tag");
	span.innerText = text;
	this.input.parentNode.insertBefore(span, this.input);
	this.input.value = "";
}

function removeTag() {
	const text = this.input.value;
	if (text.length === 0) {
		const spans = this.input.parentNode.querySelectorAll(".tag");
		if (spans.length > 0) {
			this.input.parentNode.removeChild(spans[spans.length - 1]);
		}
	}
}
