
export function drawWaveOnCanvas(ctx, waveData) {
    ctx.lineWidth = 3;
    ctx.clearRect(0,0,1100,200);
    ctx.strokeStyle='#fff';
    ctx.beginPath();
    ctx.moveTo(50, 10+waveData[0]);
    for (let i = 1; i < 1000; i++) {
        ctx.lineTo(50 + i, 10 + waveData[i]);
    }
    ctx.stroke();
}

export function drawResultOnCanvas(ctx, waveData, resultData) {
    ctx.lineWidth = 3;
    ctx.clearRect(0,0,1100,200);
    ctx.strokeStyle='#fff';
    ctx.beginPath();
    ctx.moveTo(50, 10+waveData[0]);
    for (let i = 1; i < 1000; i++) {
        ctx.lineTo(50 + i, 10 + waveData[i]);
    }
    ctx.stroke();
    ctx.strokeStyle='#F00';
    ctx.beginPath(50,10+resultData[0]);
    for (let i = 1; i < 1000; i++) {
        ctx.lineTo(50 + i, 10 + resultData[i]);
    }
    ctx.stroke();
}