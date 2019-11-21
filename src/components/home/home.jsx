import React, { useState } from 'react'
import {  AppBar, Toolbar, Typography, Fab, IconButton } from '@material-ui/core'
import MusicNote from '@material-ui/icons/MusicNote';
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
    music: {
      color: 'white'
    }
}));

export default function Home(){

    const classes = useStyles();
    const [playMusic, toggleMusic] = useState(true);
    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                      KerFlux - Web
                    </Typography>
                    <IconButton aria-label="add" className={classes.music} onClick ={() => toggleMusic(!playMusic)}>
                      <MusicNote />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <WaveGrid numberOfWaves={3} playMusic={playMusic} />

        </div>
    )

}
