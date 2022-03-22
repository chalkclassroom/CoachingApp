import React, { FunctionComponent } from 'react';
import Typography from "@material-ui/core/Typography/Typography";

interface OwnProps {
  avgRating: number
}

type Props = OwnProps;

const AverageBarLegend: FunctionComponent<Props> = (props) => {

  return (
    <>
    <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo'}}>
    What do you notice about the average class room engagement?
  </Typography>
  <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em', marginBottom: '100px'}}>
    Average Level of Engagement Score: {Math.round((props.avgRating + Number.EPSILON) * 100) / 100}
  </Typography>
</>
  );
};

export default AverageBarLegend;
