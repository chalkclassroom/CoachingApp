import Grid from "@material-ui/core/Grid";
import * as React from 'react';


export function PieWrapperDialog({children}) {
    return (
        <Grid container justify={"center"} direction={"column"} style={{position: 'relative', height: '28vh', width: '28vw'}}>
            {children}
        </Grid>
    )
}

export function PieWrapperSummary({children}) {
    return (
        <Grid container justify={"center"} direction={"column"} style={{position: 'relative', height: '40vh', width: '55vw'}}>
            {children}
        </Grid>
    )
}

export function BarWrapperDetails({children}) {
    return (
        <Grid container justify={"center"} direction={"column"} style={{position: 'relative', height: '40vh', width: '57vw'}}>
            {children}
        </Grid>
    )
}

export function GridWrapperDetails({children}) {
    return (
        <Grid container justify={"center"} direction={"column"} style={{position: 'relative', height: '50vh', width: '57vw'}}>
            {children}
        </Grid>
    )
}

export function LineWrapperTrends({children}) {
    return (
        <Grid container justify={"center"} direction={"column"} style={{position: 'relative', height: '60vh', width: '57vw'}}>
            {children}
        </Grid>
    )
}