import Grid from "@material-ui/core/Grid";
import BehaviorResponseSummaryChartHeader from "./BehaviorResponseSummaryChartHeader";
import BehaviorResponseSummaryChartLegend from "./BehaviorResponseSummaryChartLegend";
import BehaviorResponsesSummaryPie from "./BehaviorResponsesSummaryPie";
import * as React from "react";


export default function BehaviorResponseSummaryChart (props) {
  return (
    <div>
      <Grid  justify={"center"} direction={"column"} style={{height: props.height}} >
        <BehaviorResponseSummaryChartHeader/>
        <BehaviorResponseSummaryChartLegend/>
        <Grid item style={{paddingTop: '1em' }}>
          <BehaviorResponsesSummaryPie
            negativeResponses={props.negativeResponses}
            positiveResponses={props.positiveResponses}
          />
        </Grid>
      </Grid>
    </div>
  )
}