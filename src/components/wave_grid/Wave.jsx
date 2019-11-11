import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/styles';
import { drawResultOnCanvas, drawWaveOnCanvas } from '../../lib/canvasUtils';

const initialState = {
    dragging: false,
    initialDragX : undefined
};

const useStyles = makeStyles(() => ({
    canvas_container: {
      backgroundColor: 'black',   
    }
}));

export default function Wave(props) {
    const classes = useStyles();
    let canvas_ref = React.createRef();

    const [state, setState] = useState({...initialState});

    const {dragging, initialDragX} = state;
    const { waveData, resultData, updateFunction} = props;
    const draggable = !(resultData && resultData.length > 0);
    const startedDragging = (e) => {
        if(!dragging) {
            setState({dragging: true, initialDragX: e.clientX});
        }
    };

    const dragWave = (e) => {
        if(draggable && dragging) {
            const x = e.clientX;
            const translatedWave = waveData.slice(0);
            translatedWave.rotate(initialDragX-x);
            setState({...state, initialDragX: x });
            updateFunction(props.ind, translatedWave);
        }
    }

    const stoppedDragging = (e) => {
        if(dragging) {
            setState({dragging: false, initialDragX : null}); 
        }
    };

    useEffect(
        () => {
         let c = canvas_ref.current;
         let ctx = c.getContext("2d");
         resultData && resultData.length > 0 ? drawResultOnCanvas(ctx,waveData,resultData) : drawWaveOnCanvas(ctx, waveData);
    });

    return (        
        <div container="true">
            <canvas ref={canvas_ref} className={classes.canvas_container} width="1100" height="120" 
            onMouseDown={startedDragging} 
            onMouseUp={stoppedDragging} 
            onMouseOut={stoppedDragging}
            onMouseMove={dragWave} > </canvas> 
        </div>
    );
}