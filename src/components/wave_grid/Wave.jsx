import React, { useEffect, useState } from 'react'
import { getSinWave } from '../../lib/waves';

import { makeStyles } from '@material-ui/styles';
import { drawResultOnCanvas, drawWaveOnCanvas } from '../../lib/canvasUtils';

const initialState = {
    waveData: [],
    dragging: false,
    initialDragX : undefined,
    resultData:[],
    draggable: true,
    updateFunction: () => console.log('shifted')
};

const useStyles = makeStyles(() => ({
    canvas_container: {
      backgroundColor: 'black',   
    }
}));

export default function Wave(props) {
    const classes = useStyles();
    let canvas_ref = React.createRef();

    const [state, setState] = useState(
        {...initialState, 
            waveData:props.waveData, 
            resultData: props.resultData, 
            draggable: !(props.resultData && props.resultData.length > 0),
            updateFunction: props.updateFunction
        });

    const {dragging, waveData, resultData, initialDragX,draggable, updateFunction} = state;

    const startedDragging = (e) => {
        if(!dragging) {
            setState({...state, dragging: true, initialDragX: e.clientX});
        }
    };

    const dragWave = (e) => {
        if(draggable && dragging) {
            const x = e.clientX;
            const translatedWave = waveData.slice(0);
            translatedWave.rotate(initialDragX-x);
            //updateFunction(props.key, translatedWave);
            setState({...state, waveData: translatedWave, initialDragX: x});
        }
    }

    const stoppedDragging = (e) => {
        if(dragging) {
            setState({...state, dragging: false, initialDragX : null}); 
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