miniGame.screens = (function(pages) {

	function showScreen(id) {
		var screen = 0,
			active = null;

		active = document.getElementsByClassName('active');
		for (screen = 0; screen < active.length; screen += 1) {
			active[screen].classList.remove('active');
        }
		pages[id].run();
		document.getElementById(id).classList.add('active');
	}

	function initialize() {
		var screen = null;

		for (screen in pages) {
			if (pages.hasOwnProperty(screen)) {
				pages[screen].initialize();
			}
		}

		showScreen('menuPage');
	}

	return {
		initialize : initialize,
		showScreen : showScreen
	};
}(miniGame.pages));