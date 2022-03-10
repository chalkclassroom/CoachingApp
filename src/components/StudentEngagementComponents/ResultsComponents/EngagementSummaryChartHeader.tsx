
import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";

interface OwnProps {}

type Props = OwnProps;

const EngagementSummaryChartHeader: FunctionComponent<Props> = () => {

  return (
    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo'}}>
    Compare how often the children were:
  </Typography>
  );
};

export default EngagementSummaryChartHeader;
