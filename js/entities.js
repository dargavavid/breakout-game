var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entity = /** @class */ (function () {
    function Entity(x, y, width, height, imgsrcs, vx, vy, isAnimated, color) {
        if (imgsrcs === void 0) { imgsrcs = []; }
        if (vx === void 0) { vx = 0; }
        if (vy === void 0) { vy = 0; }
        if (isAnimated === void 0) { isAnimated = false; }
        if (color === void 0) { color = "white"; }
        this.frame = 0;
        this.frameKey = 5;
        this.currentImageIndex = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.images = this.setImages(imgsrcs);
        this.vx = vx;
        this.vy = vy;
        this.isAnimated = isAnimated;
        this.color = color;
    }
    Entity.prototype.setImages = function (srcs) {
        var images = [];
        var img;
        if (srcs.length > 0) {
            for (var _i = 0, srcs_1 = srcs; _i < srcs_1.length; _i++) {
                var src = srcs_1[_i];
                img = new Image();
                img.src = src;
                images.push(img);
            }
        }
        return images;
    };
    Entity.prototype.incrementFrame = function () {
        this.frame++;
        if (this.frame === 1000) {
            this.frame = 0;
        }
    };
    Entity.prototype.render = function (context) {
        if (this.images.length > 0) {
            if (this.isAnimated) {
                this.incrementFrame();
                this.currentImageIndex = this.frame % this.frameKey === 0 ? (this.currentImageIndex + 1) % this.images.length : this.currentImageIndex;
            }
            context.drawImage(this.images[this.currentImageIndex], this.x, this.y);
        }
        else {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    Entity.prototype.pickRandomBetween = function (min, max) {
        return ~~(Math.random() * (max - min) + min);
    };
    Entity.prototype.move = function (dx, dy, dt) {
        if (dx === void 0) { dx = 0; }
        if (dy === void 0) { dy = 0; }
        if (dt === void 0) { dt = 1; }
        this.x += Math.ceil(dx * dt);
        this.y += Math.ceil(dy * dt);
    };
    Entity.prototype.updateLocation = function () {
        this.incrementFrame();
        this.x += this.vx;
        this.y += this.vy;
    };
    return Entity;
}());

var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y, width, height, imgsrcs, vx, vy) {
        return _super.call(this, x, y, width, height, imgsrcs, vx, vy) || this;
    }
    Ball.prototype.invertDirection = function (ix, iy) {
        if (ix === void 0) { ix = 1; }
        if (iy === void 0) { iy = 1; }
        this.vx *= ix;
        this.vy *= iy;
    };
    return Ball;
}(Entity));

var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block(x, y, width, height, type, colors) {
        if (colors === void 0) { colors = ["black"]; }
        var _this = _super.call(this, x, y, width, height) || this;
        _this.type = type;
        _this.colors = colors;
        return _this;
    }
    Block.prototype.render = function (context) {
        if (this.type > 0) {
            context.fillStyle = this.colors[this.type - 1]; //Substract 1 because of zero based array.
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    return Block;
}(Entity));