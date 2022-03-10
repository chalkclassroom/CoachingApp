import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";

interface OwnProps {}

type Props = OwnProps;

const ChildDetailsHeader: FunctionComponent<Props> = () => {

  return (
    <Typography align="center" variant="h5" style={{fontFamily: 'Arimo', paddingBottom: '0.5em'}}>
      Child Behaviors
    </Typography>
  );
};

export default ChildDetailsHeader;
