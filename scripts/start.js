document.addEventListener('DOMContentLoaded', () => {
	const startBtn = document.getElementById('start');
	startBtn.onclick = () => {
		const inputs = startBtn.parentElement.getElementsByTagName('input');
		$().puissance4({
			rows	: inputs[0].value,
			cols	: inputs[1].value,
			color1	: inputs[2].value,
			color2	: inputs[3].value,
		});
	};
});