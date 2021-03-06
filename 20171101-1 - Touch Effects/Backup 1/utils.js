
var utils = {

    getRandomColorHEX: function () {            // Funcao geradora de cores aleatorias em HEX
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
    return color;
    },

    getRandomColorRGB:function () {             // Funcao geradora de cores aleatorias em RGB
    var rgb_r = Math.floor(Math.random() * 255);
    var rgb_g = Math.floor(Math.random() * 255);
    var rgb_b = Math.floor(Math.random() * 255);
    var color = 'rgb(' + rgb_r + ',' + rgb_g + ',' + rgb_b + ')';
    return color;
    },


    getRandomRedColorRGB:function () {             // Funcao geradora de cores aleatorias em RGB
    var factor = Math.random();
    var rgb_r = Math.floor( factor * 255);
    var rgb_g = 0* Math.floor( factor * 255);
    var rgb_b = 0*Math.floor( factor * 255);
    var color = 'rgb(' + rgb_r + ',' + rgb_g + ',' + rgb_b + ')';
    return color;
    },
    

    getRandomYellowColorRGB:function () {             // Funcao geradora de cores aleatorias em RGB
    var rgb_r = Math.floor( Math.random() * 255*3/4+255*1/4);
    var rgb_g = Math.floor( Math.random() * 255*1/2);
    var rgb_b = Math.floor(Math.random() * 255*1/5);
    var color = 'rgb(' + rgb_r + ',' + rgb_g + ',' + rgb_b + ')';
    return color;
    },
    
    colorToneShift:function () {                // Funcao ajustadora de cores em RGB
    if (this.rgb_r + 5 < 255) { this.rgb_r = this.rgb_r + 5; } else { this.rgb_r = 0; };
    if (this.rgb_g + 5 < 255) { this.rgb_g = this.rgb_g + 5; } else { this.rgb_g = 0; };
    if (this.rgb_b + 5 < 255) { this.rgb_b = this.rgb_b + 5; } else { this.rgb_b = 0; };
    this.color = rgb(rgb_r, rgb_g, rgb_b);
    },

    wait: function (ms){                        // Funcao espera x milisegundos
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
        }
    },
    
    absolute: function (x) {                    // Valor absoluto (módulo) de qualquer número
        if (x < 0) {
            x = -x;
            return x;
        }
        else {
            return x;
        }
    },

    norm: function (value, min, max) {          // Valor normalizado (0 a 1) de qualquer numero num intervalo min e max
        return (value - min) / (max - min);
    },

    lerp: function (norm, min, max) {           // Valor extrapolado de um valor normalizado para um min e max
        return (max - min) * norm + min;
    },

    map: function (value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
    },

    clamp: function (value, min, max) {         // Valor dado ou um min ou um max de o valor for menor que min ou maior que max
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },

    distance: function (p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceXY: function (x0, y0, x1, y1) {
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },

    circleCollision: function (c0, c1) {
        return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },

    circlePointCollision: function (x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
    },

    pointInRect: function (x, y, rect) {
        return utils.inRange(x, rect.x, rect.x + rect.width) &&
            utils.inRange(y, rect.y, rect.y + rect.height);
    },

    inRange: function (value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },

    rangeIntersect: function (min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) &&
            Math.min(min0, max0) <= Math.max(min1, max1);
    },

    rectIntersect: function (r0, r1) {
        return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
            utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    },

    degreesToRads: function (degrees) {
        return degrees / 180 * Math.PI;
    },

    radsToDegrees: function (radians) {
        return radians * 180 / Math.PI;
    },

    randomRange: function (min, max) {
        return min + Math.random() * (max - min);
    },

    randomInt: function (min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },

    roundToPlaces: function (value, places) {
        var mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    },

    roundNearest: function (value, nearest) {
        return Math.round(value / nearest) * nearest;
    },

    quadraticBezier: function (p0, p1, p2, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 2) * p0.x +
            (1 - t) * 2 * t * p1.x +
            t * t * p2.x;
        pFinal.y = Math.pow(1 - t, 2) * p0.y +
            (1 - t) * 2 * t * p1.y +
            t * t * p2.y;
        return pFinal;
    },

    cubicBezier: function (p0, p1, p2, p3, t, pFinal) {
        pFinal = pFinal || {};
        pFinal.x = Math.pow(1 - t, 3) * p0.x +
            Math.pow(1 - t, 2) * 3 * t * p1.x +
            (1 - t) * 3 * t * t * p2.x +
            t * t * t * p3.x;
        pFinal.y = Math.pow(1 - t, 3) * p0.y +
            Math.pow(1 - t, 2) * 3 * t * p1.y +
            (1 - t) * 3 * t * t * p2.y +
            t * t * t * p3.y;
        return pFinal;
    },

    roundRect: function (ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    }

}