function draw(canvas, type) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = 'black';
    let text = 'abcdefghijklmnopqrstuvwxyz123456789,.';

    let fonts = ['16px OSRSFontCompact', '16px RuneScape Bold 12'];

    for (const font of fonts) {
        ctx.font = font;
        let y1 = 1 + (fonts.indexOf(font) + 1) * 10;
        let y2 = y1 + 20 + (fonts.indexOf(font) + 1) * 10;
            
        // If this is skia running, also use the outlineText method
        if (type === 'skia') {
            ctx.fill(ctx.outlineText(text).offset(10, y1 ));
            ctx.fill(ctx.outlineText(text.toUpperCase()).offset(10, y2));
            y1 += 100;
            y2 += 100;
        }

        ctx.fillText(text, 10, y1);
        ctx.fillText(text.toUpperCase(), 10, y2);
    }

    return canvas;
}

function SKIA_CANVAS_TEST() {
    const { Canvas, FontLibrary } = require("skia-canvas");
    const canvas = new Canvas(500, 200);
    FontLibrary.use(['./osrs-font-compact.otf', './osrs-font-bold.ttf']);
    draw(canvas, 'skia').saveAs('skia_canvas.png');
}

function NODE_CANVAS_TEST() {
    const { writeFileSync } = require('fs');
    const { createCanvas, registerFont } = require('node-canvas');
    const canvas = createCanvas(500, 200);
    registerFont('./osrs-font-compact.otf', { family: 'Regular' });
    registerFont('./osrs-font-bold.ttf', { family: 'Regular' });
    draw(canvas, 'Node Canvas!');
    const buffer = canvas.toBuffer('image/png');
    writeFileSync('./node_canvas.png', buffer);
}

SKIA_CANVAS_TEST();
NODE_CANVAS_TEST();