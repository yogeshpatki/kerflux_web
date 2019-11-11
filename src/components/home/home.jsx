import React from 'react'
import {  AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import WaveGrid from '../wave_grid/WaveGrid';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#333'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));
export default function Home(){

    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    KerFlux - Web
                    </Typography>
                </Toolbar>
            </AppBar>
            <WaveGrid numberOfWaves={3}/>

        </div>
    )

}
