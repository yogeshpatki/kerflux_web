import React from 'react'
import { Paper, makeStyles, Container } from '@material-ui/core'
import Wave from './Wave';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper_body: {
      height: '90vh',
      overflow: 'hidden'
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
    const getWaves = () => {
        for(let i = 0 ; i< numberOfWaves; i++) {
            let a = F(R() * 10000) % typeOfWaves.length;
            waves.push(<Wave type={typeOfWaves[a]} key={i} />);
        }
        return waves;
    } 
    return (
        <Paper elevation={0} className={`${classes.paper_body} ${classes.paper}`} square>
            {
                getWaves()
            }
            
        </Paper>
    )
}
