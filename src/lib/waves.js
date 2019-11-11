//const C = Math.cos;
const S = Math.sin;
const PI = Math.PI;
const R = Math.random;
const F = Math.floor;
export const getSinWave = () => {
    let wave = [];
    let period = (F(R() * 10000) % 50) + 1;
    console.log(`period: ${period}`);
    for(let i=0; i<1000;i++) {
        wave.push(50 + (50 * S(PI * 2 * period*i/1000)));
    }
    return wave;
}