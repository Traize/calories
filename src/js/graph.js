const canvas = document.querySelector('.canvas')
const ratio = window.devicePixelRatio;

canvas.width = 380 * ratio;
canvas.height = 200 * ratio;
canvas.style.width = 380 + "px";
canvas.style.height = 200 + "px";

const ctx = canvas.getContext('2d')


// График

export function draw(items) {
    const maxPercent = 100;

    const gap = {
        horizontal: 20,
        vertical: 0
    }

    const barCoordinate = {
        initilaX: 20,
        initialY: 270
    }

    const barSize = {
        maxHeight: 50,
        width: 55
    };
    const labelCoordinate = {
        initilaX: 10,
        initialY: 15
    }
    const font = {
        size: 14,
        family: `Tahoma`
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let currentLabelY = labelCoordinate.initialY;
    let currentBarX = barCoordinate.initilaX;
    if (items) {
        const gapBetweenBars = (barSize.width - (items.length * 3) + gap.horizontal);
        for (let item of items) {
            const barHeight = (item.calories * (barSize.maxHeight - items.length)) / maxPercent;
            ctx.fillStyle = item.color;
            ctx.font = `${font.size}px ${font.family}`;
            ctx.save();
            ctx.translate(0, canvas.height);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(item.name.toUpperCase(), labelCoordinate.initilaX, currentLabelY);
            ctx.restore();
            ctx.fillRect(currentBarX, barCoordinate.initialY, (barSize.width - (items.length * 3)), -barHeight);

            currentBarX += gapBetweenBars;
            currentLabelY += gapBetweenBars;
        }

    } else return
};

