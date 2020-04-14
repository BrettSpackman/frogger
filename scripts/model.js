miniGame.model = (function(components, graphics, input) {
	'use strict';

    var score,

		elapsedCountdown = 3000,
		internalUpdate,
        internalRender,
        keyboard = input.Keyboard(),
        mouse = input.Mouse(),

        canvas,
        context,
        rocketOBJ = null,
		//particleSystem = ParticleSystem(graphics),
		textGameOver = {
			font: '128px Arial, sans-serif',
			fill: 'rgba(100, 0, 255, 1)',
			stroke: 'rgba(0, 0, 0, 1)',
			text: 'Game Over'
		};

	function initialize() {
        canvas = document.getElementById("canvas-main");
		context = canvas.getContext('2d');

		//
		// Prepare the game over rendering position
		var textWidth = graphics.measureTextWidth(textGameOver),
			textHeight = graphics.measureTextHeight(textGameOver);
		textGameOver.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

		score = {
			total: 0,
			position: {x: 520, y: 570 },
			font: '32px Arial, sans-serif',
			fill: 'rgba(0, 0, 0, 1)',
			text: ''
		};

		// Start in the countdown state
		elapsedCountdown = 3000;
		internalUpdate = updateCountdown;
		internalRender = renderCountdown;
    }

	function renderScore() {
		score.text = 'Score: ' + score.total;
		graphics.drawText(score);
	}

	function updateCountdown(elapsedTime) {
		elapsedCountdown -= elapsedTime;


		//
		// Once the countdown timer is down, switch to the playing state
		if (elapsedCountdown <= 0) {
			internalUpdate = updatePlaying;
			internalRender = renderPlaying;
		}
	}

	function renderCountdown() {
		var number = Math.ceil(elapsedCountdown / 1000),
			countDown = {
				font: '128px Arial, sans-serif',
				fill: 'rgba(0, 0, 255, 1)',
				stroke: 'rgba(0, 0, 0, 1)',
				text: number.toString()
			},
			textWidth = graphics.measureTextWidth(countDown),
			textHeight = graphics.measureTextHeight(countDown);

		countDown.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

		renderPlaying();
		//
		// Draw the countdown numbers
		graphics.drawText(countDown);
	}

	function renderGameOver() {
		renderPlaying();
		graphics.drawText(textGameOver);
	}

	function processInput(elapsedTime) {
        keyboard.update(elapsedTime);
        mouse.update(elapsedTime);
	}


	function updatePlaying(elapsedTime) {

	}


	function renderPlaying() {

	}

	function update(elapsedTime) {
        internalUpdate(elapsedTime);
	}


	function render() {
        internalRender();

	}

	return {
		initialize: initialize,
		processInput: processInput,
		update: update,
		render: render
	};
}(miniGame.components, miniGame.graphics, miniGame.input));
