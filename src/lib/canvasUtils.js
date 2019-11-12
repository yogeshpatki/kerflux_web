
const inputWaveColors = ['#bb86fc','#03dac6','#CF6679'];

export function drawWaveOnCanvas(ctx, waveData,i) {
    let width = ctx.canvas.parentElement.clientWidth ;
    let scale = width / 1100;
    ctx.lineWidth = 3;
    ctx.clearRect(0,0,1100,200);
    ctx.strokeStyle=inputWaveColors[i];
    ctx.beginPath();
    ctx.moveTo(0,10+waveData[0]);
    for (let i = 1; i < 1000; i++) {
        ctx.lineTo( i, 10+waveData[i]);
    }
    ctx.canvas.style.transform =`scaleX(${scale}) translateX(-${1000-width}px)`;
    ctx.stroke();
}

export function drawResultOnCanvas(ctx, waveData, resultData) {
    let width = ctx.canvas.parentElement.clientWidth ;
    let scale = width / 1100;
    ctx.lineWidth = 3;
    ctx.clearRect(0,0,1100,200);
    ctx.strokeStyle='#eee';
    ctx.beginPath();
    ctx.moveTo(0, 5+waveData[0]);
    for (let i = 1; i < 1000; i++) {
        ctx.lineTo(i, 5+waveData[i]);
    }
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle='#22af4b';
    ctx.beginPath(0,5+resultData[0]);
    for (let i = 1; i < 1000; i++) {
        ctx.lineTo(i, 5+resultData[i]);
    }
    ctx.canvas.style.transform =`scaleX(${scale}) translateX(-${1000-width}px)`;

    ctx.stroke();
}