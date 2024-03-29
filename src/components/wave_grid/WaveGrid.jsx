import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, Typography, Fab } from '@material-ui/core'
import  AddIcon  from '@material-ui/icons/Add'
import Wave from './Wave';
import { getSinWave, getSawTooth, getBars, getRectWave,getMixedSine } from '../../lib/waves';
const TOTAL_WAVE_LENGTH = 1000;
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper_body: {
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundColor: 'black',
      color: 'white'
    },
    title: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: 'white',
      },
    add : {
      color: 'white'
    }
}));
const audioContext = new AudioContext();
let audioSource;
let filter = audioContext.createBiquadFilter();

const initialState = {
  wavesData: [],
  expectedResult: [],
  currentResult: [],
  currentError: 0,
  audioBuffer : null
}

const waveFunctions = [getSinWave, getSawTooth, getBars, getRectWave,getMixedSine];

const getNWaves = (n) => {
  let waves = [];
  for(let i = 0; i < n; i ++) {
     waves.push(waveFunctions[Math.floor(waveFunctions.length * Math.random())](TOTAL_WAVE_LENGTH));
  }
  return waves;
}

const getExpectedResult = (waves) => {
  let rotatedWaves = waves.map(wave => wave.slice(0).rotate(F(200*R())));
  let expectedResult = new Array(TOTAL_WAVE_LENGTH).fill(0);
  for(let i = 0 ; i < TOTAL_WAVE_LENGTH; i++) {
    for(let j = 0; j < waves.length; j++) {
      expectedResult[i] += rotatedWaves[j][i];
    }
    expectedResult[i] /= (waves.length);
  }
  return expectedResult;
}

const getCurrentResult = (waves) => {
  let currentResult = new Array(TOTAL_WAVE_LENGTH).fill(0);
  for(let i = 0 ; i < TOTAL_WAVE_LENGTH; i++) {
    for(let j = 0; j < waves.length; j++) {
      currentResult[i] += waves[j][i];
    }
    currentResult[i] /= (waves.length) ;
  }
  return currentResult;
}

const getWaves = (numberOfWaves) => {
  let waveData = getNWaves(numberOfWaves);
  return {
    wavesData: waveData,
    expectedResult: getExpectedResult(waveData),
    currentResult: getCurrentResult(waveData)
  };
}

const F = Math.floor;
const R = Math.random;

export default function WaveGrid(props) {
    const {numberOfWaves} = props;
    const classes = useStyles();
    const [state, setState] = useState(initialState);
    const {wavesData, expectedResult, currentResult} = state;
    
    const playMusic = () => {
      audioSource = audioContext.createBufferSource();
      audioSource.buffer = state.audioBuffer;
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      audioSource.connect(filter);
      filter.connect(audioContext.destination);
      audioSource.loop = true;
      audioSource.start(0);
    }
    
    const stopMusic = () => {
      audioSource.stop(0);
    }

    useEffect(() => {
      if(!state.audioBuffer) {
        fetch('/Puzzled.mp3').then(data => data.arrayBuffer().then(music => {
          audioContext.decodeAudioData(music, buffer => {
            setState({...state, audioBuffer: buffer});
          });
        })).catch(err => console.log(err));
      } else {
        if (state.wavesData.length === 0) {
          setState({...state, ...getWaves(numberOfWaves)});
        }
        if(!props.playMusic) {
          stopMusic();
        } else {
          playMusic();
        }
      }
      
    }, [props.playMusic, state.audioBuffer]);    

    const updateFunction = (key, newData) => {
      wavesData[key] = newData;
      setState({...state,
        wavesData,
        currentResult: getCurrentResult(wavesData)
      })
      
    }
    const getInputWaves = inputWaveData => {
      return inputWaveData.map((waveData,i) => (<Wave key={i} ind={i} waveData={waveData} updateFunction={updateFunction} />));
    };

    const getOutputWave = (waveData, resultData) => {
      return (<Wave waveData={waveData} resultData={resultData} updateFunction={updateFunction} key='res'/>);
    }
      
    const getAllWaves = () => {
      let waves = [];
      waves.push(getInputWaves(wavesData));
      waves.push(getOutputWave(currentResult,expectedResult));
      return waves;
    }

    const getError = () => {
      let meanSquaredError = (currentResult.map((d,i) => Math.pow((d - expectedResult[i]), 2)).reduce((a,b) => a+b))/currentResult.length;
      let rms = Math.pow(meanSquaredError, 0.5);
      if(rms > 30) {
        changeFrequency(100);
      } else if(rms > 15) {
        changeFrequency(2000 - (2000*rms/30));
      } else {
        changeFrequency(20000 - (20000*rms/30));
      }
      return rms;
    }

    const changeFrequency = (val) => {
      filter.frequency.value = val;
    }

    return (
        <Paper elevation={0} className={`${classes.paper_body} ${classes.paper}`} square>
              {wavesData && wavesData.length > 0 ? getAllWaves() : (<Typography align="center" variant="h3">Loading</Typography>)}
              {wavesData && wavesData.length > 0 ? <p>Error : {getError()}</p> : (<p></p>)}
        </Paper>
    )
}

Array.prototype.rotate = (function() {
  let unshift = Array.prototype.unshift,
      splice = Array.prototype.splice;

  return function(count) {
      let len = this.length >>> 0;
          count = count >> 0;

      unshift.apply(this, splice.call(this, count % len, len));
      return this;
  };
})();