import React from 'react'
import { Paper, makeStyles, Container } from '@material-ui/core'
import Wave from './Wave';
import WaveSvg from './WaveSvg';
import { getSinWave } from '../../lib/waves';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper_body: {
      height: '90vh',
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

const typeOfWaves = ['sin','square'];
const F = Math.floor;
const R = Math.random 
export default function WaveGrid(props) {
    const {numberOfWaves} = props;
    console.log(numberOfWaves);
    const classes = useStyles();
    let waves = [];
    let waveData = [];
    let rotatedWaveData = [];
    let actualResult = [];
    let expectedWave = [];

    const getWaves = () => {
        for(let i = 0 ; i< numberOfWaves; i++) {
            let a = F(R() * 10000) % typeOfWaves.length;
            let currentWaveData = getSinWave();
            let rotatedData = currentWaveData.slice(0);
            waveData.push(currentWaveData);
            rotatedData.rotate(F(200 * R()));
            rotatedWaveData.push(rotatedData);
        }
        waves.push(getInputWaves(waveData));
        for(let i = 0; i < 1000; i++ ){
          let amp = 0;
          let actAmp = 0;
          for(let j = 0; j < numberOfWaves; j++) {
            amp += rotatedWaveData[j][i];
            actAmp += waveData[j][i];
          }
          expectedWave[i] = amp/numberOfWaves;
          actualResult[i] = actAmp/numberOfWaves;
        }
        waves.push(getOutputWave(actualResult, expectedWave));
        return waves;
    }

    const updateFunction = (newData, key) => {
      waves[key] = newData;
      
    }
    const getInputWaves = inputWaveData => {
      return inputWaveData.map((waveData,i) => (<Wave key={i} waveData={waveData} updateFunction/>));
    };



    const getOutputWave = (waveData, resultData) => {
      return (<Wave waveData={waveData} resultData={resultData} udpateFunction/>);
    }

    return (
        <Paper elevation={0} className={`${classes.paper_body} ${classes.paper}`} square>
            {
                getWaves()
            }
        </Paper>
    )
}

Array.prototype.rotate = (function() {
  var unshift = Array.prototype.unshift,
      splice = Array.prototype.splice;

  return function(count) {
      var len = this.length >>> 0,
          count = count >> 0;

      unshift.apply(this, splice.call(this, count % len, len));
      return this;
  };
})();