import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import ChildPieSummaryHeader from "./ChildPieSummaryHeader";
import ChildPieSummaryLegend from "./ChildPieSummaryLegend";
import ChildPieSummary from "./ChildPieSummary";

interface OwnProps {
  math: number
  notMath: number
}

type Props = OwnProps;

const ChildPieSummaryChart: FunctionComponent<Props> = (props) => {

  return (<div>
    <Grid container justify={"center"} direction={"column"}>
      <ChildPieSummaryHeader/>
      <ChildPieSummaryLegend/>

      <ChildPieSummary
        math={props.math}
        notMath={props.notMath}
      />
    </Grid>
  </div>);
};

export default ChildPieSummaryChart;
