miniGame.pages['aboutPage'] = (function(screens) {

	function initialize() {
		document.getElementById('id-about-back').addEventListener(
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
