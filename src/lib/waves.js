//const C = Math.cos;
const S = Math.sin;
const PI = Math.PI;
const R = Math.random;
const F = Math.floor;

export const getSinWave = (length) => {
    let wave = [];
    let period = (F(R() * length) % 25) + 1;
    
    for(let i=0; i<length;i++) {
        wave.push(50 + (50 * S(PI * 2 * period*i/length)));
    }
    return wave;
}

export const getSawTooth = (length) => {
    let wave = [];
    let randomPeriods  = [10,20,50,40,100,200,500,250,125];
    let period =  randomPeriods[F(randomPeriods.length * R())];
    for(let i =0; i < length; i++) {
        wave.push((i * 100 /period)%100);
    }
    return wave;
}

export const getBars = length => {
    let wave = [];
    let randomPeriods  = [50,40,100,200,500,250,125];
    let activationPeriodFactor = R();
    let period =  randomPeriods[F(randomPeriods.length * R())];
    let activationPeriod = activationPeriodFactor * period;
    for(let i =0; i < length; i++) {
        wave.push(i % period < activationPeriod ? 100 : 0);
    }
    return wave;
};

export const getRectWave = length => {
    let wave = [];
    let randomPeriods  = [50,40,100,200,500,250,125];
    let period =  randomPeriods[F(randomPeriods.length * R())];
    
    for(let i =0; i < length; i++) {
        let ind = i % period;
        if (ind < 0.33*period) wave.push(0);
        else if(ind < 0.67 * period) wave.push(50);
        else wave.push(100);
    }
    return wave;
};

export const getMixedSine = length => {
    let wave1 = getSinWave(length);
    let wave2 = getSinWave(length);
    return wave1.map((d,i) => (d + wave2[i])/2);
};

