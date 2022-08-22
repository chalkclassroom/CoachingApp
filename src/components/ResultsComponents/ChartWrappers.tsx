import Grid from "@material-ui/core/Grid";
import * as React from 'react';
import { useEffect, useState } from 'react';

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

const Styles = {
    grid_wrapper_lg: is_small => ({
        position: 'relative', 
        height: is_small ? '650px' : '58vh', 
        width: '57vw'
    }),

    grid_wrapper_sm: is_small => ({
        position: 'relative', 
        height: is_small ? '650px' : '50vh', 
        width: '57vw'
    }),

    bar_wrapper: is_small => ({
        position: 'relative', 
        height: is_small ? '325px' : '40vh', 
        width: '57vw'
    }),

    line_wrapper: is_small => ({
        position: 'relative', 
        height: is_small ? '650px' : '60vh', 
        width: '57vw'
    })
    
}


export function PieWrapperDialog({children}) {
    return (
        <Grid container justify={"center"} direction={"column"} style={{position: 'relative', height: '28vh', width: '28vw'}}>
            {children}
        </Grid>
    )
}

export function PieWrapperSummary({children}) {
    return (
        <Grid container justify={"center"} direction={"column"} style={{position: 'relative', height: '40vh', width: '100%'}}>
            {children}
        </Grid>
    )
}

export function BarWrapperDetails({children}) {
    const is_small = useMediaQuery('(max-height:767px)');
    return (
        <Grid container justify={"center"} direction={"column"} style={Styles.bar_wrapper(is_small)}>
            {children}
        </Grid>
    )
}

export function GridWrapperDetails({children}) {
    const is_small = useMediaQuery('(max-height:767px)');
    return (
        <Grid container justify={"center"} direction={"column"} style={Styles.grid_wrapper_sm(is_small)}>
            {children}
        </Grid>
    )
}

export function GridWrapperDetails_lg({children}) {
    const is_small = useMediaQuery('(max-height:767px)');
    return (
        <Grid container justify={"center"} direction={"column"} style={Styles.grid_wrapper_lg(is_small)}>
            {children}
        </Grid>
    )
}

export function LineWrapperTrends({children}) {
    const is_small = useMediaQuery('(max-height:767px)');
    return (
        <Grid container justify={"center"} direction={"column"} style={Styles.line_wrapper(is_small)}>
            {children}
        </Grid>
    )
}