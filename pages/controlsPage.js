miniGame.pages['controlsPage'] = (function(screens, input) {

	function initialize() {
		document.getElementById('id-controls-back').addEventListener(
			'click',
			function() { screens.showScreen('menuPage'); });
	}

	function run() {
		const buttonControls = document.getElementById('button-controls')
		//buttonControls.innerHTML = '' // deletes all the buttons
		console.log(buttonControls)
		console.log(miniGame.utilities)
	}

	return {
		initialize : initialize,
		run : run
	};
}(miniGame.screens, miniGame.input));
