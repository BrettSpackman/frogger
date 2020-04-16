miniGame.car = function(spec) {
    'use strict';

    let imageReady = false;
    let image = new Image();
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function render(dir) {
        const context = spec.context
        const center = spec.center
        const size = spec.size
        
        context.save();

        if(dir==1){ // right traveling cars
            center.x += spec.moveRate;
            if(center.x > 600 + spec.size.width/2){ // this wraps cars
                spec.center.x = -spec.size.width/2;
            }
        }
        else{ // left traveling cars
            center.x -= spec.moveRate;
            if(center.x < 0 - spec.size.width/2){ // this wraps cars
                spec.center.x = 600+spec.size.width/2;
            }
        }

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height
        );

        context.restore();
    }

    let api = {
        render: render,
        get imageReady() { return imageReady; },
        get image() { return image; },
        get center() { return spec.center; },
        get radius() { return spec.radius; },
        get size() { return spec.size; },
        get moveRate() { return spec.moveRate; },
    };

    return api;
}