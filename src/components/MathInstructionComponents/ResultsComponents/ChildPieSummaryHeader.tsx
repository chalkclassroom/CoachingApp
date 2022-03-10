import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";

interface OwnProps {}

type Props = OwnProps;

const ChildPieSummaryHeader: FunctionComponent<Props> = (props) => {

  return (
    <Typography align={"center"} variant="h5" style={{fontFamily: 'Arimo'}}>
      Child Behaviors
    </Typography>
  );
};

export default ChildPieSummaryHeader;
