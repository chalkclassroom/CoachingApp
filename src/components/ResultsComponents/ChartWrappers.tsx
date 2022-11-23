import Grid from "@material-ui/core/Grid";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


// Check
const useMediaQuery = (query) => {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect (() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addEventListener("change", handler);
        return () => mediaMatch.removeEventListener("change", handler);
    }, []);
    return matches;
};

const useStyles = makeStyles((theme) => ({
    pie_dialog:{
        position: 'relative', 
        height: '35vh', 
        // width: '100'
    },

    pie_summary: {
        position: 'relative', 
        height: '40vh', 
        width: '100%'
    },

    grid_wrapper_lg: {
        position: 'relative', 
        height: '58vh', 
        width: '57vw'
    },

    grid_wrapper_sm: {
        position: 'relative', 
        height: '50vh', 
        width: '57vw'
    },

    bar_wrapper: {
        position: 'relative', 
        height: '40vh', 
        width: '57vw'
    },

    line_wrapper: {
        position: 'relative', 
        height: '60vh', 
        width: '57vw'
    },

    '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
        pie_dialog:{
            position: 'relative', 
            height: '40vh', 
            width: '40vw'
        },
    
        pie_summary: {
            position: 'relative', 
            height: '40vh', 
            width: '100%'
        },

        grid_wrapper_lg: {
            position: 'relative', 
            height: '58vh', 
            width: '57vw'
        },
    
        grid_wrapper_sm: {
            position: 'relative', 
            height: '50vh', 
            width: '57vw'
        },
    
        bar_wrapper: {
            position: 'relative', 
            height: '40vh', 
            width: '57vw'
        },
    
        line_wrapper: {
            position: 'relative', 
            height: '60vh', 
            width: '57vw'
        },
    },
    // ipad portrait
    '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
        pie_dialog:{
            position: 'relative', 
            height: '28vh', 
            width: '28vw'
        },
    
        pie_summary: {
            position: 'relative', 
            height: '35vh', 
            width: '100%'
        },

        grid_wrapper_lg: {
            position: 'relative', 
            height: '45vh', 
            width: '85vw'
        },
    
        grid_wrapper_sm: {
            position: 'relative', 
            height: '40vh', 
            width: '85vw'
        },
    
        bar_wrapper: {
            position: 'relative', 
            height: '35vh', 
            width: '86vw'
        },
    
        line_wrapper: {
            position: 'relative', 
            height: '45vh', 
            width: '85vw'
        }
    }
}));



export function PieWrapperDialog({children}) {
    const classes = useStyles()
    return (
        <Grid container justify={"center"} direction={"column"} className={classes.pie_dialog}>
            {children}
        </Grid>
    )
}

export function PieWrapperSummary({children}) {
    const classes = useStyles()
    return (
        <Grid container justify={"center"} direction={"column"} className={classes.pie_summary}>
            {children}
        </Grid>
    )
}

export function BarWrapperDetails({children}) {
    const classes = useStyles()
    return (
        <Grid container justify={"center"} direction={"column"} className={classes.bar_wrapper}>
            {children}
        </Grid>
    )
}

export function GridWrapperDetails({children}) {
    const classes = useStyles()
    return (
        <Grid container justify={"center"} direction={"column"} className={classes.grid_wrapper_sm}>
            {children}
        </Grid>
    )
}

export function GridWrapperDetails_lg({children}) {
    const classes = useStyles()
    return (
        <Grid container justify={"center"} direction={"column"} className={classes.grid_wrapper_lg}>
            {children}
        </Grid>
    )
}

export function LineWrapperTrends({children}) {
    const classes = useStyles()
    return (
        <Grid container justify={"center"} direction={"column"} className={classes.line_wrapper}>
            {children}
        </Grid>
    )
}