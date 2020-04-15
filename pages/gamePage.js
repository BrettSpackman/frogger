miniGame.pages['gamePage'] = (function(model, screens, graphics, input) {
    // import Car from "./car";
    // import Log from "./log";

    var keyboard = input.Keyboard(),
        mouse = input.Mouse(),
		cancelNextRequest = false,
        lastTimeStamp = performance.now(),
        canvas = document.getElementById("canvas-main"),
        context = canvas.getContext('2d'),
        frog = null,
        frogs = [],
        pads = [false, false, false, false, false],
        level = 1,
        car = null,
        log = null,
        cars = [],
        logs = [];
        

        // let imageReady = false;
        // let frogIMG = new Image();
        // frogIMG.onload = function() {
        //     imageReady = true;
        // };
        // frogIMG.src = "/images/frog1.png";

	function initialize() {
        frog = miniGame.frog({
			center: {x: 300, y: 680},
			radius: 21,
			moveRate: .1,
			context: context,
			size: {width: 40, height: 50},
			imageSrc: '/images/frog1.png',
        })

        createCars();
        createLogs();
        //addCars();
        
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

    function createCars(){
        let StartY = 627
        for(let i=0;i<5;i++){
            cars.push(
                car = miniGame.car({
                    center: {x: 0, y: StartY-(i*54)},
                    radius: 21,
                    moveRate: .1,
                    context: context,
                    size: {width: 90, height: 45},
                    imageSrc: '/images/blueCar.png',
                })
            );
        }
    }

    function createLogs(){
        let StartY = 303
        for(let i=0;i<5;i++){
            logs.push(
                log = miniGame.log({
                    center: {x: 0, y: StartY-(i*54)},
                    radius: 21,
                    moveRate: .1,
                    context: context,
                    size: {width: 150, height: 45},
                    imageSrc: '/images/medLog.png',
                })
            );
        }
    }

    function addCars() {
        // direction 0 = left
        // direction 1 = right
        cars.push(createCar(1, 0, 80));
        cars.push(createCar(1, 0, 240));
        cars.push(createCar(1, 0, 420));
        cars.push(createCar(2, 1, 350));
        cars.push(createCar(2, 1, 250));
        cars.push(createCar(2, 1, 80));
        cars.push(createCar(3, 1, 320));
        cars.push(createCar(3, 1, 200));
        cars.push(createCar(3, 1, 70));
        cars.push(createCar(4, 0, 300));
        cars.push(createCar(4, 0, 25));
        cars.push(createCar(5, 1, 120));
        cars.push(createCar(5, 1, 290));
        cars.push(createCar(5, 1, 10));
        console.log(cars);
      }

    function createCar(lane, direction, x) {
        let startY = 517;
        let velX = direction === 0 ? -1 * level : 1 * level;
        car = miniGame.car({
            pos: {x: x, y: startY - lane * this.frogVStep},
            vel: velX, 
            width: 45, 
            height: 30, 
            canvasWidth: this.canvas.width,
            src: 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501354/Frogger/logs_cars_death.png',
            src_reversed: 'http://res.cloudinary.com/dsvfpq1b7/image/upload/v1485501353/Frogger/car_left.png',
            direction: direction, 
            lane: lane, 
        })
      }
    
    function endHit(){
        console.log(frog.center.x);
        if(frog.center.y <= 40){
            if(frog.center.x == 84) {
                padHit(1, frog);
            }
            else if(frog.center.x == 192) {
                padHit(2, frog);
            }
            else if(frog.center.x == 300) {
                padHit(3, frog);
            }
            else if(frog.center.x == 408) {
                padHit(4, frog);
            }
            else if(frog.center.x == 516) {
                padHit(5, frog);
            }
            else {
                gameOver();
            }
        }
    }

    function padHit(padNum, frog){
        if(pads[padNum-1] == false){
            pads[padNum-1] == true;

            frogs.push(
                frog = miniGame.frog({
                    center: {x: frog.center.x, y: frog.center.y},
                    radius: 21,
                    moveRate: .1,
                    context: context,
                    size: {width: 40, height: 50},
                    imageSrc: '/images/frog1.png',
                })
            )
        }

        console.log(frogs);


        //context.save();
        //context.drawImage(frogIMG, frog.center.x, frog.center.y, frog.size.width, frog.size.height); // TODO: this isnt working
    }

    function gameOver(){
        pads = [false, false, false, false, false]
        console.log("game over");
    }

	function processInput(elapsedTime) {
        keyboard.update(elapsedTime);
        mouse.update(elapsedTime);
		//model.processInput(elapsedTime);
	}

	function update(elapsedTime) {
        model.update(elapsedTime);
        endHit();
	}

	function render() {
        graphics.clear();
        frog.render();
        for(let i=0; i<cars.length;i++){
            cars[i].render();
        }
        for(let i=0; i<logs.length;i++){
            logs[i].render();
        }
        for(let i=0; i<frogs.length;i++){
            frogs[i].render();
        }
        //testFrog.render();
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
