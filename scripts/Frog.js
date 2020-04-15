miniGame.frog = function(spec) {
    'use strict';

    let rotation = 0;
    let imageReady = false;
    let image = new Image();
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function moveLeft(elapsedTime) {
        if(spec.center.x > 12){
            spec.center.x -= 36;
        }
    }

    function moveRight(elapsedTime) {
        if(spec.center.x < 588){
            spec.center.x += 36;
        }
    }

    function moveUp(elapsedTime) {
        if(spec.center.y > 40){
            spec.center.y -= 54;
        }
    }

    function moveDown(elapsedTime) {
        if(spec.center.y < 680){
            spec.center.y += 54;
        }
    }

    function moveTo(pos) {
        spec.center.x = pos.x;
        spec.center.y = pos.y;
    }

    function center(pos) {
        spec.center.x = 20;
        spec.center.y = 20;
    }

    function render() {
        const context = spec.context
        const center = spec.center
        const size = spec.size
        
        context.save();

        //center.y += .2;
        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height
        );

        context.restore();
    }

    let api = {
        moveLeft: moveLeft,
        moveRight: moveRight,
        moveUp: moveUp,
        moveDown: moveDown,
        moveTo: moveTo,
        render: render,
        center: center,
        get imageReady() { return imageReady; },
        get rotation() { return rotation; },
        get image() { return image; },
        get center() { return spec.center; },
        get radius() { return spec.radius; },
        get size() { return spec.size; }
    };

    return api;
}