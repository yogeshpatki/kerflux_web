import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/styles';
import { drawResultOnCanvas, drawWaveOnCanvas, getScale } from '../../lib/canvasUtils';
import { Grid } from '@material-ui/core';

const initialState = {
    dragging: false,
    initialDragX : undefined
};

const useStyles = makeStyles(() => ({
    canvas_container: {
      backgroundColor: 'black',   
    },
    canvas: {
    }
}));

export default function Wave(props) {
    const classes = useStyles();
    let canvas_ref = React.createRef();

    const [state, setState] = useState({...initialState});

    const {dragging, initialDragX} = state;
    const { waveData, resultData, updateFunction} = props;
    const draggable = !(resultData && resultData.length > 0);

    const startDragging = x => {
        if(!dragging) {
            setState({dragging: true, initialDragX: x});
        }
    }

    const dragWave = x => {
        if(draggable && dragging) {
            //const scale = getScale(canvas_ref.current.getContext('2d'), props.ind);
            
            const scale = 1;
            const translatedWave = waveData.slice(0);
            translatedWave.rotate((initialDragX-x)/scale);
            setState({...state, initialDragX: initialDragX - ((initialDragX-x)/scale) });
            updateFunction(props.ind, translatedWave);
        }
    }

    const stopDragging = () => {
        if(dragging) {
            setState({dragging: false, initialDragX : null}); 
        }
    }

    const handleMouseDown = (e) => {
        startDragging(e.clientX);
    };

    const handleTouchStart = (e) => {
        startDragging(e.touches[0].clientX);
    }

    const handleTouchEnd = (e) => {
        stopDragging();
    }

    const handleTouchMove = (e) => {
        dragWave(e.touches[0].clientX);
    }

    const handleMouseMove = (e) => {
        dragWave(e.clientX);
    }

    const handleMouseUpOrOut = () => {
        stopDragging();
    };

    useEffect(
        () => {
         let c = canvas_ref.current;
         let ctx = c.getContext("2d");
         resultData && resultData.length > 0 ? drawResultOnCanvas(ctx,waveData,resultData) : drawWaveOnCanvas(ctx, waveData,props.ind);
    });

    return (        
        <div className={classes.canvas_container} >
            <canvas ref={canvas_ref} className={classes.canvas} width="1100" height="120"
            onMouseDown={handleMouseDown} 
            onTouchStart={handleTouchStart} 
            onMouseUp={handleMouseUpOrOut} 
            onTouchEnd={handleTouchEnd} 
            onMouseMove={handleMouseMove} 
            onTouchMove={handleTouchMove}
            > </canvas> 
        </div>
    );


}
