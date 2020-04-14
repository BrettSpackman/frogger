miniGame.pages['gamePage'] = (function(model, screens, graphics, input) {
    var keyboard = input.Keyboard(),
        mouse = input.Mouse(),
		cancelNextRequest = false,
        lastTimeStamp = performance.now(),
        canvas = document.getElementById("canvas-main"),
        context = canvas.getContext('2d'),
        frog = null,
        pads = [false, false, false, false, false];

	function initialize() {
        frog = miniGame.frog({
			center: {x: 300, y: 680},
			radius: 21,
			moveRate: .1,
			context: context,
			size: {width: 40, height: 50},
			imageSrc: '/images/frog1.png',
        })
        
		keyboard.registerCommand('s', frog.moveDown);
        keyboard.registerCommand('w', frog.moveUp);
        keyboard.registerCommand('a', frog.moveLeft);
		keyboard.registerCommand('d', frog.moveRight);

		keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			//
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			screens.showScreen('menuPage');
		});
    }

    function genCollision(){
		let length = terrainOBJ.segments.length;

		for(let i=0;i<length;i++){
			if(!terrainOBJ.segments[i].safe && lineCircleIntersection(terrainOBJ.segments[i].start, terrainOBJ.segments[i].end, rocketOBJ)){
				console.log("LOSER");
				screens.showScreen('page-gameover');
			}
			else if(terrainOBJ.segments[i].safe && lineCircleIntersection(terrainOBJ.segments[i].start, terrainOBJ.segments[i].end, rocketOBJ)){
				console.log("WINNER");
				// if(level==3){
				// 	cancelNextRequest = true;
				// 	screens.showScreen('page-mainmenu');
				// }
				initialize(level);
				console.log(level);
				level++;
				screens.showScreen('page-game');
			}
		}
	}

	function processInput(elapsedTime) {
        keyboard.update(elapsedTime);
        mouse.update(elapsedTime);
		//model.processInput(elapsedTime);
	}

	function update(elapsedTime) {
		model.update(elapsedTime);
	}

	function render() {
        graphics.clear();
        frog.render();
        //model.render();

	}

	function gameLoop(time) {
		var elapsedTime = time - lastTimeStamp;

		processInput(elapsedTime);
		update(elapsedTime);
		lastTimeStamp = time;

		render();

		// Cancel the next animation if the user has pressed the ESC key, returning them
		// to the main menu.
		if (!cancelNextRequest) {
			requestAnimationFrame(gameLoop);
		}
	}

	function run() {
		model.initialize();
		lastTimeStamp = performance.now();
		//
		// Start the animation loop
		cancelNextRequest = false;
		requestAnimationFrame(gameLoop);
	}

	return {
		initialize : initialize,
		run : run
	};
}(miniGame.model, miniGame.screens, miniGame.graphics, miniGame.input));
