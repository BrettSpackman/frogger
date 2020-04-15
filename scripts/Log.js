miniGame.log = function(spec) {
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

        center.x += spec.moveRate;
        if(center.x > 600+spec.size.width/2){ // this wraps cars
            center.x = -spec.size.width/2;
        }

        if(dir==1){ // right traveling cars
            context.translate(center.x, center.y);
            context.translate(-center.x, -center.y);
        }
        else{ // left traveling cars
            context.translate(center.x+600, center.y);
            context.translate(-center.x, -center.y);
            context.scale(-1,1);
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
        get moveRate() { return spec.moveRate; },
        get size() { return spec.size; }
    };

    return api;
}
