import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

type SummaryGraphProps = {
  graph: React.Element,
  graphTitle: string
  height: string
}

export default function SummaryGraph ( props: SummaryGraphProps) {

  return (
   <div>
      <Grid justify={"center"} direction={"column"} style={{height: props.height}}>
        <Grid item style={{paddingTop: '1em'}}>
          <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
            {props.graphTitle}
          </Typography>
        </Grid>
        {props.graph}
      </Grid>
    </div>
  )
}