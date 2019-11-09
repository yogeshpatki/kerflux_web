import React, { useEffect } from 'react'
import { getSinWave } from '../../lib/waves';

import { makeStyles } from '@material-ui/styles';
import { CSSTransition } from 'react-transition-group';

const drawInputWave= (type)  => {

}

const useStyles = makeStyles(() => ({
    canvas_container: {
      backgroundColor: 'lightgray',
    }
}));

export default function Wave(props) {
    const classes = useStyles();
    let canvas_ref = React.createRef();
    let is_moving = false;

    useEffect(() => {
         let c = canvas_ref.current;
         let ctx = c.getContext("2d");
         drawWave(ctx);
    });

    return (
        <div container="true">
                <canvas ref={canvas_ref} className={classes.canvas_container} width="1100" height="120">

                </canvas>
        </div>
    )

    function drawWave(ctx) {
        ctx.lineWidth = 3;
        ctx.moveTo(50, 60);
        let wave = getSinWave();
        for (let i = 1; i < 1000; i++) {
            ctx.lineTo(50 + i, 10 + wave[i]);
        }
        ctx.stroke();
    }

    onMouseDown
}
