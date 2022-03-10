import Grid from "@material-ui/core/Grid/Grid";
import PieSummary from "./PieSummary";
import * as React from "react";
import EngagementSummaryChartHeader from "./EngagementSummaryChartHeader";
import EngagementSummaryChartLegend from "./EngagementSummaryChartLegend";


export default function EngagementSummaryChart (props: { offTask: number; engaged: number; }) {

  return (
    <div>
      <Grid container justify={"center"} direction={"column"}>
        <EngagementSummaryChartHeader/>
        <EngagementSummaryChartLegend/>
        <PieSummary
          offTask={props.offTask}
          engaged={props.engaged}
        />
      </Grid>
    </div>
  )
}