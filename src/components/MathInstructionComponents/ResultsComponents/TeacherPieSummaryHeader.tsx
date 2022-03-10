import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";

interface OwnProps {}

type Props = OwnProps;

const TeacherPieSummaryHeader: FunctionComponent<Props> = (props) => {

  return (
    <>
    <Typography align={"center"} variant="h5" style={{fontFamily: 'Arimo'}}>
      Teacher Behaviors
    </Typography>
  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
    Compare how often the children were:
  </Typography>
  </>
  );
};

export default TeacherPieSummaryHeader;
