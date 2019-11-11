import React from 'react'
import { Container, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
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
        <Container >
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                    KerFlux - Web
                    </Typography>
                </Toolbar>
                <WaveGrid numberOfWaves={3}/>
            </AppBar>
        </Container>
    )

}
