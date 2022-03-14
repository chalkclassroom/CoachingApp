import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import * as Constants from "../../../constants/Constants";
import ChildPieSummary from "./ChildPieSummary";
import ChildSummaryHeader from "./ChildSummaryHeader";
import ChildSummaryLegend from "./ChildSummaryLegend";

interface OwnProps {
  sequential: number
  notSequential: number
}

type Props = OwnProps;

const ChildSummaryChart: FunctionComponent<Props> = (props) => {

  return (<div>
    <Grid container justify={"center"} direction={"column"}>
      <ChildSummaryHeader/>
      <ChildSummaryLegend/>
      <ChildPieSummary
        sequential={props.sequential}
        notSequential={props.notSequential}
      />
    </Grid>
  </div>);
};

export default ChildSummaryChart;
