miniGame.car = function(spec) {
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

// miniGame.car = function (spec) {
//     'use strict';

//     this.carImage = new Image();
//     this.revCarImage = new Image();
//     this.carImage.src = attributes.src;
//     this.revCarImage.src = attributes.src_reversed;

//   function draw(context) {
//     if (this.direction) {
//       context.drawImage(this.carImage, 15, 245, 130, 70, this.pos.x, this.pos.y, this.width, this.height);
//     } else {
//       context.drawImage(this.revCarImage, this.pos.x, this.pos.y, this.width, this.height);
//     }
//   }

//   function position(pos) {
//     spec.center.x = 20;
//     spec.center.y = 20;
// }

//   // out_of_bounds() {
//   //   if (this.direction) {
//   //     return this.pos.x >= this.canvasWidth;
//   //   } else {
//   //     return this.pos.x + this.width <= 0;
//   //   }
//   // }

//   let api = {
//     draw: draw,
//     position: position,
//     get position() { return spec.position; },
//     get vel() { return this.vel; },
//     get width() { return width; },
//     get height() { return height; },
//     get canvasWidth() { return canvasWidth; },
//     get src() { return src; },
//     get src_reversed() { return src_reversed; },
//     get direction() { return direction; },
//     get lane() { return lane; },
// };

// return api;
// }