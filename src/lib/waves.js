//const C = Math.cos;
const S = Math.sin;
const PI = Math.PI;
const R = Math.random;
const F = Math.floor;

export const getSinWave = (length) => {
    console.log('sin');
    let wave = [];
    let randomPeriods  = [100,200,500,250,125];
    let period =  randomPeriods[F(randomPeriods.length * R())];
    console.log({period});
    for(let i=0; i<length;i++) {
        wave.push(50 + (50 * S(PI * 2 * i/period)));
    }
    return wave;
}

export const getSawTooth = (length) => {
    console.log('saw');
    let wave = [];
    let randomPeriods  = [100,200,500,250,125];
    let period =  randomPeriods[F(randomPeriods.length * R())];
    console.log({period});
    for(let i =0; i < length; i++) {
        wave.push((i * 100 /period)%100);
    }
    return wave;
}

export const getBars = length => {
    console.log('bar');
    let wave = [];
    let randomPeriods  = [200,500,250,125];
    let activationPeriodFactor = R();
    let period =  randomPeriods[F(randomPeriods.length * R())];
    console.log({period});
    let activationPeriod = activationPeriodFactor * period;
    console.log({activationPeriod});
    for(let i =0; i < length; i++) {
        wave.push(i % period < activationPeriod ? 100 : 0);
    }
    return wave;
};

export const getRectWave = length => {
    console.log('rect');
    let wave = [];
    let randomPeriods  = [100,200,500,250,125];
    let period =  randomPeriods[F(randomPeriods.length * R())];
    console.log({period});
    for(let i =0; i < length; i++) {
        let ind = i % period;
        if (ind < 0.33*period) wave.push(0);
        else if(ind < 0.67 * period) wave.push(50);
        else wave.push(100);
    }
    return wave;
};

export const getMixedSine = length => {
    console.log('mixed sin');
    let wave1 = getSinWave(length);
    let wave2 = getSinWave(length);
    return wave1.map((d,i) => (d + wave2[i])/2);
};

