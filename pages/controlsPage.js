miniGame.pages['controlsPage'] = (function(screens, input) {

	function initialize() {
		document.getElementById('id-controls-back').addEventListener(
			'click',
			function() { screens.showScreen('menuPage'); });
	}

	function run() {
		
	}

	return {
		initialize : initialize,
		run : run
	};
}(miniGame.screens, miniGame.input));
