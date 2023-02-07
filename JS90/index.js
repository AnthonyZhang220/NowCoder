function CheckGroup(renderTo, options, isMultiple) {
	var that = this;
	that.renderTo = renderTo;
	that.options = options;
	that.isMultiple = !!isMultiple;
	that.initHtml();
	that.initEvent();
}
CheckGroup.prototype.initHtml = fInitHtml;
CheckGroup.prototype.initEvent = fInitEvent;
CheckGroup.prototype.toggleEl = fToggleEl;
CheckGroup.prototype.isSelected = fIsSelected;
CheckGroup.prototype.val = fVal;

function fInitHtml() {
	var that = this;
	// 请补全代码，拼接html字符串
	// 【需求】1、单选组件请在 div.checkgroup 元素加上class radius
	var sHtml = `<div class="checkgroup${that.isMultiple ? "" : " radius"}">`;
	that.options.forEach((item) => {
		sHtml += `<div data-val="${item.value}" class="item">${item.text}</div>`;
	});
	sHtml += "</div>";
	that.renderTo.innerHTML = sHtml;
	// 请补全代码，获取checkgroup的dom元素引用
	that.el = document.querySelector(".checkgroup");
}

function fInitEvent() {
	var that = this;
	that.el &&
		that.el.addEventListener("click", function (event) {
			var item = event.target;
			item.classList.contains("item") && that.toggleEl(item);
		});
}

function fToggleEl(item) {
	// 根据当前是单选还是多选，以及当前元素是否选中，高亮/取消���亮指定的选项dom元素
	var that = this;
	if (that.isSelected(item)) {
		// 如果当前是选中状态，则取消选中
		item.classList.remove("selected");
		that.val();
	} else if (that.isMultiple) {
		// 【需求】2、选中时，请在对应选项dom元素加上class selected
		// 【需求】4、点击多选选项，如果未选中当前选项则选中当前选项，否则取消当前选项
		item.classList.add("selected");
		that.val();
	} else {
		// 【需求】3、点击单选选项，如果未选中当前选项则选中当前选项并取消其他选项，否则取消当前选项
		let prevSelectedNode = [...item.parentElement.childNodes].find((el) =>
			that.isSelected(el)
		);
		prevSelectedNode && prevSelectedNode.classList.remove("selected");
		item.classList.add("selected");
		that.val();
	}
}

function fIsSelected(item) {
	// 判断当前元素的classList中是否有selected, 由于classList是一个类数组，所以需要转译成数组才能获取到数组方法
	if ([...item.classList].includes("selected")) return item;
}

function fVal(values) {
	var that = this;
	//此处是点击选择时进行结果返回的判断，因为点击选择的时候是不需要传值的
	if (arguments.length === 0) {
		var result = [];
		// 请补全代码，获取高亮的选项元素
		var items = [...that.renderTo.childNodes[0].childNodes].filter((el) =>
			[...el.classList].includes("selected")
		);
		// 请补全代码，获取高亮的选项元素的data-val
		result = items.map((el) => el.dataset.val);
		console.log(result);
		return result;
	}
	// 以下是初始选中状态的处理，同时也是为了防止单选状态下传递了多个参数做的处理
	!that.isMultiple && values.length > 1 && (values.length = 1);
	// 请补全代码，获取所有的选项元素
	var items = that.renderTo.childNodes[0].childNodes;
	// 请补全代码，在指定元素上加上高亮的class
	items.forEach((item) => {
		// 【需求】6、val方法的参数和返回值均为数组(单选时数组长度不超过)
		if (values.includes(item.dataset.val)) {
			item.classList.add("selected");
		} else {
			item.classList.remove("selected");
		}
	});
}
