miniGame.pages['gamePage'] = (function(model, screens, graphics, input) {

    var keyboard = input.Keyboard(),
        mouse = input.Mouse(),
		cancelNextRequest = false,
        lastTimeStamp = performance.now(),
        canvas = document.getElementById("canvas-main"),
        context = canvas.getContext('2d'),
        frog = null,
        deadFrog = null,
        padFrog = null,
        padFrogs = [],
        pads = [false, false, false, false, false],
        level = 1,
        frogHit = false;
        car = null,
        log = null,
        cars = [],
        logs = [];
        let score = 0;
        let seconds = 30;
        //let decSeconds = 

        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }

	function initialize() {

        frog = miniGame.frog({
			center: {x: 300, y: 680},
			radius: 21,
			moveRate: 1,
			context: context,
			size: {width: 40, height: 50},
			imageSrc: '/images/frog1.png',
        })

        createCars();
        createLogs();

        setInterval(decrementSeconds, 1000);
        
		keyboard.registerCommand('ArrowDown', frog.moveDown);
        keyboard.registerCommand('ArrowUp', frog.moveUp);
        keyboard.registerCommand('ArrowLeft', frog.moveLeft);
		keyboard.registerCommand('ArrowRight', frog.moveRight);

		keyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			//
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			screens.showScreen('menuPage');
		});
    }

    function decrementSeconds(){
        seconds -= 1;
    }

    function createCars(){
        let StartY = 681
        console.log("adding cars!")
        for(i=1; i<=5; i++){
            let w = 90;
            if(i==4){w *= 2;}
            else if(i==5){ w *= 3}
            let xpos = Math.round(Math.random()*300)
            while(xpos < 600){
                cars.push(
                    car = miniGame.car({
                        center: {x: xpos, y: StartY-(i*54)},
                        radius: 21,
                        moveRate: (i%3+1)*.75,
                        context: context,
                        size: {width: w, height: 45},
                        imageSrc: '/images/car'+i+'.png',
                        })
                );
                xpos += Math.round(Math.random()*200+1.5*w)
            }
        }
    }

    function createLogs(){
        let StartY = 357
        for(let i=1;i<=5;i++){
            let w = 50;
            if(i==2){ w *= 2; }
            else if(i==3){ w *= 4; }
            else if(i==5){ w *= 3; }
            let xpos = Math.round(Math.random()*300)
            while(xpos < 600){
                logs.push(
                    log = miniGame.log({
                        center: {x: xpos, y: StartY-(i*54)},
                        radius: 21,
                        moveRate: (i%3+1)*.5,
                        context: context,
                        size: {width: w, height: 45},
                        imageSrc: '/images/log'+i+'.png',
                    })
                );
                if(i==1 || i==4){ // add 1 turtle
                    xpos += w;
                    logs.push(
                        log = miniGame.log({
                            center: {x: xpos, y: StartY-(i*54)},
                            radius: 21,
                            moveRate: (i%3+1)*.5,
                            context: context,
                            size: {width: w, height: 45},
                            imageSrc: '/images/log'+i+'.png',
                        })
                    )
                    if(i==1){
                        xpos += w;
                        logs.push(
                            log = miniGame.log({
                                center: {x: xpos, y: StartY-(i*54)},
                                radius: 21,
                                moveRate: (i%3+1)*.5,
                                context: context,
                                size: {width: w, height: 45},
                                imageSrc: '/images/log'+i+'.png',
                            })
                        )
                    }
                }
                xpos += Math.round(Math.random()*300+200)
            }
        }
    }
    
    function endHit(){
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
            score+=50 + seconds;
            //score+= seconds*.5;
            pads[padNum-1] = true;

            padFrogs.push(
                padFrog = miniGame.frog({
                    center: {x: frog.center.x, y: frog.center.y},
                    radius: 21,
                    moveRate: .1,
                    context: context,
                    size: {width: 40, height: 50},
                    imageSrc: '/images/frog1.png',
                })
            )

            seconds = 30;
            frog.center.x = 300;
            frog.center.y = 680;
        }
        else{
            gameOver();
        }

    }

    function gameOver(){
        pads = [false, false, false, false, false]
        padFrogs = [];
        deadFrog = miniGame.frog({
            center: {x: frog.center.x, y: frog.center.y},
            radius: 21,
            moveRate: .1,
            context: context,
            size: {width: 40, height: 50},
            imageSrc: '/images/dead.png',
        })
        console.log("game over");

        seconds = 30;
        frog.center.y = -80000;   

        sleep(1000).then(() => {
            deadFrog = null;
            frog.center.x = 300;
            frog.center.y = 680;  
            frogHit = false;
          })   
    }

	function processInput(elapsedTime) {
        keyboard.update(elapsedTime);
        mouse.update(elapsedTime);
		//model.processInput(elapsedTime);
	}

	function update(elapsedTime) {
        endHit();
        genCollision();
        document.getElementById('score').innerHTML = score;
        document.getElementById('time').innerHTML = seconds;
        if(seconds == 0) {gameOver();}
    }
    
    function genCollision(){

        //console.log(cars)

        //let frogHit = false;

        if(!frogHit){
            for(let i=0;i<cars.length;i++){
                if(isHit(cars[i])){
                    frogHit = true;
                    gameOver();
                }
            }
        }
    }
    
    function isHit(curCar){
        //let time = performance.now();
        if(lineCircleIntersection(
            {x:curCar.center.x - curCar.size.width/2, y:curCar.center.y}, 
            {x:curCar.center.x + curCar.size.width/2, y:curCar.center.y}, 
            frog))
        {
            return true;
        }
        //let finish = performance.now();
        //console.log("Collision time: ",finish-time)
    }

	function lineCircleIntersection(pt1, pt2, circle) {
		
		let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
		let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
		let b = -2 * (v1.x * v2.x + v1.y * v2.y);
		let c =  2 * (v1.x * v1.x + v1.y * v1.y);
		let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
		if (isNaN(d)) { // no intercept
			return false;
		}
		// These represent the unit distance of point one and two on the line
		let u1 = (b - d) / c;  
		let u2 = (b + d) / c;
		if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
			return true;
		}
		if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
			return true;
		}
		return false;
	}

	function render() {
        graphics.clear();

        for(let i=0; i<logs.length;i++){
            if(logs[i].center.y == 303 || logs[i].center.y == 195 || logs[i].center.y == 87){
                logs[i].render(-1);
            }
            else{
                logs[i].render(1);
            }
        }

        if(!frogHit){frog.render();}

        for(let i=0; i<padFrogs.length;i++){
            padFrogs[i].render();
        }

        for(let i=0; i<cars.length;i++){
            if(cars[i].center.y == 627 || cars[i].center.y == 465){
                cars[i].render(-1);
            }
            else{
                cars[i].render(1);
            }
        }

        if(deadFrog != null) {deadFrog.render();}
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
