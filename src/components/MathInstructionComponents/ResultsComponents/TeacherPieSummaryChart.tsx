import React, { FunctionComponent } from 'react';
import TeacherPieSummaryHeader from "./TeacherPieSummaryHeader";
import TeacherPieSummaryLegend from "./TeacherPieSummaryLegend";
import TeacherPieSummary from "./TeacherPieSummary";
import Grid from "@material-ui/core/Grid/Grid";

interface OwnProps {
  support: number
  noSupport: number
  noTeacherOpp: number
}

type Props = OwnProps;

const TeacherPieSummaryChart: FunctionComponent<Props> = (props) => {

  return (
    <Grid container justify={"center"} direction={"column"}>
    <TeacherPieSummaryHeader/>
  <TeacherPieSummaryLegend/>
  <TeacherPieSummary
    support={props.support}
    noSupport={props.noSupport}
    noTeacherOpp={props.noTeacherOpp}/>
    </Grid>

  );
};

export default TeacherPieSummaryChart;
