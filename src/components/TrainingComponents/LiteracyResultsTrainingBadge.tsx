import React, { FunctionComponent } from 'react';
import {Card} from "@material-ui/core";
import * as Constants from "../../constants/Constants";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

interface OwnProps {
  title: string,
  handleClick: () => void
}

type Props = OwnProps;

const LiteracyResultsTrainingBadge: FunctionComponent<Props> = (props) => {
const {title, handleClick} = props
  return (
    <Grid style={{padding: '.5em 0'}}>
    <Badge
      color="primary"
      style={{width: '100%', cursor: "pointer"}}
      onClick={handleClick}
    >
      <Card
        elevation={8}
        style={{
          color: Constants.Colors.LI,
          height: '5em',
          borderColor: Constants.Colors.LI,
          borderWidth: '1px',
          borderStyle: 'solid',
          width: '100%'
        }}
      >
        <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
          <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
            {title}
          </Typography>
        </Grid>
      </Card>
    </Badge>
    </Grid>
  );
};

export default LiteracyResultsTrainingBadge;
