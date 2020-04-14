miniGame.pages['controlsPage'] = (function(screens) {

	function initialize() {
		document.getElementById('id-controls-back').addEventListener(
			'click',
			function() { screens.showScreen('menuPage'); });
	}

	function run() {
		//
		// I know this is empty, there isn't anything to do.
	}

	return {
		initialize : initialize,
		run : run
	};
}(miniGame.screens));
