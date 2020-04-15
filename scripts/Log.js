miniGame.log = function(spec) {
    'use strict';

    let imageReady = false;
    let image = new Image();
    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;

    function render() {
        const context = spec.context
        const center = spec.center
        const size = spec.size
        
        context.save();

        center.x += 1;
        context.translate(center.x, center.y);
        //context.rotate(rotation);
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
        render: render,
        get imageReady() { return imageReady; },
        get image() { return image; },
        get center() { return spec.center; },
        get radius() { return spec.radius; },
        get size() { return spec.size; }
    };

    return api;
}