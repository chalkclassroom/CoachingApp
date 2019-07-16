import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class TotalVisitCount extends React.Component{
    constructor(props) {
        super(props);


    }

    render() {
        return(
            <Grid container 
                direction="column"
                justify="flex-end"
                alignItems="center"
                height="28vh"
                // justifyItems="center"
                >
                    <Grid >
                    <div style={{ margin: 20 }} />
                        <Typography variant="h5" component="h3">
                            Total Visits:
                        </Typography>
                        <Typography variant="h5" component="h3" style={{alignItems: "center", alignContent: "center", justifyContent: "center"}}>
                            {this.props.count}
                        </Typography>
                    </Grid>
                </Grid>
        )
    }
}

export default TotalVisitCount;