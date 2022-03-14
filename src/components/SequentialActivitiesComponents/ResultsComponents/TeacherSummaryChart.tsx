import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SignalWifi4BarIcon from "@material-ui/icons/SignalWifi4Bar";
import * as Constants from "../../../constants/Constants";
import TeacherPieSummary from "./TeacherPieSummary";
import TeacherSummaryHeader from "./TeacherSummaryHeader";
import TeacherSummaryLegend from "./TeacherSummaryLegend";

interface OwnProps {
  support: number
  noSupport: number
  noTeacherOpp: number
}

type Props = OwnProps;

const TeacherSummaryChart: FunctionComponent<Props> = (props) => {

  return (
    <div>
      <Grid container justify={"center"} direction={"column"}>
      <TeacherSummaryHeader/>
        <TeacherSummaryLegend/>
        <TeacherPieSummary
          support={props.support}
          noSupport={props.noSupport}
          noTeacherOpp={props.noTeacherOpp}
        />
      </Grid>
    </div>
  );
};

export default TeacherSummaryChart;
