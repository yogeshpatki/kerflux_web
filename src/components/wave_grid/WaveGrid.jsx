import React, { useState, useEffect } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import Wave from './Wave';
import { getSinWave } from '../../lib/waves';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper_body: {
      minHeight: '800px',
      overflow: 'hidden',
      backgroundColor: 'black',
      color: 'white'
    },
    title: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));

const initialState = {
  wavesData: [],
  expectedResult: [],
  currentResult: [],
  currentError: 100
}

const getNWaves = (n) => {
  let waves = [];
  for(let i = 0; i < n; i ++) {
    let a = F(R() * 10000) % typeOfWaves.length;
     waves.push(getSinWave());
  }
  return waves;
}

const getExpectedResult = (waves) => {
  let rotatedWaves = waves.map(wave => wave.slice(0).rotate(F(200*R())));
  let expectedResult = new Array(1000).fill(0);
  for(let i = 0 ; i < 1000; i++) {
    for(let j = 0; j < waves.length; j++) {
      expectedResult[i] += rotatedWaves[j][i];
    }
    expectedResult[i] /= (waves.length);
  }
  return expectedResult;
}

const getCurrentResult = (waves) => {
  let currentResult = new Array(1000).fill(0);
  for(let i = 0 ; i < 1000; i++) {
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

const typeOfWaves = ['sin','square'];
const F = Math.floor;
const R = Math.random 
export default function WaveGrid(props) {
    const {numberOfWaves} = props;
    const classes = useStyles();
    

    const [state, setState] = useState(initialState);
    
    useEffect(() => {
      if(state.wavesData.length === 0) {
        setState(getWaves(numberOfWaves));
      }
    });

    const {wavesData, expectedResult, currentResult} = state;
    

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
  
    const getAllWaves = () => {
      let waves = [];
      waves.push(getInputWaves(wavesData));
      waves.push(getOutputWave(currentResult,expectedResult));
      return waves;
    }

    const getOutputWave = (waveData, resultData) => {
      return (<Wave waveData={waveData} resultData={resultData} updateFunction={updateFunction} key='res'/>);
    }

    return (
        <Paper elevation={0} className={`${classes.paper_body} ${classes.paper}`} square>
            {wavesData && wavesData.length > 0 ? getAllWaves() : (<p>Loading</p>)}
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