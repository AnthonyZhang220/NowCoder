randomFn();

function randomFn() {
	//红球节点及所有红球
	const redBallRoot = document.querySelector(".red .balls-wp");
	const redBallList = redBallRoot.children;
	//蓝球节点及所有红球
	const blueBallRoot = document.querySelector(".blue .balls-wp");
	const blueBallList = blueBallRoot.children;

	let redList = [],
		blueList = [];

	for (let i = 1; i <= 33; ++i) {
		redList.push(i);
	}
	for (let i = 1; i <= 16; ++i) {
		blueList.push(i);
	}

	let selected = new Set();
	let redMax = 33;
	let redMin = 1;
	let blueMax = 16;
	let blueMin = 1;
	let dep = 0;

	function getRedRandom(selected) {
		if (dep == 6) return;
		let randomNum = Math.random() * (redMax - redMin + 1) + redMin;
		// while (selected.has(randomNum)) {
		// 	randomNum();
		// }
		selected.add(randomNum);
		dep++;

		getRedRandom(selected);
		console.log(getRedRandom(selected));
	}

	let blueArr = [];

	function getBlueRandom() {
		let random = Math.random() * (blueMax - blueMin + 1) + blueMin;
		blueArr.push(random);
	}

	getRedRandom(selected);
	getBlueRandom();

	let redArr = Array.from(selected);
	redArr.sort((a, b) => a - b);

	let finalRed = redArr.concat(redList.filter((e) => redArr.indexOf(e) === -1));
	let finalBlue = blueArr.concat(
		blueList.filter((e) => blueArr.indexOf(e) === -1)
	);

	for (var i = 0; i < finalRed.length; i++) {
		redBallList[i].innerText =
			finalRed[i] < 10 ? "0" + finalRed[i] : finalRed[i];
		if (i < 6) redBallList[i].classList.add("active");
	}
	for (var i = 0; i < finalBlue.length; i++) {
		blueBallList[i].innerText =
			finalBlue[i] < 10 ? "0" + finalBlue[i] : finalBlue[i];
		if (i < 1) blueBallList[i].classList.add("active");
	}

	const res = redArr.join(",") + "|" + blueArr.join("");

	return res;
}
